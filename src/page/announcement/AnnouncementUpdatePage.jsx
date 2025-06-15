import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import styles from "./AnnouncementUpdatePage.module.css";
import { SecondaryButton } from "../../components/base/Button";
import AnnouncementFileUploader from "../../components/announcement/AnnouncementFileUploader";

const AnnouncementUpdatePage = () => {
  const { announcementId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [existingFiles, setExistingFiles] = useState([]);
  const [newFiles, setNewFiles] = useState([]);

  useEffect(() => {
    const fetchDetail = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/announcements/${announcementId}`);
      setTitle(res.data.title);
      setContent(res.data.content);
      setExistingFiles(
        (res.data.attachPaths || []).map((url) => ({
          name: decodeURIComponent(url.split("/").pop().split("?")[0]),
          url
        }))
      );
    };
    fetchDetail();
  }, [announcementId]);

  const removeExistingFile = (url) => {
    setExistingFiles((prev) => prev.filter((f) => f.url !== url));
  };

  const handleNewFilesChange = (files) => {
    setNewFiles(files);
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    newFiles.forEach((file) => formData.append("files", file));

    try {
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/announcements/${announcementId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("수정 완료!");
      navigate(`/announcement/${announcementId}/detail`);
    } catch (err) {
      console.error("수정 실패", err);
      alert("수정에 실패했습니다.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>공지사항 수정</h1>

      <div className={styles.section}>
        <label className={styles.label}>제목</label>
        <input
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
    </div>

    <div className={styles.section}>
        <label className={styles.label}>첨부파일</label>
            <AnnouncementFileUploader
            maxFiles={3}
            onFilesChange={handleNewFilesChange}
            initialFiles={existingFiles}
            onRemoveInitialFile={(file) => removeExistingFile(file.url)}/>
    </div>

    <div className={styles.formGroup}>
        <label className={styles.label}>본문</label>
            <div className={styles.quillWrapper}>
                <ReactQuill value={content} onChange={setContent} style={{ height: '100%' }} />
            </div>
    </div>

    <div className={styles.buttonGroup}>
        <SecondaryButton content="수정 완료" width="120px" onClick={handleUpdate} />
        <SecondaryButton content="취소" width="120px" onClick={() => navigate(-1)} />
      </div>
    </div>
  );
};

export default AnnouncementUpdatePage;