import styles from './CrewMemberInfo.module.css'; 
import { ProfileImage } from '../profile/ProfileImage';

/**
 * 
 * @param {String} profilePath 프로필 이미지 경로
 * @param {String} nickname 크루 멤버의 닉네임
 * @param {String} date 날짜
 * @returns 
 */
const CrewMemberInfo = ({ profilePath, nickname, date }) => {
    return (
        <div className={styles.memberInfo}>
            <ProfileImage profileUrl={profilePath} />
            <div className={styles.infoTextGroup}>
                <div className={styles.nickname}>{nickname}</div>
            </div>
            <div className={styles.date}>{date}</div>
        </div>
    );
}

export {CrewMemberInfo};