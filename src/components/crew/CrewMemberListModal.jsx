import React, { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './CrewMemberListModal.module.css';
import { sampleCrewMember } from '../../dto/crew.dto';
import { CrewHeader } from './CrewHeader';
import { CrewMemberInfo } from './CrewMemberInfo';
import { SecondaryHoverButton, ThirdaryButton } from '../base/Button';
import { SearchBar } from "../../components/search_bar/SearchBar";
import { fetchCrewMembers, forceRemoveCrewMember, changeCrewLeader } from '../../api/crewMember.api';
import { CheckModal } from "../base/CheckModal";

const CrewMemberListModal = ({ crewId, isLeader, onClose }) => {
    const [nickname, setNickname] = useState("");
    const [crewMemberList, setCrewMemberList] = useState([]); // 초기값으로 10개의 더미 데이터 사용
    const [modalOpen, setModalOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [handleModal, setHandleModal] = useState(() => () => {});
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const perPage = 7;
    const columnsForMember = [
        { label: "크루원", width: "110px" },
        { label: "가입일", width: "130px" },
    ];

    const columnsForLeader = [...columnsForMember, { label: "관리", width: "160px" }];

    const onClickPass = (crewMemberId) => {
        setTitle("크루장 변경");
        setContent("크루장을 변경하시겠습니까?");
        setHandleModal(() => () => {
            // 크루장 변경 모달 확인 버튼 클릭 시 실행되는 함수
            setModalOpen(false);
            changeCrewLeader(crewId, crewMemberId)
            .then(() => {
                onClose(); // 모달 닫기
            })
        });

        setModalOpen(true);
    };

    const onClickForceResign = (crewMemberId) => {
        setTitle("크루원 강퇴");
        setContent("정말로 크루원을 강퇴하시겠습니까?");
        setHandleModal(() => () => {
            // 크루원 강퇴 모달 확인 버튼 클릭 시 실행되는 함수
            setModalOpen(false);
            forceRemoveCrewMember(crewId, crewMemberId)
            .then(() => {
                handleSearchBar(); // 강퇴 후 멤버 목록 갱신
            });
        });
        setModalOpen(true);
    };

    const handleSearchBar = () => {
        const params = {
            nickname: nickname,
            page: page,
            perPage: perPage,
        };
        fetchCrewMembers(crewId, { params })
            .then(data => {
                setCrewMemberList(data);
            });
    };

    useEffect(() => {
        // 컴포넌트가 마운트될 때 크루원 목록을 가져옵니다.
        handleSearchBar();
    },[]);

    return (
        <div className={styles.modalOverlay}>
            <div className={`${styles.modalContent} ${isLeader ? styles.leaderModal : styles.memberModal}`}>
                <button className={styles.closeButton} onClick={onClose}>×</button>
                <CrewHeader columns={isLeader ? columnsForLeader : columnsForMember} />
                <div className={styles.memberList}>
                    {crewMemberList === null || crewMemberList?.length === 0 && (
                        <div className={styles.noMembers}>
                            현재 크루원이 없습니다. 크루원을 초대해보세요!
                        </div>
                    )}
                    {crewMemberList && crewMemberList.map((member, idx) => (
                        <div key={idx} className={styles.memberInfo}>
                            <CrewMemberInfo
                                profilePath={member?.profilePath}
                                nickname={member?.nickname}
                                date={member?.registerDate}
                                isLeader={member?.leader}
                            />
                            {isLeader && !member?.leader && (
                                <div className={styles.menageButtons}>
                                    <SecondaryHoverButton
                                        content="크루장 변경"
                                        width="110px"
                                        onClick={()=>onClickPass(member.crewMemberId)}
                                    />
                                    <ThirdaryButton
                                        content="강퇴"
                                        width="70px"
                                        onClick={()=>onClickForceResign(member.crewMemberId)}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <SearchBar
                    width={300}
                    placeholder="닉네임을 입력해주세요."
                    value={nickname}
                    onChange={setNickname}
                    onEnter={handleSearchBar}
                />
            </div>
            { modalOpen && (
                <CheckModal
                    title={title}
                    description={content}
                    onConfirm={handleModal}
                    onClose={() => setModalOpen(false)}
                />
            )}
        </div>
    );
};

export default CrewMemberListModal;