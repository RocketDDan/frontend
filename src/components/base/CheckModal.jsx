import { SecondaryHoverButton, ThirdaryButton } from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "./CheckModal.module.css";

/**
 * 
 * @param {String} title
 * @param {String} description
 * @param {Function} onConfirm 확인 버튼 클릭 시 이벤트
 * @param {Function} onClose 모달 닫기 버튼 클릭 시 이벤트
 * @returns 
 */
const CheckModal = ({
  title,
  description,
  onConfirm,
  onClose
}) => {
    return (
        <div className={styles.modalBackground}>
        <div className={styles.modalWrapper}>
            <FontAwesomeIcon icon={faXmark} onClick={onClose} className={styles.closeBtn}/>
            <div className={styles.titleStyle}>{title}</div>
            <div className={styles.descStyle}>{description}</div>
            <div className={styles.btnRowStyle}>
                <SecondaryHoverButton content="확인" width="70px" onClick={onConfirm}/>
                <ThirdaryButton content="취소" width="70px" onClick={onClose}/>
            </div>
        </div>
        </div>
    );    
};

export {CheckModal};