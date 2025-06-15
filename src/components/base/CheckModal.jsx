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
 * @param {Boolean} useButton 버튼 사용 여부 (기본값: true)
 * @param {String} width 모달 가로 크기 (기본값: "400px")
 * @param {String} height 모달 세로 크기 (기본값: "auto")
 * @returns 
 */
const CheckModal = ({
  title,
  description,
  onConfirm,
  onClose,
  useButton = true, // 버튼 사용 여부
  width = "400px",  // 기본값 추가
}) => {
    return (
        <div className={styles.modalBackground}>
        <div
            className={styles.modalWrapper}
            style={{ width }}
        >
            <FontAwesomeIcon icon={faXmark} onClick={onClose} className={styles.closeBtn}/>
            <div className={styles.titleStyle}>{title}</div>
            <div className={styles.descStyle}>{description}</div>
            {useButton && (
                <div className={styles.btnStyle}>
                    <SecondaryHoverButton content="확인" width="70px" onClick={onConfirm}/>
                    <ThirdaryButton content="취소" width="70px" onClick={onClose}/>
                </div>
            )}
        </div>
        </div>
    );    
};

export {CheckModal};