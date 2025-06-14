import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CrewProfilePage.module.css";
import {sampleCrew} from "../../dto/crew.dto";
import { faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchCrew } from "../../api/crew.api";
import { useParams } from "react-router-dom";
import { ThirdaryButton, SecondaryHoverButton } from "../../components/base/Button";
import { CrewProfileImage } from "../../components/profile/ProfileImage";
import { CheckModal } from "../../components/base/CheckModal";
import { deleteCrew } from "../../api/crew.api";

const CrewProfilePage = () => {
    const navigate = useNavigate();
    const { crewId } = useParams(); // 여기서 crewId를 받아옴
    const [crew, setCrew] = useState(sampleCrew);
    const [modalOpen, setModalOpen] = useState(false);

    const renderActionButtons = () => {
        if (crew.leader) {
            return (
                <>
                    <SecondaryHoverButton 
                        content="가입 요청 확인" 
                        width="120px" 
                        onClick={()=>{navigate(`/crew/${crewId}/join-request/list`)}}
                        />
                    <ThirdaryButton content="크루 삭제" width="120px" onClick={()=>{setModalOpen(true)}}/>
                </>
            );
        } else if (crew.member) {
            return (
                <ThirdaryButton content="탈퇴" width="150px" />
            );
        } else {
            return (
                <SecondaryHoverButton
                    content="가입 요청"
                    width="15   0px"
                    className={styles.actionBtn}
                    onClick={() => {
                        if (crew.hasRequestedJoin) {
                            alert("이미 가입 요청 이력이 있습니다");
                        } else {
                            // 여기에 실제 가입 요청 로직 추가
                            console.log("가입 요청을 보냈습니다.");
                        }
                    }}
                />
            );
        }
    };

    const handleModalConfirm = () => {
        deleteCrew(crewId);
        setModalOpen(false);
        navigate("/crew/list");
    }

    useEffect(() => {
        fetchCrew(crewId).then(data => setCrew(data)) // crewId로 조회
    }, [crewId]); // hasJoinRequest도 의존성에 추가

    return (
        <div>
            <div className={styles.profileWrapper}>
                <CrewProfileImage profileUrl={crew.profilePath}/>
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
                    title="크루 삭제"
                    description="크루를 삭제하시겠습니까?"
                    onConfirm={handleModalConfirm}
                    onClose={()=>{setModalOpen(false)}}/>
            )
            }
        </div>
    );
};

export default CrewProfilePage;