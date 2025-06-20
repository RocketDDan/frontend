// css
import style from './FeedListPage.module.css';
// library
import { useState, useEffect, useCallback, useRef } from "react";
// api
import { fetchFeedList } from "../../api/feed.api";
// Component
import FeedCard from "../../components/feed/FeedCard";
import CommentPanel from '../../components/feed/CommentPanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { logAdFeedView } from '../../api/feedViewLog.api';
import useCheckLogin from '../../util/RequiredLogin';
import { useAuthStore } from '../../store/authStore';


const FeedListPage = () => {

    const [feedList, setFeedList] = useState([]); // 피드 데이터
    const [selectedFeed, setSelectedFeed] = useState(null); // 선택된 피드 (댓글창 열 피드)
    const [page, setPage] = useState(1); // 페이지
    const [isLoading, setIsLoading] = useState(false); // 로딩중인지 여부
    const [isLastPage, setIsLastPage] = useState(false); // 마지막 페이지인지 여부
    const observerTarget = useRef(null); // 
    const navigate = useNavigate();
    const user = useAuthStore(state => state.user);
    const checkLoginUser = useCheckLogin();

    // 이전 위치에서 돌아왔을 때 스크롤이 아래에 있을 수 있어 초기 상태로?
    // useEffect(() => {
    //     window.scrollTo(0, 0);
    // }, []);

    // 로그인 상태 바뀔 때 피드 초기화
    useEffect(() => {
        setFeedList([]);
        setPage(1);
    }, [user]);

    // 선택된 피드가 바뀌면 해당 위치로 스크롤 이동
    useEffect(() => {
        if (selectedFeed) {
            const el = document.getElementById(`feed-${selectedFeed.feedId}`);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [selectedFeed]);

    useEffect(() => {
        if (isLastPage) return;
        const loadFeeds = async () => {
            setIsLoading(true);
            const data = await fetchFeedList({ page: page, perPage: 6, scope: "ALL_EXCEPT_ME", order: "LATEST" });
            if (data.length === 0) {
                setIsLastPage(true);
            }
            setFeedList(prev => [...prev, ...data]);
            setIsLoading(false);
        };
        loadFeeds();
        // console.log("page: ", page);
    }, [page]);

    // 
    const handleObserver = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting && !isLoading) {
            setPage(prev => prev + 1);
        }
    }, [isLoading]);

    const handleAdFeedVisible = useCallback((feedId) => {
        logAdFeedView(feedId);
    }, []);

    // 무한 스크롤
    useEffect(() => {

        const observer = new IntersectionObserver(handleObserver, {
            threshold: 0.1
        });

        if (observerTarget.current) observer.observe(observerTarget.current);
        return () => observer.disconnect();
    }, [handleObserver]);

    // 댓글창 열거나 닫기
    const handleCommentClick = (feed) => {
        if (selectedFeed == null) { // 열린 피드가 없으면 열기
            setSelectedFeed(feed);
        } else if (selectedFeed.feedId == feed.feedId) {  // 같은 피드면 접기
            setSelectedFeed(null);
        } else { // 현재 열린 피드와 클릭한 피드가 다르면 열기
            setSelectedFeed(feed);
        }
    };

    // 댓글창 닫기
    const handleClosePanel = () => {
        setSelectedFeed(null);
    };

    // 댓글 개수 증가
    const handleFeedCommentCntUp = (feedId) => {
        feedList.map(feed => {
            if (feed.feedId == feedId) {
                feed.commentCount += 1;
            }
        })
    }

    // 댓글 개수 감소
    const handleFeedCommentCntDown = (feedId) => {
        feedList.map(feed => {
            if (feed.feedId == feedId) {
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

    return (
        <div className={`${style.container} ${selectedFeed ? style.openCommentPanel : ''}`}>
            {/* 피드 목록 (스크롤) */}
            <div className={style.feedList}>
                {feedList.map((feed, index) => {
                    const isNearLast = (index === feedList.length - 4);
                    if (isNearLast) {
                        return (
                            < div ref={observerTarget} style={{ height: '10px', }} key={"xxxxxxxxxx"} />
                        )
                    }
                    return (
                        <FeedCard
                            feed={feed}
                            key={feed.feedId}
                            onCommentClick={() => handleCommentClick(feed)}
                            onAdVisible={handleAdFeedVisible}
                        />
                    )
                }
                )}

                {isLoading && (
                    <div style={{ textAlign: 'center', margin: '1rem 0' }}>
                        <span>로딩 중...</span>
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