import styles from "./Pagenation.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

/**
 * 
 * @param {number} page 현재 페이지
 * @param {boolean} isExistNextPage 다음 페이지 존재 여부
 * @param {function} setPage 페이지 변경 함수 (page => void)
 */
const Pagenation = ({ page, isExistNextPage, setPage }) => {
  return (
    <div className={styles.paginationWrapper}>
        <button
            className={styles.arrowBtn}
            onClick={() => setPage(page - 1)}
            disabled={page <= 1}
        >
            <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <span className={styles.pageNumber}>{page}</span>
        <button
        className={styles.arrowBtn}
        onClick={() => setPage(page + 1)}
        disabled={isExistNextPage === false}
        >
        <FontAwesomeIcon icon={faChevronRight} />
        </button>
    </div>
  );
};

export default Pagenation;