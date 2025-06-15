// css
import style from './FeedListPage.module.css';
// library
import { useState, useEffect, useCallback, useRef } from "react";
// api
import { fetchFeedList } from "../../api/feed.api";
// dto
import SampleFeed from "../../dto/feed.dto";
// Component
import FeedCard from "../../components/feed/FeedCard";
import CommentPanel from '../../components/feed/CommentPanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';


const FeedListPage = () => {

    const [feedList, setFeedList] = useState([]); // 피드 데이터
    const [selectedFeed, setSelectedFeed] = useState(null); // 선택된 피드 (댓글창 열 피드)
    const [page, setPage] = useState(1); // 페이지
    const [isLoading, setIsLoading] = useState(false); // 로딩중인지 여부
    const observerTarget = useRef(null); // 
    const navigate = useNavigate();

    useEffect(() => {
        const loadFeeds = async () => {
            setIsLoading(true);
            const data = await fetchFeedList({ page: page, perPage: 10, scope: "ME", order: "LATEST" });
            setFeedList(prev => [...prev, ...data]);  // 누적!
            setIsLoading(false);
        };

        loadFeeds();
    }, [page]);

    // 
    const handleObserver = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting && !isLoading) {
            setPage(prev => prev + 1);
        }
    }, [isLoading]);

    //
    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, {
            threshold: 0.5
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
    
    const handlePlusBtn = () => {
        navigate("/feed/upload");
    }

    return (
        <div className={`${style.container} ${selectedFeed ? style.openCommentPanel : ''}`}>
            {/* 피드 목록 (스크롤) */}
            <div className={style.feedList}>
                {feedList.map(feed =>
                    <FeedCard
                        feed={feed}
                        key={feed.feedId}
                        onCommentClick={() => handleCommentClick(feed)}
                    />
                )}
                {/* 관찰 타겟 */}
                <div ref={observerTarget} style={{ height: '20px' }} />
            </div>
            {/* 댓글창 */}
            {
                selectedFeed
                    ? <div className={style.commentPanel}>
                        <CommentPanel
                            feed={selectedFeed}
                            onClose={handleClosePanel}
                            writeComment={handleFeedCommentCntUp}
                            deleteComment={handleFeedCommentCntDown} />
                    </div>
                    : null
            }
            <button className={style.uploadBtn} onClick={handlePlusBtn}>
                <FontAwesomeIcon icon={faPlus} size="2xl" />
            </button>
        </div>
    )
}

export default FeedListPage;