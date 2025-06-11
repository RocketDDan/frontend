import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FeedProfileImage } from '../profile/ProfileImage';
import style from './CommentPanel.module.css';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { TextInput } from '../base/Input';
import { PrimaryButton } from '../base/Button';

const CommentPanel = ({ feed, onClose }) => {

    const handleComment = () => {
        console.log("클릭");
    }

    return feed ? (
        <div className={style.container}>
            {/* 헤더 */}
            <label>
                <div className={style.up}>
                    <div>&nbsp;</div>
                    <span>댓글</span>
                    <span className={style.closeBtn}>
                        <FontAwesomeIcon icon={faClose} onClick={onClose} />
                    </span>
                </div>
                <hr />
            </label>
            {/* 댓글 목록 */}
            <div className={style.commentList}>
                {feed.commentList.map(comment => (
                    <div key={comment.commentId}>
                        <span className={style.feedProfile}>
                            <FeedProfileImage profileUrl={comment.FeedProfileImage} />
                            <b>{comment.writerNickname}</b>
                        </span>
                        <span>{comment.content}</span>
                    </div>
                ))}
            </div>
            {/* 댓글 작성 */}
            <div className={style.write}>
                <TextInput />
                <PrimaryButton width='30%' content='입력' onClick={handleComment} />
            </div>
        </div>
    ): null;
}

export default CommentPanel;