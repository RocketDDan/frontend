import styles from './CrewMemberInfo.module.css'; 
import { CrewMemberProfileImage } from '../profile/ProfileImage';

const CrewMemberInfo = ({ profilePath, nickname, date }) => {
    return (
        <div className={styles.memberInfo}>
            <CrewMemberProfileImage profileUrl={profilePath} />
            <div className={styles.infoTextGroup}>
                <div className={styles.nickname}>{nickname}</div>
            </div>
            <div className={styles.date}>{date}</div>
        </div>
    );
}

export default CrewMemberInfo;