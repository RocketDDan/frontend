import { useState } from "react";
import AnnouncementFileUploader from "../../components/announcement/AnnouncementFileUploader";
import { TextInput } from "../../components/base/Input";
import styles from "./AnnouncementUploadPage.module.css";
import 'react-quill-new/dist/quill.snow.css';
import ReactQuill from "react-quill-new";

const AnnouncementUploadPage = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [attachedFiles, setAttachedFiles] = useState([]);

    // 제목과 본문의 글자 수 제한 함수수
    const handleSubmit = async () => {
        if (title.length > 100) {
            alert("제목은 100글자 이하로 입력해주세요.");
            return;
        }
        if (content.length > 2000) {
            alert("본문은 2000자 이하로 입력해주세요.");
            return;
        }
    }
    
    return (
        <div className={styles.container}>
            <h1>공지사항 업로드</h1>

            <div className={styles.formGroup}>
                <label>제목</label>
                <TextInput value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
        
            <div className={styles.formGroup}>
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


            <button className={styles.submitBtn}>업로드</button>
            </div>

    )
}

export default AnnouncementUploadPage;