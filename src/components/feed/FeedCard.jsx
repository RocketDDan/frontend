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
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';


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
    const navigate = useNavigate();

    // 좋아요 클릭
    const handleLike = () => {
        setIsLiked(true);
        setLikeCount(likeCount + 1);
        fetchLikeFeed(feed.feedId)
            .catch((err) => { // ? [낙관적 렌더링] 좋아요 먼저 한 것 처럼 보이고 에러 시 롤백
                setLikeCount((prev) => prev - 1);
                setIsLiked(false);
            });
    };

    // 좋아요 취소
    const handleUnlike = () => {
        setIsLiked(false);
        setLikeCount(likeCount - 1);
        fetchUnlikeFeed(feed.feedId)
            .catch((err) => {  // ? [낙관적 렌더링] 좋아요 먼저 취소한 것 처럼 보이고 에러 시 롤백
                setLikeCount((prev) => prev + 1);
                setIsLiked(true);
            });
    };

    // 이전 사진/동영상 가져오기
    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? feed.feedFileUrlList.length - 1 : prev - 1));
    };

    // 다음 사진/동영상 가져오기
    const handleNext = () => {
        setCurrentIndex((prev) => (prev === feed.feedFileUrlList.length - 1 ? 0 : prev + 1));
    };

    // 러너 프로필 페이지 이동
    const handleClickProfile = () => {
        navigate(`/runner/${feed.writerId}`)
    }

    return (
        <div className={style.container} key={feed.feedId}>
            {/* 작성자 정보 */}
            <div className={style.writerRow}>
                <ProfileImage 
                profileUrl={feed.writerProfileUrl} 
                size="40px" 
                onClick={handleClickProfile} />
                <span onClick={handleClickProfile}>{feed.writerNickname}</span>
                <div style={{ display: 'flex', justifyContent: 'end', paddingRight: '5px' }}>⋯</div>
            </div>

            {/* 피드 이미지들 */}
            <div className={`${style.feedImageList}`} style={{ position: 'relative' }}>
                <MediaViewer fileUrl={feed.feedFileUrlList[currentIndex]?.fileUrl} />
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
                                    ? <FontAwesomeIcon icon={faSolidHeart} size='lg' style={{ color: 'red' }} onClick={handleUnlike} />
                                    : <FontAwesomeIcon icon={faRegularHeart} size='lg' onClick={handleLike} />
                            }
                        </span>
                        <span>{likeCount}</span>
                    </span>
                    <span style={{ cursor: 'pointer' }} onClick={onCommentClick}>
                        <FontAwesomeIcon icon={faMessage} size='lg' style={{ marginTop: '2px', }} />
                        <span>{feed.commentCount}</span>
                    </span>
                </div>
                <div>
                    {/* 피드가 1개 이상이면 ...으로 보임 */}
                    {feed.feedFileUrlList.length > 1 && '.'.repeat(feed.feedFileUrlList.length)}
                </div>
                <div style={{ textAlign: "end" }}>
                    {
                        feed.lat && feed.lng && (
                            <span>
                                #위치
                            </span>
                        )
                    }
                </div> {/* 빈 공간 */}
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
        </div >
    );
}

const MediaViewer = ({ fileUrl }) => {

    const videoRef = useRef(null);

    // video 인지  
    const isVideo = (url) => {
        if (!url) return false;

        const cleanUrl = url.split('?')[0];  // 쿼리 스트링 제거
        return cleanUrl.endsWith('.mp4')
            || cleanUrl.endsWith('.mov')
            || cleanUrl.endsWith('.webm');
    }

    const isVideoFile = isVideo(fileUrl);

    useEffect(() => {
        if (isVideoFile && videoRef.current) {
            videoRef.current.load(); // ✅ 명시적으로 src 다시 로드 (필요할 경우)
        }
    }, [fileUrl, isVideoFile]);

    if (isVideoFile) {
        return (
            <video
                ref={videoRef}
                style={{ width: '100%', height: 'auto' }}
                controls
            >
                <source src={fileUrl} type="video/mp4" />
                브라우저가 video 태그를 지원하지 않습니다.
            </video>
        );
    }

    return (
        <img
            src={fileUrl}
            alt="피드 이미지"
            // className={style.zoomable}
            style={{ width: '100%', height: 'auto' }} />
    );
}

export default FeedCard;