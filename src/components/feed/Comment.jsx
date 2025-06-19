import { ProfileImage } from '../profile/ProfileImage';
import style from './Comment.module.css';

/**
 * @component
 * @param {Object} comment 
 * @param {Function} clickDelete 삭제 버튼 클릭 시 이벤트
 * @returns 
 */
const Comment = ({ comment, clickDelete }) => {

    const handleClickDelete = (commentId) => {
        clickDelete?.(commentId)
    }

    // 상대 시간 포맷터
    const formatRelativeTime = (createdAt) => {
        const now = new Date();
        const createdDate = new Date(
            createdAt.substring(0, 4),               // year
            createdAt.substring(5, 7) - 1,           // month (0-based)
            createdAt.substring(8, 10),              // day
            createdAt.substring(11, 13),             // hour
            createdAt.substring(14, 16),             // minute
            createdAt.substring(17, 19)              // second
        );

        const diffMs = now - createdDate;
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHour = Math.floor(diffMin / 60);
        const diffDay = Math.floor(diffHour / 24);
        const diffWeek = Math.floor(diffDay / 7);
        const diffMonth = Math.floor(diffDay / 30);

        if (diffMonth >= 1) return `${diffMonth}개월`;
        if (diffWeek >= 1) return `${diffWeek}주`;
        if (diffDay >= 1) return `${diffDay}일`;
        if (diffHour >= 1) return `${diffHour}시간`;
        if (diffMin >= 1) return `${diffMin}분`;
        return '방금';
    }

    return (
        <div className={style.container}>
            <ProfileImage profileUrl={comment.writerProfileUrl} size="30px" />
            <div className={style.main}>
                <div className={style.nicknameAndDate}>
                    <b>{comment.writerNickname}</b>
                    <div>{formatRelativeTime(comment.createdAt)}</div>
                </div>
                <div className={style.comment}>{comment.content}</div>
            </div>
            {comment.mine && (
                <div className={style.deleteBtn} onClick={() => handleClickDelete(comment.commentId)}>
                    삭제
                </div>
            )}
        </div>
    )
}

export default Comment;