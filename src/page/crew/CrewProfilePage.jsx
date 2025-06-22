import React, { useState, useEffect, useRef, useCallback } from "react";
import useCheckLogin from "../../util/RequiredLogin";
import { useNavigate } from "react-router-dom";
import styles from "./CrewProfilePage.module.css";
import { faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import { Button } from "../../components/base/Button";
import { ProfileImage } from "../../components/profile/ProfileImage";
import { deleteCrew, fetchCrew } from "../../api/crew.api";
import { resignCrewMember } from "../../api/crewMember.api";
import { deleteCrewJoinRequest, requestCrewJoin } from "../../api/crewJoinRequest.api";
import CrewMemberListModal from "../../components/crew/CrewMemberListModal";
import Swal from "sweetalert2";
import { fetchFeedList } from "../../api/feed.api";
import { useAuthStore } from "../../store/authStore";
import FeedCard from "../../components/feed/FeedCard";
import { logAdFeedView } from "../../api/feedViewLog.api"
import { faClose } from "@fortawesome/free-solid-svg-icons";
import CommentPanel from "../../components/feed/CommentPanel";

const CrewProfilePage = () => {
	const navigate = useNavigate();
	const checkLoginUser = useCheckLogin();
	const { crewId } = useParams(); // 여기서 crewId를 받아옴
	const [crew, setCrew] = useState(null);
	// 확인 모달
	const [modalTitle, setModalTitle] = useState("");
	const [modalDescription, setModalDescription] = useState("");
	const [handleModalConfirm, setHandleModalConfirm] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [useButton, setUseButton] = useState(true); // 버튼 사용 여부
	// 크루 가입 요청 모달
	const [requestModalOpen, setRequestModalOpen] = useState(false);
	const [requestMessage, setRequestMessage] = useState("");
	// 크루원 모달
	const [crewMemberModalOpen, setCrewMemberModalOpen] = useState(false);

	const user = useAuthStore((state) => state.user);


	const onClickCancelBtn = async () => {
		await deleteCrewJoinRequest(crewId);
		await Swal.fire({
			icon: 'success',
			title: '가입 요청 취소',
			text: '크루 가입 요청이 취소되었습니다.',
			confirmButtonText: '확인'
		});
		const data = await fetchCrew(crewId);
		setCrew(data);
	}

	const onClickRequestBtn = async () => {
		const isLogin = await checkLoginUser();
		if (!isLogin) return;
		setRequestModalOpen(true);
	};

	const handleDeleteConfirm = async () => {
		await deleteCrew(crewId);
		setModalOpen(false);
		navigate("/crew/list");
	}

	const handleResignConfirm = async () => {
		await resignCrewMember(crewId);
		setModalOpen(false);
		const data = await fetchCrew(crewId);
		setCrew(data);
	}

	const onClickResignBtn = () => {
		setModalTitle("크루 탈퇴");
		setModalDescription("정말로 크루를 탈퇴하시겠습니까?");
		setHandleModalConfirm(() => handleResignConfirm); // 함수 참조로 넘김!
		setModalOpen(true);
	}

	const onClickDeleteBtn = () => {
		setModalTitle("크루 삭제");
		setModalDescription("정말로 크루를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.");
		setHandleModalConfirm(() => handleDeleteConfirm);
		setModalOpen(true);
	};


	const handleRequestConfirm = async (message) => {
		try {
			await requestCrewJoin(crewId, message);
			setRequestMessage("");
			const data = await fetchCrew(crewId);
			setCrew(data);
		} finally {
			setRequestModalOpen(false);
		}
	};

	const onClickIntroduce = () => {
		setModalTitle("크루 소개");
		setModalDescription(crew?.introduce);
		setUseButton(false); // 버튼 사용 안함
		setModalOpen(true);
	}

	const renderActionButtons = () => {
		if (crew.leader) {
			return (
				<>
					<Button
						content="가입 요청 확인"
						width="100%"
						onClick={() => { navigate(`/crew/${crewId}/join-request/list`) }}
						bg="secondaryBg"
					/>
					<div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
						<Button
							content="크루 수정"
							width="100%"
							onClick={() => navigate(`/crew/${crewId}/update`)}
							bg="secondaryBg"
						/>
						<Button
							content="크루 삭제"
							width="100%"
							onClick={onClickDeleteBtn}
							bg="pinkBg" />
					</div>

				</>
			);
		} else if (crew.member) {
			return (
				<Button
					content="탈퇴"
					width="100px"
					onClick={onClickResignBtn}
					bg="pinkBg" />
			);
		} else if (crew.hasRequestedJoin) {
			return (
				<Button
					content="가입 요청 취소"
					width="150px"
					className={styles.actionBtn}
					onClick={onClickCancelBtn}
					bg="pinkBg"
				/>
			);
		}
		else {
			return (
				<Button
					content="가입 요청"
					width="100%"
					className={styles.actionBtn}
					onClick={onClickRequestBtn}
					bg="secondaryBg"
				/>
			);
		}
	};

	useEffect(() => {
		fetchCrew(crewId).then(data => {
			setCrew(data);
		});
	}, [crewId]);

	useEffect(() => {
		if (modalOpen) {
			// console.log(modalDescription.replace(/\n/g, "<br />"));
			Swal.fire({
				title: modalTitle,
				html: modalDescription.replace(/\n/g, "<br />"),
				showCancelButton: useButton,
				confirmButtonText: '확인',
				cancelButtonText: '취소',
				customClass: { popup: 'custom-swal-width' },
			}).then(result => {
				if (result.isConfirmed && handleModalConfirm) {
					handleModalConfirm();
				}
				setModalOpen(false);
				setUseButton(true);
			});
		}
	}, [modalOpen]);

	useEffect(() => {
		if (requestModalOpen) {
			Swal.fire({
				title: "크루 가입 요청",
				html: `
            <textarea id="swal-input" class="swal2-textarea"
              placeholder="가입 요청 메시지를 입력하세요.(최대 400자)"
              maxlength="400"
              style="width: 100%; max-width: 100%; min-width: 0; height: 200px; box-sizing: border-box; display: block; margin: 0 auto;"
            >${requestMessage}</textarea>
          `,
				showCancelButton: true,
				confirmButtonText: '요청',
				cancelButtonText: '취소',
				customClass: { popup: 'custom-swal-width' },
				willOpen: () => {
					const popup = document.querySelector('.swal2-popup');
					if (popup) popup.style.boxSizing = 'border-box';
				},
				preConfirm: () => {
					const input = document.getElementById('swal-input');
					if (input) {
						const message = input.value;
						setRequestMessage(message);
						return handleRequestConfirm(message);
					}
				}
			}).then(() => {
				setRequestModalOpen(false);
			});
		}
	}, [requestModalOpen]);

	// TODO: 피드 모아보기 개발중
	const [feedList, setFeedList] = useState([]); // 피드 데이터
	const [page, setPage] = useState(1); // 페이지
	const [isLoading, setIsLoading] = useState(false); // 로딩중인지 여부
	const observerTarget = useRef(null); // 
	const handleObserver = useCallback((entries) => {
		const target = entries[0];
		if (target.isIntersecting && !isLoading) {
			setPage(prev => prev + 1);
		}
	}, [isLoading]);

	const handleAdFeedVisible = useCallback((feedId) => {
		// console.log(`홍보 피드 노출 감지: ${feedId}`);
		logAdFeedView(feedId);
	}, []);

	useEffect(() => {
		const loadFeeds = async () => {
			setIsLoading(true);
			const data = await fetchFeedList({ page: page, perPage: 9, scope: "CREW", order: "LATEST", crewId: crewId });
			// console.log("data: ", data);
			setFeedList(prev => [...prev, ...data]);  // 누적!
			setIsLoading(false);
		};
		loadFeeds();
	}, [page]);

	const [selectedFeed, setSelectedFeed] = useState();
	const [modalStatus, setModalStatus] = useState();
	const handleDeleteFeed = () => {
		// 1. feedList에서 해당 피드 제거
		setFeedList((prev) => prev.filter((f) => f.feedId !== selectedFeed.feedId));
	
		// 2. 모달 닫기
		setSelectedFeed(null);
		setModalStatus(false);
	
		// 3. 필요 시 page 초기화 (선택)
		setPage(1);
	}
	return (
		<div className={styles.pageWrapper}>
			{!crew && (
				<div className={styles.loading}>
					크루 정보를 불러오는 중입니다...
				</div>
			)}
			{crew && (
				<div>
					<div className={styles.profileWrapper}>
						<div className={styles.profileDiv}>
							<ProfileImage profileUrl={crew?.profilePath} size="200px" type="square" />
						</div>

						<div className={styles.infoSection}>
							<span className={styles.crewName}>
								{crew?.crewName}
							</span>

							<div className={styles.flexContainer} onClick={() => setCrewMemberModalOpen(true)}>
								<div className={styles.label}>멤버</div>
								<div style={{ cursor: "pointer" }}>
									<FontAwesomeIcon icon={faPersonRunning} />
									<span>&nbsp;{crew?.totalMemberCnt}명</span>
								</div>
							</div>

							<div className={styles.flexContainer}>
								<div className={styles.label}>소개</div>
								<div className={styles.introduce} onClick={onClickIntroduce}>
									{crew?.introduce.length > 30 ? crew.introduce.substring(0, 30) + '...' : crew.introduce}
								</div>
							</div>

							<div className={styles.flexContainer}>
								<div className={styles.label}>주소</div>
								<div className={`${styles.region} textLightColor`}>
									<span>{crew?.crewRegion}</span>&nbsp;
									<span>{crew?.crewAddress}</span>
								</div>
							</div>
						</div>

						<div className={styles.buttonSection}>
							<div className={styles.buttonGroup}>{renderActionButtons()}</div>
						</div>
					</div>

					<div style={{ width: "100%", textAlign: "start" }}>
						<h3>크루원들의 피드 모아보기</h3>
						<hr />
						<div className={styles.feedListContainer}>
							{
								feedList.map(feed => {
									const fileUrl = feed.feedFileUrlList[0]?.fileUrl;
									const isVideo = fileUrl && /\.(mp4|mov|webm)(\?.*)?$/i.test(fileUrl);
									return (
										<div className={styles.imageBox} onClick={() => setSelectedFeed(feed)} key={feed.feedId}>
											{isVideo ? (
												<video
													src={fileUrl}
													muted
													playsInline
													preload="metadata"  // 썸네일용으로 첫 프레임만 로드
													style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }}
												/>
											) : (
												<img
													src={fileUrl}
													alt=""
													style={{ width: "100%", borderRadius: "10px" }}
												/>
											)}
										</div>
									)
								})
							}
						</div>
						{selectedFeed && (
							<div className={styles.modal} onClick={() => setSelectedFeed(null)}>
								<div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
									<FeedCard
										feed={selectedFeed}
										onCommentClick={() => {
											setModalStatus(true);
										}}
										onDeleteFeed={handleDeleteFeed}
										onAdVisible={handleAdFeedVisible}
									/>
									<FontAwesomeIcon
										icon={faClose}
										className={styles.modalCloseIcon}
										onClick={() => setSelectedFeed(null)} />
								</div>
							</div>
						)}
						{
							modalStatus
								? <div className={styles.commentModal}>
									<CommentPanel
										feed={selectedFeed}
										onClose={() => { setModalStatus(false); }}
									/>
								</div>
								: null
						}
					</div>
				</div>
			)}

			{/* <div className={styles.crewMemberFeeds}> */}
			{/* <span>크루원들의 피드 모아보기</span> */}
			{/* 크루원들 피드 목록 조회 컴포넌트 추가 */}
			{/* </div> */}

			{crewMemberModalOpen && (
				<CrewMemberListModal
					crewId={crewId}
					onClose={async () => {
						setCrewMemberModalOpen(false);
						const data = await fetchCrew(crewId);
						setCrew(data);
					}}
					isLeader={crew.leader}
				/>
			)}


		</div>
	);
};

export default CrewProfilePage;