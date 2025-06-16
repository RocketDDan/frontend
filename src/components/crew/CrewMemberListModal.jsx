import React, { useEffect, useState } from "react";
import styles from './CrewMemberListModal.module.css';
import { sampleCrewMember } from '../../dto/crew.dto';
import { CrewHeader } from './CrewHeader';
import { CrewMemberInfo } from './CrewMemberInfo';
import { SecondaryHoverButton, ThirdaryButton } from '../base/Button';
import { SearchBar } from "../../components/search_bar/SearchBar";
import { fetchCrewMembers, forceRemoveCrewMember, changeCrewLeader } from '../../api/crewMember.api';

const CrewMemberListModal = ({ crewId, isLeader, onClose }) => {
    const [nickname, setNickname] = useState("");
    const [crewMemberList, setCrewMemberList] = useState(sampleCrewMember);
    const [page, setPage] = useState(1);
    const perPage = 7;
    const columns = [
        { label: "크루원", width: "160px" },
        { label: "가입일", width: "160px" },
    ];
    if (isLeader) {
        columns.push({ label: "관리", width: "160px" });
    }

    const onClickPass = (crewMemberId) => {
        e.stopPropagation();
        changeCrewLeader(crewId, crewMemberId)
        .then(() => {
            handleSearchBar(); // 크루장 변경 후 멤버 목록 갱신
        })
    };

    const onClickForceResign = (crewMemberId) => {
        e.stopPropagation();
        forceRemoveCrewMember(crewId, crewMemberId)
        .then(() => {
            handleSearchBar(); // 강퇴 후 멤버 목록 갱신
        });
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
        handleSearchBar();
    }, [nickname]);

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>×</button>
                <CrewHeader colums={columns} />
                <div className={styles.memberList}>
                    {crewMemberList && crewMemberList.map((member) => (
                        <div key={member.id} className={styles.memberInfo}>
                            <CrewMemberInfo
                                member={member}
                                isLeader={isLeader}
                            />
                            {isLeader && (
                                <div className={styles.menageButtons}>
                                    <SecondaryHoverButton
                                        content="권한 넘기기"
                                        width="100px"
                                        onClick={onClickPass}
                                    />
                                    <ThirdaryButton
                                        content="강퇴"
                                        width="100px"
                                        onClick={onClickForceResign}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <SearchBar
                    width={500}
                    placeholder="닉네임을 입력해주세요."
                    value={nickname}
                    onChange={setNickname}
                    onEnter={handleSearchBar}
                />
            </div>
        </div>
    );
};

export default CrewMemberListModal;