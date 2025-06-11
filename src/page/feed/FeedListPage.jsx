// css
import feedListStyle from './FeedListPage.module.css';
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
        fetchFeedList({ page: 1, perPage: 10, scope: "ALL_EXCEPT_ME", order: "LATEST" })
            .then(data => {
                // console.log('피드 목록:', data);
                setFeedList(data);
            });
    }, []);

    const handleCommentClick = (feed) => {
        console.log("클릭 피드: ", feed);
        if (selectedFeed == null) {
            setSelectedFeed(feed);
        } else {
            setSelectedFeed(null);
        }
    };

    const handleClosePanel = () => {
        setSelectedFeed(null);
    };

    return (
        <div className={feedListStyle.container}>
            <div className={feedListStyle.feedList}>
                {feedList.map(feed =>
                    <FeedCard
                        feed={feed}
                        key={feed.feedId}
                        onCommentClick={() => handleCommentClick(feed)}
                    />
                )}
            </div>
            <CommentPanel feed={selectedFeed} onClose={handleClosePanel} />
        </div>
    )
}

export default FeedListPage;