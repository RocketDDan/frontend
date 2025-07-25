import styles from "./AnnouncementUpdatePage.module.css";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import Swal from "sweetalert2";
// react
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// api
import apiClient from "../../api/_base/apiClient";
// component
import { Button } from "../../components/base/Button";
import AnnouncementFileUploader from "../../components/announcement/AnnouncementFileUploader";

const AnnouncementUpdatePage = () => {
  const { announcementId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [existingFiles, setExistingFiles] = useState([]);
  const [newFiles, setNewFiles] = useState([]);

  const urlToFile = async (url, filename) => {
    const response = await fetch(`${url}?not-from-cache-please`);
    const blob = await response.blob();
    const contentType = blob.type || "application/octet-stream";
    const cleanName = filename.split("/").pop().replace(/^release\/announcement\/\d+\//, "");
    return new File([blob], cleanName, { type: contentType });
  };



  useEffect(() => {
    const fetchDetail = async () => {
      const res = await apiClient.get(`/announcements/${announcementId}`);
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

    // 기존 파일을 File 객체로 변환
    const existingFilePromises = existingFiles.map((file) => {
      const fullName = decodeURIComponent(file.name);
      const cleanName = fullName.includes("/") ? fullName.split("/").pop() : fullName;
      return urlToFile(file.url, cleanName);
    });


    const convertedExistingFiles = await Promise.all(existingFilePromises);




    // 기존 파일 + 새 파일 합쳐서 전송
    [...convertedExistingFiles, ...newFiles].forEach((file) =>
      formData.append("files", file)
    );

    try {
      await apiClient.put(
        `/announcements/${announcementId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      // alert("수정 완료했습니다.");
      Swal.fire({
        icon: 'success',
        title: '수정 완료',
        text: '수정이 완료되었습니다.',
        confirmButtonText: '확인',
        timer: 1500,
        showConfirmButton: false
      });
      navigate(`/announcement/${announcementId}/detail`);
    } catch (err) {
      console.error("수정 실패", err);
      // alert("수정에 실패했습니다.");
      Swal.fire({
        icon: 'error',
        title: '수정 실패',
        text: '수정에 실패했습니다.',
        confirmButtonText: '확인'
      });
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
          onRemoveInitialFile={(file) => removeExistingFile(file.url)} />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>본문</label>
        <div className={styles.quillWrapper}>
          <ReactQuill value={content} onChange={setContent} style={{ height: '100%' }} />
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <Button content="수정 완료" width="120px" onClick={handleUpdate} bg="primaryBg" />
        <Button content="취소" width="120px" onClick={() => navigate(-1)} bg="primaryBg" />
      </div>
    </div>
  );
};

export default AnnouncementUpdatePage;