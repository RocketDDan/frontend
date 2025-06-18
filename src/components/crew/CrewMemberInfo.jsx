import styles from './CrewMemberInfo.module.css'; 
import { useNavigate } from 'react-router-dom';
import { ProfileImage } from '../profile/ProfileImage';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWebAwesome } from "@fortawesome/free-brands-svg-icons";

/**
 * 
 * @param {String} profilePath 프로필 이미지 경로
 * @param {String} nickname 크루 멤버의 닉네임
 * @param {String} date 날짜
 * @param {Boolean} isLeader 크루 멤버가 크루장인지 여부
 * @returns 
 */

const CrewMemberInfo = ({ memberId, profilePath, nickname, date, isLeader=false }) => {
    const navigate = useNavigate();
    return (
        <div className={styles.memberInfo}>
            <div className={styles.profile} onClick={() => {navigate(`/runner/${memberId}`)}}>
                {isLeader && (
                    <FontAwesomeIcon icon={faWebAwesome} className={`${styles.crown} crownColor`}/>
                )}
                <ProfileImage profileUrl={profilePath} size={"40px"}/>
            </div>

            <div className={styles.infoTextGroup} onClick={() => {navigate(`/runner/${memberId}`)}}>
                <div className={styles.nickname} style={isLeader ? { marginTop: "5px" } : undefined}>
                    {nickname}
                </div>
            </div>
            <div className={styles.date} style={isLeader ? { marginTop: "5px" } : undefined}>{date}</div>

        </div>
    );
}

export {CrewMemberInfo};