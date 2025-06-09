import { useParams } from "react-router-dom";

const FeedUpdatePage = () => {

    const { feedId } = useParams();

    return (
        <div>
            피드 수정 (id: {feedId})
        </div>
    )
}

export default FeedUpdatePage;