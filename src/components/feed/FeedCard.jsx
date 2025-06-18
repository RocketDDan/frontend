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
import KakaoMap from '../map/KakaoMap';

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
    const [isMapOpen, setIsMapOpen] = useState(false);
    const mapRef = useRef(null);
    const navigate = useNavigate();

    const handleLike = () => {
        setIsLiked(true);
        setLikeCount(likeCount + 1);
        fetchLikeFeed(feed.feedId)
            .catch(() => {
                setLikeCount((prev) => prev - 1);
                setIsLiked(false);
            });
    };

    const handleUnlike = () => {
        setIsLiked(false);
        setLikeCount(likeCount - 1);
        fetchUnlikeFeed(feed.feedId)
            .catch(() => {
                setLikeCount((prev) => prev + 1);
                setIsLiked(true);
            });
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? feed.feedFileUrlList.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === feed.feedFileUrlList.length - 1 ? 0 : prev + 1));
    };

    const handleClickProfile = () => {
        navigate(`/runner/${feed.writerId}`);
    };

    const openLocationModal = () => {
        setIsMapOpen(true);
    };

    const closeLocationModal = () => {
        setIsMapOpen(false);
    };

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
                {feed.feedFileUrlList.length > 1 && (
                    <button
                        onClick={handlePrev}
                        className={style.imageChangeBtn}
                        style={{ left: '10px' }}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                )}
                {feed.feedFileUrlList.length > 1 && (
                    <button
                        onClick={handleNext}
                        className={style.imageChangeBtn}
                        style={{ right: '10px' }}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                )}
            </div>

            {/* 아이콘 행 */}
            <div className={style.iconRow}>
                <div className={style.heartMessage}>
                    <span style={{ cursor: 'pointer' }}>
                        {isLiked
                            ? <FontAwesomeIcon icon={faSolidHeart} size='lg' style={{ color: 'red' }} onClick={handleUnlike} />
                            : <FontAwesomeIcon icon={faRegularHeart} size='lg' onClick={handleLike} />}
                        <span>{likeCount}</span>
                    </span>
                    <span style={{ cursor: 'pointer' }} onClick={onCommentClick}>
                        <FontAwesomeIcon icon={faMessage} size='lg' style={{ marginTop: '2px' }} />
                        <span>{feed.commentCount}</span>
                    </span>
                </div>
                <div>{feed.feedFileUrlList.length > 1 && '.'.repeat(feed.feedFileUrlList.length)}</div>
                <div style={{ textAlign: "end" }}>
                    {feed.lat && feed.lng && (
                        <span className={style.tag} onClick={openLocationModal} style={{ backgroundColor: '#ffe3e3', cursor: 'pointer' }}>
                            #위치
                        </span>
                    )}
                    {feed.type === 'ADVERTISE' && (
                        <span className={style.tag} style={{ backgroundColor: '#ffe3e3', color: '#d63031' }}>
                            #홍보
                        </span>
                    )}
                    {feed.type === 'PERSONAL' && (
                        <span className={style.tag} style={{ backgroundColor: '#e3f2fd', color: '#2980b9' }}>
                            #일반
                        </span>
                    )}
                </div>
            </div>

            {/* 피드 글 */}
            <div className={style.feedContent}>
                <span style={{ fontWeight: "bold" }}>{feed.writerNickname}</span>
                <span>{feed.content}</span>
            </div>

            {/* 댓글 */}
            <div className={style.commentList}>
                {feed.commentList.map(comment => (
                    <div key={comment.commentId}>
                        <span style={{ fontWeight: "bold" }}>{comment.writerNickname}</span>
                        <span>{comment.content}</span>
                    </div>
                ))}
            </div>

            {/* 위치 모달 */}
            {isMapOpen && (
                <div className={style.mapModalOverlay} onClick={closeLocationModal}>
                    <div className={style.mapModalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={style.mapHeader}>
                            <h2>📍 위치 정보</h2>
                            <button className={style.closeButton} onClick={closeLocationModal}>×</button>
                        </div>
                        <div className={style.mapBox}>
                            <KakaoMap
                                zoom={6}
                                width={"100%"}
                                height={"100%"}
                                lat={feed.lat}
                                lng={feed.lng}
                                canSearchAddress={false}
                                draggable={false}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const MediaViewer = ({ fileUrl }) => {
    const videoRef = useRef(null);

    const isVideo = (url) => {
        if (!url) return false;
        const cleanUrl = url.split('?')[0];
        return cleanUrl.endsWith('.mp4') || cleanUrl.endsWith('.mov') || cleanUrl.endsWith('.webm');
    };

    const isVideoFile = isVideo(fileUrl);

    useEffect(() => {
        if (isVideoFile && videoRef.current) {
            videoRef.current.load();
        }
    }, [fileUrl, isVideoFile]);

    if (isVideoFile) {
        return (
            <video ref={videoRef} style={{ width: '100%', height: 'auto' }} controls>
                <source src={fileUrl} type="video/mp4" />
                브라우저가 video 태그를 지원하지 않습니다.
            </video>
        );
    }

    return <img src={fileUrl} alt="피드 이미지" style={{ width: '100%', height: 'auto' }} />;
};

export default FeedCard;