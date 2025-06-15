import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const AnnouncementUpdatePage = () => {
  const { announcementId } = useParams();
  const [detail, setDetail] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchDetail = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/announcements/${announcementId}`);
      setDetail(res.data);
      setTitle(res.data.title);
      setContent(res.data.content); 
    };

    fetchDetail();
  }, [announcementId]);

  if (!detail) return <div>로딩 중...</div>;

  return (
    <div>
      <h1>공지사항 수정</h1>
      <p>작성자: {detail.nickname}</p>
      <p>작성일: {detail.createdAt}</p>

      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

      <div style={{ marginTop: 20 }}>
        <ReactQuill value={content} onChange={setContent} style={{ height: "300px" }} />
      </div>
    </div>
  );
};

export default AnnouncementUpdatePage;
