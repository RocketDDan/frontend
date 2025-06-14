// css
import style from './FeedCard.module.css'
// image
import { ProfileImage } from '../profile/ProfileImage';
// icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons'
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
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 이미지 인덱스

    // 좋아요 클릭
    const handleLike = () => {
        setIsLiked(true);
        setLikeCount(likeCount + 1);
        fetchLikeFeed(feed.feedId);
    };

    // 좋아요 취소
    const handleUnlike = () => {
        setIsLiked(false);
        setLikeCount(likeCount - 1);
        fetchUnlikeFeed(feed.feedId);
    };

    // 이전 사진/동영상 가져오기
    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? feed.feedFileUrlList.length - 1 : prev - 1));
    };

    // 다음 사진/동영상 가져오기
    const handleNext = () => {
        setCurrentIndex((prev) => (prev === feed.feedFileUrlList.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className={style.container} key={feed.feedId}>
            {/* 작성자 정보 */}
            <div className={style.writerRow}>
                <ProfileImage profileUrl={feed.writerProfileUrl} size="30px" />
                <span>{feed.writerNickname}</span>
                <div style={{ display: 'flex', justifyContent: 'end', paddingRight: '5px' }}>⋯</div>
            </div>

            {/* 피드 이미지들 */}
            <div className={style.feedImageList} style={{ position: 'relative' }}>
                <img
                    src={feed.feedFileUrlList?.[currentIndex]?.fileUrl}
                    alt="피드 이미지"
                    style={{ width: '100%', height: 'auto' }}
                />
                {/* 왼쪽 화살표 */}
                {feed.feedFileUrlList.length > 1 && (
                    <button
                        onClick={handlePrev}
                        className={style.imageChangeBtn}
                        style={{ left: '10px', }}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    // ◀
                )}

                {/* 오른쪽 화살표 */}
                {feed.feedFileUrlList.length > 1 && (
                    <button
                        onClick={handleNext}
                        className={style.imageChangeBtn}
                        style={{ right: '10px', }}
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                    // ▶
                )}
            </div>

            {/* 이미지 아래 아이콘 행 */}
            <div className={style.iconRow}>
                <div className={style.heartMessage}>
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
                    <span style={{ cursor: 'pointer' }} onClick={onCommentClick}>
                        <FontAwesomeIcon icon={faMessage} style={{ marginTop: '2px', }} />
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
            <div className={style.feedContent}>
                <span style={{ fontWeight: "bold" }}>{feed.writerNickname}</span>
                <span>{feed.content}</span>
            </div>

            {/* 댓글 */}
            
            <div className={style.commentList}>
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