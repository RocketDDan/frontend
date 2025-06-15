import styles from './CrewCard.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonRunning } from "@fortawesome/free-solid-svg-icons";
/**
 * 
 * @param {crew} sampleCrew crew.dto.js에서 정의된 크루 객체
 * @returns 
 */
function CrewCard({crew}) {
  
  return (
    <div className={styles.card}>
      <img src={crew.profilePath} className={styles.image} />

      <div className={styles.content}>
        <h2 className={styles.title}>{crew.crewName}</h2>
        <p className={styles.description}>
          {crew.introduce}
        </p>
        <div className={styles.footer}>
            <div>
                <span className={styles.region}>{crew.crewRegion}</span>
                <span className={styles.people}> <FontAwesomeIcon icon={faPersonRunning} /> {crew.totalMemberCnt}</span>
            </div>
            <span className={styles.date}>{crew.createdAt} 창단</span>
        </div>
      </div>
    </div>
  );
}

export default CrewCard;