import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CrewProfilePage.module.css";
import {sampleCrew} from "../../dto/crew.dto";
import { faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchCrew } from "../../api/crew.api";
import { useParams } from "react-router-dom";
import { ThirdaryButton, SecondaryHoverButton } from "../../components/base/Button";
import { CheckModal } from "../../components/base/CheckModal";
import { deleteCrew } from "../../api/crew.api";
import { resignCrewMember } from "../../api/crewMember.api";
import {deleteCrewJoinRequest, requestCrewJoin} from "../../api/crewJoinRequest.api";
import { TextArea } from "../../components/base/Input";
import { ProfileImage } from "../../components/profile/ProfileImage";


const CrewProfilePage = () => {
    const navigate = useNavigate();
    const { crewId } = useParams(); // 여기서 crewId를 받아옴
    const [crew, setCrew] = useState(sampleCrew);
    const [modalTitle, setModalTitle] = useState("");
    const [modalDescription, setModalDescription] = useState("");
    const [handleModalConfirm, setHandleModalConfirm] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [requestModalOpen, setRequestModalOpen] = useState(false);
    const [requestMessage, setRequestMessage] = useState("");

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

    const renderActionButtons = () => {
        if (crew.leader) {
            return (
                <>
                    <SecondaryHoverButton 
                        content="가입 요청 확인" 
                        width="120px" 
                        onClick={()=>{navigate(`/crew/${crewId}/join-request/list`)}}
                        />
                    <ThirdaryButton content="크루 삭제" width="100px" onClick={onClickDeleteBtn}/>
                </>
            );
        } else if (crew.member) {
            return (
                <ThirdaryButton content="탈퇴" width="100px" onClick={onClickResignBtn}/>
            );
        } else if(crew.hasRequestedJoin){
            return (
                <ThirdaryButton
                    content="가입 요청 취소"
                    width="150px"
                    className={styles.actionBtn}
                    onClick={onClickCancelBtn}
                />
            );
        }
        else {
            return (
                <SecondaryHoverButton
                    content="가입 요청"
                    width="100px"
                    className={styles.actionBtn}
                    onClick={onClickRequestBtn}
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
        <div>
            <div className={styles.profileWrapper}>
                <ProfileImage profileUrl={crew.profilePath} size="200px"/>
                <div className={styles.infoSection}>
                    <span className={styles.crewName}>{crew.crewName}</span>
                    <div className={styles.introduce}>{crew.introduce}</div>
                    <div className={styles.details}>
                        <div className={styles.region}>{crew.crewRegion}</div>
                        <div className={styles.memberCount}>
                            <FontAwesomeIcon icon={faPersonRunning} /> {crew.totalMemberCnt}명
                        </div>
                    </div>
                </div>
                <div className={styles.buttonSection}>
                    <div className={styles.buttonGroup}>{renderActionButtons()}</div>
                </div>
            </div>
            <div className={styles.crewMemberFeeds}>
                <span>크루원들의 피드 모아보기</span>
                {/* 크루원들 피드 목록 조회 컴포넌트 추가 */}
            </div>
            {modalOpen && (
                <CheckModal 
                    title={modalTitle}
                    description={modalDescription}
                    onConfirm={handleModalConfirm}
                    onClose={()=>{setModalOpen(false)}}/>
            )}
            {requestModalOpen && (
                <CheckModal
                    title="크루 가입 요청"
                    width="500px"
                    description={
                        <TextArea
                            placeholder="가입 요청 메시지를 입력하세요.(최대 1000자)"
                            value={requestMessage}
                            onChange={setRequestMessage}
                            width="400px"
                            height="200px"
                            maxLength={1000}
                        />
                    }
                    onConfirm={() => handleRequestConfirm()}
                    onClose={() => setRequestModalOpen(false)}
                />
            )}
        </div>
    );
};

export default CrewProfilePage;