import React, { useState } from 'react';
import style from './FeedDetailModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faTimes, faHeart as faSolidHeart, faClose } from '@fortawesome/free-solid-svg-icons';
import { faMessage, faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import MediaViewer from '../image/MediaViewer';
import KakaoMap from '../map/KakaoMap';
import { ProfileImage } from '../profile/ProfileImage';
import useCheckLogin from '../../util/RequiredLogin';
import { fetchLikeFeed, fetchUnlikeFeed } from '../../api/likeFeed.api';
import { useNavigate } from 'react-router-dom';

const FeedDetailModal = ({ feed, onClose }) => {
    const [isLiked, setIsLiked] = useState(feed.like);
    const [likeCount, setLikeCount] = useState(feed.likeCount);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMapOpen, setIsMapOpen] = useState(false);
    const navigate = useNavigate();
    const checkLoginUser = useCheckLogin();

    const handleLike = async () => {
        if (!(await checkLoginUser())) return;
        setIsLiked(true);
        setLikeCount((prev) => prev + 1);
        fetchLikeFeed(feed.feedId).catch(() => {
            setIsLiked(false);
            setLikeCount((prev) => prev - 1);
        });
    };

    const handleUnlike = async () => {
        if (!(await checkLoginUser())) return;
        setIsLiked(false);
        setLikeCount((prev) => prev - 1);
        fetchUnlikeFeed(feed.feedId).catch(() => {
            setIsLiked(true);
            setLikeCount((prev) => prev + 1);
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

    return (
        <div className={style.mapModalOverlay} onClick={onClose}>
            <div className={style.mapModalContent} onClick={(e) => e.stopPropagation()}>
                {/* 닫기 버튼 */}
                <div className={style.mapHeader}>
                    <FontAwesomeIcon icon={faClose} onClick={onClose} size='lg'/>
                </div>

                {/* 작성자 */}
                <div className={style.writerRow}>
                    <ProfileImage profileUrl={feed.writerProfileUrl} size="40px" onClick={handleClickProfile} />
                    <span onClick={handleClickProfile}>{feed.writerNickname}</span>
                    <span></span>
                </div>

                {/* 이미지 */}
                <div className={style.feedImageList} style={{ position: 'relative' }}>
                    <MediaViewer fileUrl={feed.feedFileUrlList[currentIndex]?.fileUrl} />
                    {feed.feedFileUrlList.length > 1 && (
                        <>
                            <button onClick={handlePrev} className={style.imageChangeBtn} style={{ left: '10px' }}>
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </button>
                            <button onClick={handleNext} className={style.imageChangeBtn} style={{ right: '10px' }}>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </button>
                        </>
                    )}
                </div>

                {/* 좋아요/댓글 */}
                <div className={style.iconRow}>
                    <div className={style.heartMessage}>
                        <span style={{ cursor: 'pointer' }}>
                            {isLiked ? (
                                <FontAwesomeIcon icon={faSolidHeart} size="lg" style={{ color: 'red' }} onClick={handleUnlike} />
                            ) : (
                                <FontAwesomeIcon icon={faRegularHeart} size="lg" onClick={handleLike} />
                            )}
                            <span>{likeCount}</span>
                        </span>
                        <span>
                            <FontAwesomeIcon icon={faMessage} size="lg" />
                            <span>{feed.commentCount}</span>
                        </span>
                    </div>
                </div>

                {/* 태그 */}
                <div style={{ display: "flex", justifyContent: "end", gap: "0.5rem", padding: "0 1rem" }}>
                    {feed.lat && feed.lng && (
                        <span className={`${style.tag} pinkBg`} onClick={() => setIsMapOpen(true)}>
                            #위치
                        </span>
                    )}
                    {feed.type === 'ADVERTISE' && (
                        <span className={`${style.tag} secondaryBg`}>#홍보</span>
                    )}
                </div>

                {/* 내용 */}
                <div className={style.feedContent}>
                    <span style={{ fontWeight: 'bold' }}>{feed.writerNickname}</span>
                    <span>{feed.content}</span>
                </div>

                {/* 지도 모달 */}
                {isMapOpen && (
                    <div className={style.mapModalOverlay} onClick={() => setIsMapOpen(false)}>
                        <div className={style.mapModalContent} onClick={(e) => e.stopPropagation()}>
                            <div className={style.mapHeader}>
                                <h2>📍 위치 정보</h2>
                                <button className={style.closeButton} onClick={() => setIsMapOpen(false)}>×</button>
                            </div>
                            <div className={style.mapBox}>
                                <KakaoMap
                                    zoom={6}
                                    width="100%"
                                    height="100%"
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
        </div>
    );
};

export default FeedDetailModal;