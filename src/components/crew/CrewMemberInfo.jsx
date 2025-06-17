import styles from './CrewMemberInfo.module.css'; 
import { useNavigate } from 'react-router-dom';
import { CrewMemberProfileImage } from '../profile/ProfileImage';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWebAwesome } from "@fortawesome/free-brands-svg-icons";
import commonStyles from '../../Common.module.css';
import { use } from 'react';

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
                    <FontAwesomeIcon icon={faWebAwesome} className={`${styles.crown} ${commonStyles.crownColor}`}/>
                )}
                <CrewMemberProfileImage profileUrl={profilePath} />
            </div>

            <div className={styles.infoTextGroup} onClick={() => {navigate(`/runner/${memberId}`)}}>
                <div className={styles.nickname}>{nickname}</div>
            </div>
            <div className={styles.date}>{date}</div>
        </div>
    );
}

export {CrewMemberInfo};