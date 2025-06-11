import { TextAreaWithLabel, TextInput } from "../../components/base/Input";
import styles from "./AnnouncementUploadPage.module.css";
const AnnouncementUploadPage = () => {
    
    return (
        <div className={styles.container}>
            <h1>공지사항 업로드</h1>

            <div className={styles.formGroup}>
                <label>제목</label>
                <TextInput />
            </div>
        
            <div className={styles.formGroup}>
                <label>첨부 파일</label>
                <div className={styles.row}>
                    <div className={styles.fileInputWrapper}>
                    <input type="text" className={styles.textInput} />
                    </div>
                    <button className={styles.fileBtn}>내 PC</button>
                </div>
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