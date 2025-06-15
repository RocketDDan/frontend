import { useState, useRef } from "react";
import styles from "./AnnouncementFileUploader.module.css";

const AnnouncementFileUploader = ({maxFiles = 3, accept= [".pdf", ".png", ".jpg"], onFilesChange}) => {
    const [files, setFiles] = useState([]);
    const inputRef = useRef();

    const handleFileChange = (e) => {
        const selected = Array.from(e.target.files);
        inputRef.current.value = null;

        // 한글 포함된 파일이 있는지 검사
        const hasKorean = selected.some(file => /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(file.name));
        if (hasKorean) {
            alert("파일 이름에 한글이 포함되어 있습니다. 영문 파일명으로 변경해주세요.");
            return;
        }

        const combined = [...files, ...selected];
        if (combined.length > maxFiles) {
            alert(`파일은 최대 ${maxFiles}개까지 첨부할 수 있습니다.`);
            return;
        }

        const uniqueFiles = combined.filter(
            (file, index, self) =>
            index === self.findIndex(f => f.name === file.name && f.size === file.size)
        );

        setFiles(uniqueFiles);
        onFilesChange?.(uniqueFiles);
    };


    const handleRemove = (index) => {
        const updated = [...files];
        updated.splice(index, 1);
        setFiles(updated);
        onFilesChange?.(updated);
    };

   return (
        <div className={styles.wrapper}>
            <label htmlFor="fileInput" className={styles.fakeInput}>
            <span className={styles.labelText}>내 PC</span>
            </label>

            <input
            id="fileInput"
            type="file"
            ref={inputRef}
            onChange={handleFileChange}
            multiple
            accept={accept.join(",")}
            className={styles.hiddenInput}
            />

            <ul className={styles.fileList}>
            {files.length > 0 ? (
                files.map((file, idx) => (
                <li key={idx} className={styles.fileItem}>
                    <a
                    href={URL.createObjectURL(file)}
                    download={file.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.fileLink}
                    >
                    {file.name}
                    </a>
                    <button
                    type="button"
                    onClick={() => handleRemove(idx)}
                    className={styles.removeBtn}
                    >
                    ×
                    </button>
                </li>
                ))
            ) : (
                <li className={styles.fileItem}>선택된 파일 없음</li>
            )}
            </ul>


        </div>
    );
};

export default AnnouncementFileUploader;