import styles from './CrewMemberInfo.module.css'; 
import { CrewMemberProfileImage } from '../profile/ProfileImage';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWebAwesome } from "@fortawesome/free-brands-svg-icons";
import commonStyles from '../../Common.module.css';

/**
 * 
 * @param {String} profilePath 프로필 이미지 경로
 * @param {String} nickname 크루 멤버의 닉네임
 * @param {String} date 날짜
 * @param {Boolean} isLeader 크루 멤버가 크루장인지 여부
 * @returns 
 */
const CrewMemberInfo = ({ profilePath, nickname, date, isLeader=false }) => {
    return (
        <div className={styles.memberInfo}>
            <div className={styles.profile}>
                {isLeader && (
                    <FontAwesomeIcon icon={faWebAwesome} className={`${styles.crown} ${commonStyles.crownColor}`}/>
                )}
                <CrewMemberProfileImage profileUrl={profilePath} />
            </div>

            <div className={styles.infoTextGroup}>
                <div className={styles.nickname}>{nickname}</div>
            </div>
            <div className={styles.date}>{date}</div>
        </div>
    );
}

export {CrewMemberInfo};