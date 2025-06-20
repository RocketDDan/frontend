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
import MediaViewer from '../image/MediaViewer';
import useCheckLogin from '../../util/RequiredLogin';
import { useAuthStore } from '../../store/authStore';
import { deleteFeed } from '../../api/feed.api';

/**
 * 피드 카드
 * @param {SampleFeed} feed
 * @param {Function} onCommentClick
 * @returns 
 */
const FeedCard = ({ feed, onCommentClick, onAdVisible }) => {

    const [isLiked, setIsLiked] = useState(feed.like); // 유저가 좋아하는지 여부
    const [likeCount, setLikeCount] = useState(feed.likeCount); // 좋아요 수
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 이미지 인덱스
    const [isMapOpen, setIsMapOpen] = useState(false);
    const navigate = useNavigate();

    const adRef = useRef(null);
    const user = useAuthStore((state) => state.user);

    useEffect(() => {
        if (feed.type !== 'ADVERTISE' || !adRef.current || !onAdVisible) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    onAdVisible(feed.feedId);
                }
            },
            {
                threshold: 1.0 // ✅ 요소의 100%가 보여야 트리거
            }
        );

        observer.observe(adRef.current);

        return () => {
            observer.disconnect();
        };
    }, [feed, onAdVisible]);

    const checkLoginUser = useCheckLogin();

    const handleLike = async () => {
        const isLogin = await checkLoginUser();
        if (!isLogin) return;

        // 로그인된 사용자만 실행할 코드
        setIsLiked(true);
        setLikeCount(likeCount + 1);
        fetchLikeFeed(feed.feedId)
            .catch(() => {
                setLikeCount((prev) => prev - 1);
                setIsLiked(false);
            });
    };

    const handleUnlike = async () => {
        const isLogin = await checkLoginUser();
        if (!isLogin) return;
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

    const handleDeleteFeed = () => {
        deleteFeed(feed.feedId);
    }

    return (
        <div id={`feed-${feed.feedId}`} className={style.container} key={feed.feedId}>
            {/* 홍보피드이면 관찰 대상 div 추가 */}
            {feed.type === 'ADVERTISE' && (
                <div ref={adRef} style={{ height: '1px' }} />
            )}
            {/* 작성자 정보 */}
            <div className={style.writerRow}>
                <ProfileImage
                    profileUrl={feed.writerProfileUrl}
                    size="40px"
                    onClick={handleClickProfile} />

                <div onClick={handleClickProfile}>
                    {feed.writerNickname}
                </div>

                <div style={{ display: 'flex', justifyContent: 'end', paddingRight: '5px' }}>
                    {user && user.memberId && (feed.writerId === user.memberId) &&
                        <span onClick={handleDeleteFeed}>삭제</span>
                    }
                    {/* <span>&nbsp;</span> */}
                </div>
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
                <div style={{ display: "flex", justifyContent: "end", gap: "0.5rem" }}>
                    {feed.lat && feed.lng && (
                        <span className={`${style.tag} pinkBg`} onClick={openLocationModal}>
                            #위치
                        </span>
                    )}
                    {feed.type === 'ADVERTISE' && (
                        <span className={`${style.tag} secondaryBg`}>
                            #홍보
                        </span>
                    )}
                </div>
            </div>

            {/* 피드 글 */}
            <div className={style.feedContent}>
                <span className={style.writer}>{feed.writerNickname}</span>
                <span className={style.content}>{feed.content}</span>
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

export default FeedCard;