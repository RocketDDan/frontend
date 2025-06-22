import React, { useEffect, useState, useRef, useCallback } from "react";
import styles from './CrewMemberListModal.module.css';
import { CrewHeader } from './CrewHeader';
import { CrewMemberInfo } from './CrewMemberInfo';
import { SearchBar } from "../../components/search_bar/SearchBar";
import { fetchCrewMembers, forceRemoveCrewMember, changeCrewLeader } from '../../api/crewMember.api';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faL, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faWebAwesome } from "@fortawesome/free-brands-svg-icons";

import Swal from "sweetalert2";

const CrewMemberListModal = ({ crewId, isLeader, onClose }) => {
    const [nickname, setNickname] = useState("");
    const [crewMemberList, setCrewMemberList] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isLastPage, setIsLastPage] = useState(false);
    const observerTarget = useRef(null);
    const memberListRef = useRef(null);
    const perPage = 50;
    const columnsForMember = [
        { label: "크루원", width: "110px" },
        { label: "가입일", width: "130px" },
    ];
    const columnsForLeader = [...columnsForMember, { label: "관리", width: "100px" }];

    const fetchCrewsInit = () => {
        fetchCrewMembers(crewId, { nickname, page: 1, perPage })
            .then(data => {
                setCrewMemberList(data);
                setIsLoading(false);
                if (data.length === 0) {
                    setIsLastPage(true);
                }
            });
    }

    // 검색/필터 변경 시 새로고침
    const resetAll = () => {
        setPage(1);
        setIsLastPage(false);
        setCrewMemberList([]);
    };

    const handleNickname = (val) => {
        setNickname(val);
    }

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
                        resetAll();
                        fetchCrewsInit();
                    });
            }
        });
    };

    // 🔄 nickname 바뀔 때 즉시 데이터 요청
    useEffect(() => {
        setPage(1);
        setIsLastPage(false);
        setIsLoading(true);

        fetchCrewsInit();
    }, [nickname]);

    // page 변경 시 데이터 누적 (nickname 변경 시에는 resetAll로 page가 1이 됨)
    useEffect(() => {
        if (isLastPage) return;

        setIsLoading(true);

        fetchCrewMembers(crewId, { nickname, page, perPage })
            .then(data => {
                setCrewMemberList(prev => page === 1 ? data : [...prev, ...data]);
                setIsLoading(false);
                if (data.length === 0) {
                    setIsLastPage(true);
                }
            });
    }, [page]);

    // IntersectionObserver 콜백
    const handleObserver = useCallback(
        (entries) => {
            const target = entries[0];
            if (target.isIntersecting && !isLoading && !isLastPage) {
                setTimeout(() => setPage(prev => prev + 1), 100);
            }
        },
        [isLoading]
    );

    useEffect(() => {
        if (page === 1) return;
        const observer = new window.IntersectionObserver(handleObserver, {
            threshold: 0.5,
            root: null, // 내부 스크롤 컨테이너를 root로 지정
        });
        if (observerTarget.current) observer.observe(observerTarget.current);
        return () => observer.disconnect();
    }, [handleObserver]);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose?.();
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
                        onChange={handleNickname}
                    />
                </div>

                <div className={styles.crewHeader}>
                    <CrewHeader columns={isLeader ? columnsForLeader : columnsForMember} />
                </div>
                <div className={styles.memberList} ref={memberListRef}>
                    {(crewMemberList === null || crewMemberList?.length === 0)
                        && (
                            <div className={styles.noMembers}>
                                현재 크루원이 없습니다.
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
                                        onClick={() => onClickPass(member.crewMemberId)}
                                        className="crownLightColor"
                                        style={{ fontSize: "20px" }} />
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        onClick={() => onClickForceResign(member.crewMemberId)}
                                        style={{ fontSize: "20px", color: "grey" }} />
                                </div>
                            )}
                        </div>
                    ))}
                    {/* 무한 스크롤 타겟 */}
                    {!isLastPage && <div ref={observerTarget} style={{
                         height: "20px",
                        //   backgroundColor: "yellow" 
                          }} />}
                </div>
            </div>
        </div>
    );
};

export default CrewMemberListModal;