import { useState } from "react";
import AnnouncementFileUploader from "../../components/announcement/AnnouncementFileUploader";
import { TextInput } from "../../components/base/Input";
import styles from "./AnnouncementUploadPage.module.css";
const AnnouncementUploadPage = () => {

    const [attachedFiles, setAttachedFiles] = useState([]);
    
    return (
        <div className={styles.container}>
            <h1>공지사항 업로드</h1>

            <div className={styles.formGroup}>
                <label>제목</label>
                <TextInput />
            </div>
        
            <div className={styles.formGroup}>
                <AnnouncementFileUploader onFilesChange={(files) => setAttachedFiles(files)}/>
                </div>

                <div className={styles.formGroup}>
                <label>본문</label>
                <TextInput />
                </div>

            <button className={styles.submitBtn}>업로드</button>
            </div>

    )
}

export default AnnouncementUploadPage;