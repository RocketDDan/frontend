// library
import { useState, useEffect } from "react";
// api
import { fetchFeedList } from "../../api/feed.api";
// dto
import sampleFeed from "../../dto/feed.dto";
// Component
import FeedCard from "../../components/feed/FeedCard";


const FeedListPage = () => {

    const [feedList, setFeedList] = useState([]);

    useEffect(() => {
        fetchFeedList({ page: 1, perPage: 10, scope: "ME", order: "LATEST" })
            .then(data => {
                console.log('피드 목록:', data);
                setFeedList(data);
            })
            .catch(err => {
                console.error('에러 발생:', err);
                setFeedList([sampleFeed]);
            });
    }, []);

    return (
        <div>
            <h1>피드 목록</h1>
            {feedList.map(feed => <FeedCard {...feed}/>)}
            {/* <Base>라면,피자, 햄버거</Base> */}
            {/* <CommentList/> */}
        </div>
    )
}

export default FeedListPage;