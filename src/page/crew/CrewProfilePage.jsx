import React, { useState, useEffect } from "react";
import styles from "./CrewProfilePage.module.css";
import sampleCrew from "../../dto/crew.dto";
import { faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchCrew } from "../../api/crew.api";
import { useParams } from "react-router-dom";

const CrewProfilePage = () => {
    const { crewId } = useParams(); // 여기서 crewId를 받아옴
    const [crew, setCrew] = useState(sampleCrew);

    const renderActionButtons = () => {
        if (crew.leader) {
            return (
                <>
                    <button className={styles.actionBtn}>삭제</button>
                    <button className={styles.actionBtn}>가입 요청 확인</button>
                </>
            );
        } else if (crew.member) {
            return (
                <button className={styles.actionBtn}>탈퇴</button>
            );
        } else {
            return (
                <button
                    className={styles.actionBtn}
                    onClick={() => {
                        if (crew.hasRequestedJoin) {
                            alert("이미 가입 요청 이력이 있습니다");
                        } else {
                            // 여기에 실제 가입 요청 로직 추가
                            console.log("가입 요청을 보냈습니다.");
                        }
                    }}
                >
                    가입 요청
                </button>
            );
        }
    };

    useEffect(() => {
        fetchCrew(crewId) // crewId로 조회
            .then(data => setCrew(data))
            .catch(err => {
                console.error('크루 정보 조회 실패:', err);
                setCrew(sampleCrew);
            });
    }, [crewId]); // hasJoinRequest도 의존성에 추가

    return (
        <div>
            <div className={styles.profileWrapper}>
                <img src={crew.profilePath} alt="크루 프로필" className={styles.profileImg} />
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
        </div>
    );
};

export default CrewProfilePage;