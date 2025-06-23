import { useState } from "react";
import styles from "./AnnouncementFileUploader.module.css";
import Swal from "sweetalert2";

const AnnouncementFileUploader = ({
  maxFiles = 3,
  accept = [".pdf", ".png", ".jpg", ".jpeg"],
  onFilesChange,
  initialFiles = [],
  onRemoveInitialFile,
}) => {
  const [newFiles, setNewFiles] = useState([]);

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);

    const hasKorean = selected.some((file) => /[\u3131-\uD79D]/ugi.test(file.name));
    if (hasKorean) {
      // alert("파일 이름에 한글이 포함되어 있습니다. 영문 파일명으로 변경해주세요.");
      Swal.fire({
        icon: 'warning',
        title: '파일명 오류',
        text: '파일 이름에 한글이 포함되어 있습니다. 영문 파일명으로 변경해주세요.',
        confirmButtonText: '확인'
      });
      return;
    }

    const total = initialFiles.length + newFiles.length + selected.length;
    if (total > maxFiles) {
      // alert(`파일은 최대 ${maxFiles}개까지 첨부할 수 있습니다.`);
      Swal.fire({
        icon: 'warning',
        title: '파일 개수 오류',
        text: `파일은 최대 ${maxFiles}개까지 첨부할 수 있습니다.`,
        confirmButtonText: '확인'
      });
      return;
    }

    const combined = [...newFiles, ...selected];
    const unique = combined.filter(
      (file, idx, arr) =>
        idx === arr.findIndex((f) => f.name === file.name && f.size === file.size)
    );

    setNewFiles(unique);
    onFilesChange?.(unique);
  };

  const handleRemoveNewFile = (index) => {
    const updated = [...newFiles];
    updated.splice(index, 1);
    setNewFiles(updated);
    onFilesChange?.(updated);
  };

  const handleRemoveExistingFile = (url) => {
    onRemoveInitialFile?.({ url });
  };

  return (
    <div className={styles.wrapper}>
      <label htmlFor="fileInput" className={styles.fakeInput}>
        <span className={styles.labelText}>내 PC</span>
      </label>
      <input
        id="fileInput"
        type="file"
        onChange={handleFileChange}
        multiple
        accept={accept.join(",")}
        className={styles.hiddenInput}
      />

      <ul className={styles.fileList} style={{ textAlign: "left" }}>
        {initialFiles.map((fileObj, idx) => {
          const url = typeof fileObj === "string" ? fileObj : fileObj.url;
          const name = typeof fileObj === "string"
            ? decodeURIComponent(fileObj.split("/").pop().split("?")[0])
            : fileObj.name;

          return (
            <li key={`existing-${idx}`} className={styles.fileItem} style={{ textAlign: "left" }}>
              <span className={styles.fileIcon}>📎</span>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.fileLink}
                style={{ textAlign: "left", display: "inline-block" }}
              >
                {name}
              </a>
              <button
                type="button"
                onClick={() => handleRemoveExistingFile(url)}
                className={styles.removeBtn}
              >
                ×
              </button>
            </li>
          );
        })}

        {newFiles.map((file, idx) => (
          <li key={`new-${idx}`} className={styles.fileItem} style={{ textAlign: "left" }}>
            <span className={styles.fileIcon}>📎</span>
            <a
              href={URL.createObjectURL(file)}
              download={file.name}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.fileLink}
              style={{ textAlign: "left", display: "inline-block" }}
            >
              {file.name}
            </a>
            <button
              type="button"
              onClick={() => handleRemoveNewFile(idx)}
              className={styles.removeBtn}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnnouncementFileUploader;
