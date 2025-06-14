// css
import style from './FeedListPage.module.css';
// library
import { useState, useEffect } from "react";
// api
import { fetchFeedList } from "../../api/feed.api";
// dto
import SampleFeed from "../../dto/feed.dto";
// Component
import FeedCard from "../../components/feed/FeedCard";
import CommentPanel from '../../components/feed/CommentPanel';


const FeedListPage = () => {

    const [feedList, setFeedList] = useState([]);
    const [selectedFeed, setSelectedFeed] = useState(null);

    useEffect(() => {
        fetchFeedList({ page: 1, perPage: 20, scope: "ME", order: "LATEST" })
            .then(data => {
                // console.log('피드 목록:', data);
                setFeedList(data);
            });
    }, [feedList]);

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
            </div>
            {/* 댓글창 */}
            {
                selectedFeed 
                ?  <div className={style.commentPanel}>
                    <CommentPanel
                        feed={selectedFeed}
                        onClose={handleClosePanel}
                        writeComment={handleFeedCommentCntUp}
                        deleteComment={handleFeedCommentCntDown} />
                </div>
                : null
            }
        </div>
    )
}

export default FeedListPage;