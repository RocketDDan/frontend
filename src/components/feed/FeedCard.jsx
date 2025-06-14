// css
import feedCardStyle from './FeedCard.module.css'
// image
import { ProfileImage } from '../profile/ProfileImage';
// icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons'
import { faMessage, faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons'
// dto
import SampleFeed from "../../dto/feed.dto";
import { fetchLikeFeed, fetchUnlikeFeed } from '../../api/likeFeed.api';
import { useState } from 'react';


/**
 * 피드 카드
 * @param {SampleFeed} feed
 * @param {Function} onCommentClick
 * @returns 
 */
const FeedCard = ({ feed, onCommentClick }) => {

    const [isLiked, setIsLiked] = useState(feed.like); // 유저가 좋아하는지 여부
    const [likeCount, setLikeCount] = useState(feed.likeCount); // 좋아요 수

    const handleLike = () => {
        setIsLiked(true);
        setLikeCount(likeCount + 1);
        fetchLikeFeed(feed.feedId);
    };

    const handleUnlike = () => {
        setIsLiked(false);
        setLikeCount(likeCount - 1);
        fetchUnlikeFeed(feed.feedId);
    };
    

    return (
        <div className={feedCardStyle.container} key={feed.feedId}>
            {/* 작성자 정보 */}
            <div className={feedCardStyle.writerRow}>
                <FeedProfileImage profileUrl={feed.writerProfileUrl} />
                <span>{feed.writerNickname}</span>
                <div style={{ display: 'flex', justifyContent: 'end', paddingRight: '5px' }}>⋯</div>
            </div>

            {/* 피드 이미지들 */}
            <div className={feedCardStyle.feedImageList}>
                {feed.feedFileUrlList.map(feedFileUrl => {
                    return (
                        <img
                            src={feedFileUrl.fileUrl}
                            alt="피드 이미지"
                            key={feed.feedId + "_" + feedFileUrl.order} />
                    )
                })}
            </div>

            {/* 이미지 아래 아이콘 행 */}
            <div className={feedCardStyle.iconRow}>
                <div className={feedCardStyle.heartMessage}>
                    <span>
                        <span style={{ cursor: 'pointer' }}>
                            {
                                isLiked
                                    ? <FontAwesomeIcon icon={faSolidHeart} style={{ color: 'red' }} onClick={handleUnlike} />
                                    : <FontAwesomeIcon icon={faRegularHeart} onClick={handleLike} />
                            }
                        </span>
                        <span>{likeCount}</span>
                    </span>
                    <span style={{ cursor: 'pointer' }}  onClick={onCommentClick}>
                        <FontAwesomeIcon icon={faMessage} style={{marginTop: '2px',}} />
                        <span>{feed.commentCount}</span>
                    </span>
                </div>
                <div>
                    {/* 피드가 1개 이상이면 ...으로 보임 */}
                    {feed.feedFileUrlList.length > 1 && '.'.repeat(feed.feedFileUrlList.length)}
                </div>
                <div></div> {/* 빈 공간 */}
            </div>

            {/* 피드 글 */}
            <div className={feedCardStyle.feedContent}>
                <span style={{ fontWeight: "bold" }}>{feed.writerNickname}</span>
                <span>{feed.content}</span>
            </div>

            {/* 댓글 */}
            <div className={feedCardStyle.commentList}>
                {/* 최대 3개만 보여주기 */}
                {feed.commentList.map(comment => {
                    {/* 댓글 */ }
                    return (
                        <div key={comment.commentId}>
                            <span style={{ fontWeight: "bold" }}>{comment.writerNickname}</span>
                            <span>{comment.content}</span>
                        </div>
                    )
                })}
            </div>

            {/* 댓글 모두 보기 */}
            {/* <div>
                {
                    feed.commentCount
                        ? <div>
                            댓글 {feed.commentCount}개 모두 보기
                        </div>
                        : <div>
                            댓글 달기
                        </div>
                }
            </div> */}
        </div >
    );
}

export default FeedCard;