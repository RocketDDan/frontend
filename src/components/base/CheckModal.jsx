import { SecondaryHoverButton, ThirdaryButton } from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "./CheckModal.module.css";

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

export default CheckModal;