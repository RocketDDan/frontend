// style
import styles from "./AnnouncementUploadPage.module.css";
import 'react-quill-new/dist/quill.snow.css';
import Swal from "sweetalert2";
// react
import { useState } from "react";
import ReactQuill from "react-quill-new";
import { useNavigate } from "react-router-dom";
// api
import apiClient from "../../api/_base/apiClient";
// componet
import AnnouncementFileUploader from "../../components/announcement/AnnouncementFileUploader";

const AnnouncementUploadPage = () => {
	const navigate = useNavigate();
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [attachedFiles, setAttachedFiles] = useState([]);

	// 제목, 본문 글자 수 제한 후 업로드 처리
	const handleSubmit = async () => {
		if (title.length > 100) {
			// alert("제목은 100글자 이하로 입력해주세요.");
			Swal.fire({
				icon: 'warning',
				title: '입력 제한',
				text: '제목은 100글자 이하로 입력해주세요.',
				confirmButtonText: '확인'
			});
			return;
		}
		if (content.length > 2000) {
			// alert("본문은 2000자 이하로 입력해주세요.");
			Swal.fire({
				icon: 'warning',
				title: '입력 제한',
				text: '본문은 2000자 이하로 입력해주세요.',
				confirmButtonText: '확인'
			});
			return;
		}

		const formData = new FormData();
		formData.append("title", title);
		formData.append("content", content);
		attachedFiles.forEach((file) => {
			formData.append("files", file);
		});

		try {
			await apiClient.post("/announcements", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			// alert("공지사항이 성공적으로 등록되었습니다.");
			Swal.fire({
				icon: 'success',
				title: '등록 완료',
				text: '공지사항이 성공적으로 등록되었습니다.',
				timer: 1500,
				showConfirmButton: false
			});
			navigate("/announcement/list");
		} catch (error) {
			console.error("공지 등록 실패:", error);
			// alert("공지 등록에 실패했습니다.");
			Swal.fire({
				icon: 'error',
				title: '등록 실패',
				text: '공지 등록에 실패했습니다.',
				confirmButtonText: '확인'
			});

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
							// alert("파일은 최대 3개까지 첨부할 수 있습니다.");
							Swal.fire({
								icon: 'warning',
								title: '첨부 파일 제한',
								text: '파일은 최대 3개까지 첨부할 수 있습니다.',
								confirmButtonText: '확인'
							});
							return;
						}
						setAttachedFiles(files);
					}}
				/>
			</div>

			<div className={styles.formGroup}>
				<label>본문</label>
				<div className={styles.quillWrapper}>
					<ReactQuill value={content} onChange={setContent} style={{ height: "100%" }} />
				</div>
			</div>

			<button className={styles.submitBtn} onClick={handleSubmit}>
				업로드
			</button>
		</div>
	);
};

export default AnnouncementUploadPage;
