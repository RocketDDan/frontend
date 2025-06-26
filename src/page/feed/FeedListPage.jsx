// css
import style from './FeedListPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
// library
import React, { useState, useEffect, useCallback, useRef } from "react";
// api
import { fetchFeedList } from "../../api/feed/feed.api";
import { logAdFeedView } from '../../api/feed/feedViewLog.api';
// Component
import FeedCard from "../../components/feed/FeedCard";
import CommentPanel from '../../components/feed/CommentPanel';
import { useNavigate } from 'react-router-dom';
// store
import useCheckLogin from '../../util/RequiredLogin';
import { useAuthStore } from '../../store/authStore';
import { useFeed } from "../../store/FeedContext";
import LoadingSpinner from '../../components/base/LoadingSpinner';


const FeedListPage = () => {
    const navigate = useNavigate();

    const checkLoginUser = useCheckLogin();
    const { lastViewedFeedId, setLastViewedFeedId } = useFeed();
    const perPage = 5;

    // 전역 변수
    const user = useAuthStore(state => state.user);

    const observerTarget = useRef(null); // 피드의 마지막 

    const [isLoading, setIsLoading] = useState(false); // 로딩중인지 여부 (로딩 중일땐)
    const [page, setPage] = useState(1); // 페이지
    const [isLastPage, setIsLastPage] = useState(false); // 마지막 페이지 여부

    const [feedList, setFeedList] = useState([]); // 피드 데이터
    const [selectedFeed, setSelectedFeed] = useState(null); // 선택된 피드 (댓글창 열 피드)

    // 피드들 가져오는 함수
    const loadFeeds = async () => {
        setIsLoading(true);
        try {
            const data = await fetchFeedList({
                page,
                perPage,
                scope: "ALL_EXCEPT_ME",
                order: "LATEST",
            });

            if (data.length < perPage) setIsLastPage(true);

            setFeedList(prev => {
                // 중복 제거
                const existingIds = new Set(prev.map(f => f.feedId));
                const newFeeds = data.filter(f => !existingIds.has(f.feedId));
                return [...prev, ...newFeeds];
            });
        } catch (err) {
            console.error("피드 로딩 실패:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // 옵저버가 변경 
    const handleObserver = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting && !isLoading) {
            setPage(prev => prev + 1);
        }
    }, [isLoading]);

    // 홍보 피드 조회 로그 전송
    const handleAdFeedVisible = useCallback((feedId) => {
        logAdFeedView(feedId);
    }, []);

    // 댓글창 열거나 닫기
    const handleCommentClick = (feed) => {
        if (selectedFeed == null) { // 열린 피드가 없으면 열기
            setSelectedFeed(feed);
        } else if (selectedFeed.feedId === feed.feedId) {  // 같은 피드면 접기
            setSelectedFeed(null);
        } else { // 현재 열린 피드와 클릭한 피드가 다르면 열기
            setSelectedFeed(feed);
        }
    };

    // feed id 있는 곳까지 스크롤
    const handleFeedFocus = (feedId) => {
        if (!feedId) return;

        const timeout = setTimeout(() => {
            const el = document.getElementById(`feed-${feedId}`);
            if (el) {
                el.scrollIntoView({
                    behavior: 'smooth', // smooth, auto
                    block: 'start'
                });
            }
        }, 0);

        return () => clearTimeout(timeout);
    }

    // 댓글창 닫기
    const handleClosePanel = () => {
        setSelectedFeed(null);
    };

    // 댓글 개수 증가
    const handleFeedCommentCntUp = (feedId) => {
        feedList.map(feed => {
            if (feed.feedId === feedId) {
                feed.commentCount += 1;
            }
        })
    }

    // 댓글 개수 감소
    const handleFeedCommentCntDown = (feedId) => {
        feedList.map(feed => {
            if (feed.feedId === feedId) {
                feed.commentCount -= 1;
            }
        })
    }

    // 피드 업로드 버튼
    const handlePlusBtn = async () => {
        const isLogin = await checkLoginUser();
        if (!isLogin) return;
        navigate("/feed/upload");
    }

    useEffect(() => {
        if (!lastViewedFeedId || page > 10) return;

        const targetExists = feedList.some(feed => feed.feedId === lastViewedFeedId);
        console.log("이전 클릭 피드 찾았는지 여부: ", targetExists)
        if (targetExists) {
            handleFeedFocus(lastViewedFeedId); // 포커스 이동
            setLastViewedFeedId(null); // 다시 최근 피드 id 없애기
        } else {
            // 피드 더 로딩
            setPage(prev => prev + 1);
            console.log("로딩: page: ", page);
        }
    }, [feedList]);

    // 로그인 상태 바뀔 때 피드 초기화
    useEffect(() => {
        setFeedList([]);
        setPage(1);
    }, [user]);

    // 피드 가져오기
    useEffect(() => {
        if (isLastPage) return;
        loadFeeds();
    }, [page]);

    // 피드의 마지막 요소가 10% 이상 보이면 handleObserver 실행 (이휴 page++ -> loadFeed() -> 피드 무한 스크롤)
    useEffect(() => {
        // IntersectionObserver 생성
        const observer = new IntersectionObserver(handleObserver, {
            threshold: 0.1
        });
        // observer.observe(target)로 관찰 시작
        if (observerTarget.current) observer.observe(observerTarget.current);
        // useEffect 종료 시 해제 (메모리 누수 방지)
        return () => observer.disconnect();
    }, [handleObserver]);

    return (
        <div className={`${style.container} ${selectedFeed ? style.openCommentPanel : ''}`}>
            {/* 피드 목록 (스크롤) */}
            <div className={style.feedList}>
                {feedList.map((feed, index) => {
                    return (
                        <React.Fragment key={feed.feedId}>
                            <FeedCard
                                feed={feed}
                                onCommentClick={() => handleCommentClick(feed)}
                                onAdVisible={handleAdFeedVisible}
                            />
                            {index === feedList.length - 2 && (
                                <div
                                    ref={observerTarget}
                                    style={{ height: '10px' }}
                                />
                            )}
                        </React.Fragment>
                    )
                }
                )}

                {isLoading && (
                    <div style={{ textAlign: 'center', margin: '0 0' }}>
                        <LoadingSpinner />
                    </div>
                )}
            </div>
            {/* 댓글창 */}
            {
                selectedFeed
                    ? <div>
                        <CommentPanel
                            feed={selectedFeed}
                            onClose={handleClosePanel}
                            writeComment={handleFeedCommentCntUp}
                            deleteComment={handleFeedCommentCntDown} />
                    </div>
                    : null
            }
            {
                !selectedFeed
                    ? <button className={style.uploadBtn} onClick={handlePlusBtn}>
                        <FontAwesomeIcon style={{ color: "white" }} icon={faPlus} size="2xl" />
                    </button>
                    : null
            }
        </div>
    )
}

export default FeedListPage;