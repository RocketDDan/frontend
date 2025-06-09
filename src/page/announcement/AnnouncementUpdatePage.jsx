import { useParams } from "react-router-dom";

const AnnouncementUpdatePage = () => {

    const { announcementId } = useParams();

    return (
        <div>
            <h1>공지 수정 (id: {announcementId})</h1>
        </div>
    )
}

export default AnnouncementUpdatePage;