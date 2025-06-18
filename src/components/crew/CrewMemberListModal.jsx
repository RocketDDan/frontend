import React, { useEffect, useState, useRef, useCallback } from "react";
import styles from './CrewMemberListModal.module.css';
import { CrewHeader } from './CrewHeader';
import { CrewMemberInfo } from './CrewMemberInfo';
import { SecondaryHoverButton, Button } from '../base/Button';
import { SearchBar } from "../../components/search_bar/SearchBar";
import { fetchCrewMembers, forceRemoveCrewMember, changeCrewLeader } from '../../api/crewMember.api';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faWebAwesome } from "@fortawesome/free-brands-svg-icons";

import Swal from "sweetalert2";

const CrewMemberListModal = ({ crewId, isLeader, onClose }) => {
    const [nickname, setNickname] = useState("");
    const [crewMemberList, setCrewMemberList] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observerTarget = useRef(null);
    const memberListRef = useRef(null);
    const perPage = 6;
    const columnsForMember = [
        { label: "크루원", width: "110px" },
        { label: "가입일", width: "130px" },
    ];
    const columnsForLeader = [...columnsForMember, { label: "관리", width: "100px" }];

    const onClickPass = (crewMemberId) => {
        Swal.fire({
            title: "크루장 변경",
            text: "크루장을 변경하시겠습니까?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "변경",
            cancelButtonText: "취소",
        }).then((result) => {
            if (result.isConfirmed) {
                changeCrewLeader(crewId, crewMemberId)
                    .then(() => {
                        onClose();
                    });
            }
        });
    };

    const onClickForceResign = (crewMemberId) => {
        Swal.fire({
            title: "크루원 강퇴",
            text: "정말로 크루원을 강퇴하시겠습니까?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "강퇴",
            cancelButtonText: "취소",
        }).then((result) => {
            if (result.isConfirmed) {
                forceRemoveCrewMember(crewId, crewMemberId)
                    .then(() => {
                        setPage(1); // 강퇴 후 첫 페이지로 초기화
                        setCrewMemberList([]);
                        setHasMore(true);
                    });
            }
        });
    };

    // 검색/필터 변경 시 새로고침
    const handleSearchBar = () => {
        setPage(1);
        setCrewMemberList([]);
        setHasMore(true);
    };

    // page 변경 시 데이터 누적
    useEffect(() => {
        setIsLoading(true);
        const params = {
            nickname: nickname,
            page: page,
            perPage: perPage,
        };
        fetchCrewMembers(crewId, { params })
            .then(data => {
                if (page === 1) {
                    setCrewMemberList(data);
                } else {
                    setCrewMemberList(prev => [...prev, ...data]);
                }
                setIsLoading(false);
                setHasMore(data.length === perPage);
            });
        // eslint-disable-next-line
    }, [page, crewId]);

    // IntersectionObserver 콜백
    const handleObserver = useCallback(
        (entries) => {
            const target = entries[0];
            if (target.isIntersecting && !isLoading && hasMore) {
                setPage(prev => prev + 1);
            }
        },
        [isLoading, hasMore]
    );

    useEffect(() => {
        const observer = new window.IntersectionObserver(handleObserver, {
            threshold: 0.1,
            root: memberListRef.current, // 내부 스크롤 컨테이너를 root로 지정
        });
        if (observerTarget.current) observer.observe(observerTarget.current);
        return () => observer.disconnect();
    }, [handleObserver, memberListRef]);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div className={`${styles.modalContent} ${isLeader ? styles.leaderModal : styles.memberModal}`}>
                <div className={styles.searchBar}>
                    <SearchBar
                        width={"100%"}
                        placeholder="닉네임을 입력해주세요."
                        value={nickname}
                        onChange={setNickname}
                        onEnter={handleSearchBar}
                    />
                </div>

                <button className={styles.closeButton} onClick={onClose}>×</button>
                <div className={styles.crewHeader}>
                    <CrewHeader columns={isLeader ? columnsForLeader : columnsForMember} />
                </div>
                <div className={styles.memberList} ref={memberListRef}>
                    {crewMemberList === null || crewMemberList?.length === 0 && (
                    <div className={styles.noMembers}>
                        현재 크루원이 없습니다. 크루원을 초대해보세요!
                    </div>
                    )}
                    {crewMemberList && crewMemberList.map((member, idx) => (
                    <div key={idx} className={styles.memberInfo}>
                        <CrewMemberInfo
                            memberId={member?.memberId}
                            profilePath={member?.profilePath}
                            nickname={member?.nickname}
                            date={member?.registerDate}
                            isLeader={member?.leader}
                        />
                        {isLeader && !member?.leader && (
                        <div className={styles.menageButtons}>
                            <FontAwesomeIcon 
                                icon={faWebAwesome} 
                                onClick={()=>onClickPass(member.crewMemberId)}
                                className="crownLightColor"
                                style={{fontSize: "20px"}}/>
                            <FontAwesomeIcon 
                                icon={faTrash} 
                                onClick={()=>onClickForceResign(member.crewMemberId)}
                                style={{fontSize: "20px", color: "grey"}}/>
                        </div>
                        )}
                    </div>
                    ))}
                    {/* 무한 스크롤 타겟 */}
                    {hasMore && <div ref={observerTarget} style={{ height: "20px" }} />}
                </div>
            </div>
        </div>
    );
};

export default CrewMemberListModal;