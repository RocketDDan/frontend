import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import styles from "./AnnouncementDetailPage.module.css";
import { Button } from "../../components/base/Button";
import apiClient from "../../api/apiClient";
import { useAuthStore } from "../../store/authStore";

const AnnouncementDetailPage = () => {
	const { announcementId } = useParams();
	const navigate = useNavigate();
	const [detail, setDetail] = useState(null);
	const user = useAuthStore((state) => state.user);
	useEffect(() => {
		const fetchDetail = async () => {
			try {
				const res = await apiClient.get(
					`/announcements/${announcementId}`
				);
				setDetail(res.data);
				// console.log(res.data);
			} catch (err) {
				console.error("공지 불러오기 실패:", err);
			}
		};

		fetchDetail();
	}, [announcementId]);

	const handleDelete = async () => {
		if (!window.confirm("정말 삭제하시겠습니까?")) return;

		try {
			await apiClient.delete(
				`/announcements/${announcementId}`
			);
			alert("삭제가 완료되었습니다.");
			navigate("/announcement/list");
		} catch (err) {
			console.error("삭제 실패:", err);
			alert("삭제에 실패했습니다.");
		}
	};
	
	if (!detail) return <div>로딩 중...</div>;
	const imageFiles =
  		detail.attachPaths?.filter((_, idx) => detail.attachIsImageList?.[idx]) || [];

	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>{detail.title}</h1>

			<div className={styles.meta}>
				<p>
					<strong>작성자:</strong> {detail.nickname}
				</p>
				<p>
					<strong>작성일:</strong> {detail.createdAt}
				</p>
			</div>

			{/* 이미지 미리보기 */}
			{imageFiles.length > 0 && (
				<div className={styles.imagePreviewSection}>
				<label className={styles.label}>이미지 미리보기</label>
				<div className={styles.imageList}>
					{imageFiles.map((img, idx) => (
					<img
						key={idx}
						src={img}
						alt={`preview-${idx}`}
						className={styles.previewImage}
					/>
					))}
				</div>
				</div>
			)}

			<div className={styles.section}>
				<label className={styles.label}>본문</label>
				<div className={styles.quillWrapper}>
					<ReactQuill value={detail.content} readOnly={true} theme="bubble" />
				</div>
			</div>

			<div className={styles.section}>
				{detail.attachPaths?.length > 0 && (
					<div className={styles.attachSection}>
						<label className={styles.label}>첨부파일</label>
						<ul className={styles.fileList}>
							{detail.attachPaths.map((path, idx) => {
								const fileName = decodeURIComponent(
									path.split("/").pop().split("?")[0]
								);
								return (
									<li key={idx} className={styles.fileItem}>
										<span className={styles.fileIcon}>📎</span>
										<a
											href={path}
											download
											target="_blank"
											rel="noopener noreferrer"
											className={styles.downloadLink}
										>
											{fileName}
										</a>
									</li>
								);
							})}
						</ul>
					</div>
				)}
			</div>

			<div className={styles.buttonGroup}>
				<Button
					content="목록으로"
					width="120px"
					onClick={() => navigate("/announcement/list")}
					bg="primaryBg"
				/>

				{(user?.role === "ADMIN" || user?.memberId === detail.createdBy) && (
					<>
						<Button
							content="수정"
							width="120px"
							onClick={() =>
								navigate(`/announcement/${announcementId}/update`)
							}
							bg="primaryBg"
						/>
						<Button
							content="삭제"
							width="120px"
							onClick={handleDelete}
							bg="primaryBg"
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default AnnouncementDetailPage;
