import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./RunnerProfilePage.module.css";
import { CrewProfileImage } from "../../components/profile/ProfileImage";
import { fetchMemberProfile } from "../../api/member.api";

const RunnerProfilePage = () => {
    const navigate = useNavigate();
    const { memberId } = useParams();
    const [member, setMember] = useState(null);

    useEffect(() => {
        console.log("RunnerProfilePage useEffect", memberId);
        fetchMemberProfile(memberId)
            .then(data => {
                setMember(data);
            });
    }, [])

    return(
        <div>
            {member === null && (
                <div className={styles.loading}>
                    <span>로딩 중...</span>
                </div>
            )}
            {member && (
                <div className={styles.profileWrapper}>
                    <CrewProfileImage profileUrl={member.profileImageUrl}/>
                    <div className={styles.infoSection}>
                        <span className={styles.nickname}>{member.nickname}</span>
                        <span className={styles.info}>{member.email}</span>
                        <div>
                            <div className={styles.label}>소속 크루</div>
                            <span className={styles.info}>{member.crewName}</span>
                        </div>
                    </div>
                </div>
            )}
            <div className={styles.memberFeeds}>
                <span>피드 모아보기</span>
                {/* 피드 목록 조회 컴포넌트 추가 */}
            </div>
        </div>
    )
}

export default RunnerProfilePage;