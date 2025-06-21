import styles from './Pagination.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faAngleLeft,
	faAngleRight,
	faAnglesLeft,
	faAnglesRight,
} from '@fortawesome/free-solid-svg-icons';

const Pagination = ({ page, total, limit, onPageChange }) => {
	const totalPages = Math.ceil(total / limit);
	if (totalPages === 0) return null;

	const startPage = Math.floor((page - 1) / 6) * 6 + 1;
	const endPage = Math.min(startPage + 5, totalPages);

	const createPageNumbers = () => {
		const pages = [];
		for (let i = startPage; i <= endPage; i++) {
			pages.push(i);
		}
		return pages;
	};

	return (
		<div className={styles.pagination}>
			<button
				onClick={() => onPageChange(1)}
				disabled={page === 1}
				className={styles.iconButton}
			>
				<FontAwesomeIcon icon={faAnglesLeft} />
			</button>
			<button
				onClick={() => onPageChange(page - 1)}
				disabled={page === 1}
				className={styles.iconButton}
			>
				<FontAwesomeIcon icon={faAngleLeft} />
			</button>

			{createPageNumbers().map((p) => (
				<button
					key={p}
					onClick={() => onPageChange(p)}
					className={`${styles.pageButton} ${page === p ? styles.activePage : ''}`}
				>
					{p}
				</button>
			))}

			<button
				onClick={() => onPageChange(page + 1)}
				disabled={page === totalPages}
				className={styles.iconButton}
			>
				<FontAwesomeIcon icon={faAngleRight} />
			</button>
			<button
				onClick={() => onPageChange(totalPages)}
				disabled={page === totalPages}
				className={styles.iconButton}
			>
				<FontAwesomeIcon icon={faAnglesRight} />
			</button>
		</div>
	);
};

export default Pagination;