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
    const [actionButtons, setActionButtons] = useState();

    useEffect(() => {
        fetchCrew(crewId) // crewId로 조회
            .then(data => setCrew(data))
            .catch(err => {
                console.error('크루 정보 조회 실패:', err);
                setCrew(sampleCrew);
            });

        // 버튼 조건 분기
        if (crew.leader) {
            setActionButtons(
                <>
                    <button className={styles.actionBtn}>삭제</button>
                    <button className={styles.actionBtn}>가입 요청 확인</button>
                </>
            );
        } else if (crew.member) {
            setActionButtons(
                <button className={styles.actionBtn}>탈퇴</button>
            );
        } else {
            setActionButtons(
                <button className={styles.actionBtn}>가입 요청</button>
            );
        }
    }, [crewId, crew.leader, crew.member]); // 의존성 배열에 crewId 등 추가

    return (
        <div className={styles.profileWrapper}>
            <img src={crew.profilePath} alt="크루 프로필" className={styles.profileImg} />
            <div className={styles.infoSection}>
                <span className={styles.crewName}>{crew.crewName}</span>
                <div className={styles.introduce}>{crew.introduce}</div>
                <div className={styles.details}>
                    <div className={styles.region}>{crew.crewRegion}</div>
                    <div className={styles.memberCount}><FontAwesomeIcon icon={faPersonRunning} /> {crew.totalMemberCnt}명</div>
                </div>
            </div>
            <div className={styles.buttonSection}>
                <div className={styles.buttonGroup}>{actionButtons}</div>
            </div>
        </div>
    );
};

export default CrewProfilePage;