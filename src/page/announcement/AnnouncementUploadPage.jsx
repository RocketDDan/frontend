import { useState } from "react";
import AnnouncementFileUploader from "../../components/announcement/AnnouncementFileUploader";
import { TextInput } from "../../components/base/Input";
import styles from "./AnnouncementUploadPage.module.css";
import 'react-quill-new/dist/quill.snow.css';
import ReactQuill from "react-quill-new";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AnnouncementUploadPage = () => {
    const navigate = useNavigate(); 
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [attachedFiles, setAttachedFiles] = useState([]);

        // 제목과 본문의 글자 수 제한 함수
        const handleSubmit = async () => {
        if (title.length > 100) {
            alert("제목은 100글자 이하로 입력해주세요.");
            return;
        }
        if (content.length > 2000) {
            alert("본문은 2000자 이하로 입력해주세요.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        attachedFiles.forEach((file) => {
            formData.append("files", file);
        });

        try {
            await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/announcements`,
            formData,
            {
                headers: {
                "Content-Type": "multipart/form-data",
                },
            }
            );
            alert("공지사항이 성공적으로 업로드되었습니다.");
            navigate("/announcement/list");

        } catch (error) {
            console.error("공지사항 업로드 실패:", error);
            alert("업로드에 실패했습니다.");
        }
    };
    
    return (
        <div className={styles.container}>
            <h1>공지사항 업로드</h1>

            <div className={`${styles.formGroup} ${styles.titleGroup}`}>
                <label>제목</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={styles.titleInput}
                />
            </div>

            <div className={styles.formGroup}>
                <label>첨부 파일</label>
                <AnnouncementFileUploader
                    onFilesChange={(files) => {
                        if (files.length > 3) {
                        alert("파일은 최대 3개까지 첨부할 수 있습니다.");
                        return;
                        }
                        setAttachedFiles(files);
                    }}
                    />
            </div>

            <div className={styles.formGroup}>
                <label>본문</label>
                <div className={styles.quillWrapper}>
                    <ReactQuill value={content} onChange={setContent} style={{ height: '100%' }} />
                </div>
            </div>
            <button className={styles.submitBtn} onClick={handleSubmit}>
                업로드
            </button>

            </div>

    )
}

export default AnnouncementUploadPage;