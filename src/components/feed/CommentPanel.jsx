import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProfileImage } from '../profile/ProfileImage';
import style from './CommentPanel.module.css';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { TextInput } from '../base/Input';
import { PrimaryButton, SecondaryButton } from '../base/Button';
import { useEffect, useState } from 'react';
import { deleteFeedComment, fetchFeedCommentList, postFeedComment } from '../../api/feedComment.api';
import sampleFeed from '../../dto/feed.dto';


/**
 * @component
 * @param {sampleFeed} feed 
 * @returns 
 */
const CommentPanel = ({ feed, onClose }) => {

    const [inputValue, setInputValue] = useState("");
    const [commentList, setCommentList] = useState([]);

    const handleInputChange = (val) => {
        setInputValue(val);
    }

    const handleSubmit = async () => {
        // 댓글 작성 api 호출
        await postFeedComment(feed.feedId, inputValue);
        setInputValue("");
    }

    // 댓글 목록 가져오기
    const fetchData = async () => {
        const data = await fetchFeedCommentList(feed.feedId);
        setCommentList(data);
    };

    const handleCommentDelete = async (commentId) => {
        await deleteFeedComment(feed.feedId, commentId);
        fetchData();
    }

    useEffect(() => {
        if (!feed) return;
        fetchData();
    }, [feed])

    if (!feed) return null;

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
                {commentList.map(comment => (
                    <div key={comment.commentId}>
                        <div className={style.timeRow}>
                            <span>{comment.createdAt}</span>
                        </div>
                        <div className={style.commentRow}>
                            <span className={style.feedProfile}>
                                <ProfileImage profileUrl={comment.writerProfileUrl} size="30px" />
                                <b>{comment.writerNickname}</b>
                            </span>
                            <span>{comment.content}</span>
                            <span>{comment.mine
                                ? <SecondaryButton content="삭제" onClick={() => { handleCommentDelete(comment.commentId) }} />
                                : ""}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            {/* 댓글 작성 */}
            <div className={style.write}>
                <TextInput
                    closeBtnVisible={true}
                    value={inputValue}
                    placeholder={"댓글 입력"}
                    onChange={handleInputChange} />
                <PrimaryButton
                    width='30%'
                    content='입력'
                    onClick={handleSubmit} />
            </div>
        </div>
    ) : null;
}

export default CommentPanel;