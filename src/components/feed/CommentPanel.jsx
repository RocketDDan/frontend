import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FeedProfileImage } from '../profile/ProfileImage';
import commentPanelStyle from './CommentPanel.module.css';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const CommentPanel = ({ feed, onClose }) => {
    return (
        feed != null && <div className={commentPanelStyle.container}>
            {feed ? (
                <div>
                    <label>
                        <div className={commentPanelStyle.up}>
                            <div>&nbsp;</div>
                            <span>댓글</span>
                            <span className={commentPanelStyle.closeBtn}>
                                <FontAwesomeIcon icon={faClose} onClick={onClose} />
                            </span>
                        </div>
                        <hr />
                    </label>
                    <div className={commentPanelStyle.commentList}>
                        {feed.commentList.map(comment => (
                            <div key={comment.commentId}>
                                <span className={commentPanelStyle.feedProfile}>
                                    <FeedProfileImage profileUrl={comment.FeedProfileImage} />
                                    <b>{comment.writerNickname}</b>
                                </span>
                                <span>{comment.content}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default CommentPanel;