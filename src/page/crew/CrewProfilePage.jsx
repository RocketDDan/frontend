import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CrewProfilePage.module.css";
import { faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import { Button, SecondaryHoverButton } from "../../components/base/Button";
import { ProfileImage } from "../../components/profile/ProfileImage";
import { deleteCrew, fetchCrew } from "../../api/crew.api";
import { resignCrewMember } from "../../api/crewMember.api";
import { deleteCrewJoinRequest, requestCrewJoin } from "../../api/crewJoinRequest.api";
import CrewMemberListModal from "../../components/crew/CrewMemberListModal";
import Swal from "sweetalert2";

const CrewProfilePage = () => {
    const navigate = useNavigate();
    const { crewId } = useParams(); // 여기서 crewId를 받아옴
    const [crew, setCrew] = useState(null);
    // 확인 모달
    const [modalTitle, setModalTitle] = useState("");
    const [modalDescription, setModalDescription] = useState("");
    const [handleModalConfirm, setHandleModalConfirm] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [useButton, setUseButton] = useState(true); // 버튼 사용 여부
    // 크루 가입 요청 모달
    const [requestModalOpen, setRequestModalOpen] = useState(false);
    const [requestMessage, setRequestMessage] = useState("");
    // 크루원 모달
    const [crewMemberModalOpen, setCrewMemberModalOpen] = useState(false);

    const onClickCancelBtn = async () => {
        await deleteCrewJoinRequest(crewId);
        alert("크루 가입 요청이 취소되었습니다.");
        const data = await fetchCrew(crewId);
        setCrew(data);

    }

    const onClickRequestBtn = () => {
        setRequestModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        await deleteCrew(crewId);
        setModalOpen(false);
        navigate("/crew/list");
    }

    const handleResignConfirm = async () => {
        await resignCrewMember(crewId);
        setModalOpen(false);
        const data = await fetchCrew(crewId);
        setCrew(data);
    }

    const onClickResignBtn = () => {
        setModalTitle("크루 탈퇴");
        setModalDescription("정말로 크루를 탈퇴하시겠습니까?");
        setHandleModalConfirm(() => handleResignConfirm); // 함수 참조로 넘김!
        setModalOpen(true);
    }

    const onClickDeleteBtn = () => {
        setModalTitle("크루 삭제");
        setModalDescription("정말로 크루를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.");
        setHandleModalConfirm(() => handleDeleteConfirm);
        setModalOpen(true);
    };


    const handleRequestConfirm = async () => {
        try {
            await requestCrewJoin(crewId, requestMessage);
            setRequestMessage("");
            const data = await fetchCrew(crewId);
            setCrew(data);
        } finally {
            setRequestModalOpen(false);
        }
    };

    const onClickIntroduce = () => {
        setModalTitle("크루 소개");
        setModalDescription(crew?.introduce);
        setUseButton(false); // 버튼 사용 안함
        setModalOpen(true);
    }

    const renderActionButtons = () => {
        if (crew.leader) {
            return (
                <>
                    <Button
                        content="가입 요청 확인"
                        width="100%"
                        onClick={() => { navigate(`/crew/${crewId}/join-request/list`) }}
                        bg="secondaryBg"
                    />
                    <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
                        <Button
                            content="크루 수정"
                            width="100%"
                            onClick={() => navigate(`/crew/${crewId}/update`)}
                            bg="secondaryBg"
                        />
                        <Button
                            content="크루 삭제"
                            width="100%"
                            onClick={onClickDeleteBtn}
                            bg="pinkBg" />
                    </div>

                </>
            );
        } else if (crew.member) {
            return (
                <Button
                    content="탈퇴"
                    width="100px"
                    onClick={onClickResignBtn}
                    bg="pinkBg" />
            );
        } else if (crew.hasRequestedJoin) {
            return (
                <Button
                    content="가입 요청 취소"
                    width="150px"
                    className={styles.actionBtn}
                    onClick={onClickCancelBtn}
                    bg="pinkBg"
                />
            );
        }
        else {
            return (
                <Button
                    content="가입 요청"
                    width="100%"
                    className={styles.actionBtn}
                    onClick={onClickRequestBtn}
                    bg="secondaryBg"
                />
            );
        }
    };

    useEffect(() => {
        fetchCrew(crewId).then(data => {
            setCrew(data);
        });
    }, [crewId]);

    return (
        <div className={styles.pageWrapper}>
            {!crew && (
                <div className={styles.loading}>
                    크루 정보를 불러오는 중입니다...
                </div>
            )}
            {crew && (
                <div className={styles.profileWrapper}>

                    <div className={styles.profileDiv}>
                        <ProfileImage profileUrl={crew?.profilePath} size="200px" />
                    </div>

                    <div className={styles.infoSection}>
                        <span className={styles.crewName}>
                            {crew?.crewName}
                        </span>

                        <div className={styles.flexContainer} onClick={() => setCrewMemberModalOpen(true)}>
                            <div className={styles.label}>멤버</div>
                            <div style={{ cursor: "pointer" }}>
                                <FontAwesomeIcon icon={faPersonRunning} />
                                <span>&nbsp;{crew?.totalMemberCnt}명</span>
                            </div>
                        </div>

                        <div className={styles.flexContainer}>
                            <div className={styles.label}>소개</div>
                            <div className={styles.introduce} onClick={onClickIntroduce}>
                                {crew?.introduce.length > 30 ? crew.introduce.substring(0, 30) + '...' : crew.introduce}
                            </div>
                        </div>

                        <div className={styles.flexContainer}>
                            <div className={styles.label}>주소</div>
                            <div className={`${styles.region} textLightColor`}>
                                <span>{crew?.crewRegion}</span>&nbsp;
                                <span>{crew?.crewAddress}</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.buttonSection}>
                        <div className={styles.buttonGroup}>{renderActionButtons()}</div>
                    </div>
                </div>
            )}

            {/* <div className={styles.crewMemberFeeds}> */}
            {/* <span>크루원들의 피드 모아보기</span> */}
            {/* 크루원들 피드 목록 조회 컴포넌트 추가 */}
            {/* </div> */}

            {modalOpen && Swal.fire({
                title: modalTitle,
                html: modalDescription,
                showCancelButton: useButton,
                confirmButtonText: '확인',
                cancelButtonText: '취소',
                customClass: { popup: 'custom-swal-width' },
            }).then(result => {
                if (result.isConfirmed && handleModalConfirm) {
                    handleModalConfirm();
                }
                setModalOpen(false);
                setUseButton(true);
            })}
            {requestModalOpen && Swal.fire({
                title: "크루 가입 요청",
                html: `
                    <textarea id="swal-input" class="swal2-textarea"
                        placeholder="가입 요청 메시지를 입력하세요.(최대 400자)"
                        maxlength="400"
                        style="width: 100%; max-width: 100%; min-width: 0; height: 200px; box-sizing: border-box; display: block; margin: 0 auto;"
                    >${requestMessage}</textarea>
                `,
                showCancelButton: true,
                confirmButtonText: '요청',
                cancelButtonText: '취소',
                customClass: { popup: 'custom-swal-width' },
                willOpen: () => {
                    // popup에 box-sizing: border-box 적용 (중복 방지)
                    const popup = document.querySelector('.swal2-popup');
                    if (popup) popup.style.boxSizing = 'border-box';
                }
                ,
                preConfirm: () => {
                    const input = document.getElementById('swal-input');
                    if (input) {
                        setRequestMessage(input.value);
                        return handleRequestConfirm();
                    }
                }
            }).then(() => {
                setRequestModalOpen(false);
            })}

            {crewMemberModalOpen && (
                <CrewMemberListModal
                    crewId={crewId}
                    onClose={async () => {
                        setCrewMemberModalOpen(false);
                        const data = await fetchCrew(crewId);
                        setCrew(data);
                    }}
                    isLeader={crew.leader}
                />
            )}
        </div>
    );
};

export default CrewProfilePage;