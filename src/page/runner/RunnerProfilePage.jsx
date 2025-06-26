// style
import styles from "./RunnerProfilePage.module.css";
import { faClose, faCrown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// 
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
// api
import { fetchMemberProfile } from "../../api/member/member.api";
import { fetchFeedList } from "../../api/feed/feed.api";
import { logAdFeedView } from "../../api/feed/feedViewLog.api";
// component
import FeedCard from "../../components/feed/FeedCard";
import CommentPanel from "../../components/feed/CommentPanel";
import { ProfileImage } from "../../components/profile/ProfileImage";

const RunnerProfilePage = () => {
  const navigate = useNavigate();
  const { memberId } = useParams();
  const [member, setMember] = useState(null);
  const [feedList, setFeedList] = useState([]); // 피드 데이터
  const [page, setPage] = useState(1); // 페이지
  const [isLoading, setIsLoading] = useState(false); // 로딩중인지 여부
  const [selectedFeed, setSelectedFeed] = useState();
  const [modalStatus, setModalStatus] = useState();

  const loadFeeds = async () => {
    if (page === 1) setFeedList([]);
    setIsLoading(true);
    const data = await fetchFeedList({ page: page, perPage: 20, scope: "MEMBER", order: "LATEST", memberId: memberId });
    // console.log("data: ", data);
    setFeedList(prev => [...data, ...prev]);  // 누적!
    setIsLoading(false);
  };

  const loadMember = async () => {
    const data = await fetchMemberProfile(memberId);
    setMember(data);
  }

  const handleAdFeedVisible = useCallback((feedId) => {
    // console.log(`홍보 피드 노출 감지: ${feedId}`);
    logAdFeedView(feedId);
  }, []);

  const handleDeleteFeed = () => {
    // 1. feedList에서 해당 피드 제거
    setFeedList((prev) => prev.filter((f) => f.feedId !== selectedFeed.feedId));

    // 2. 모달 닫기
    setSelectedFeed(null);
    setModalStatus(false);

    // 3. 필요 시 page 초기화 (선택)
    setPage(1);
  }

  const observerTarget = useRef(null); // 
  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && !isLoading) {
      setPage(prev => prev + 1);
    }
  }, [isLoading]);

  useEffect(() => {
    loadMember();
    loadFeeds();
  }, [memberId, page])

  return (
    <div>
      {member === null && (
        <div className={styles.loading}>
          <span>로딩 중...</span>
        </div>
      )}
      {member && (
        <div className={styles.profileWrapper}>

          <ProfileImage profileUrl={member.profileImageUrl} size="200px" />

          <div className={styles.infoSection}>
            <span className={styles.nickname}>{member.nickname}</span>

            {(member.crewId || member.requestJoinCrewId) && (
              <div className={styles.crewGroup} onClick={() => navigate(`/crew/${member.crewId || member.requestJoinCrewId}`)}>
                <div className={styles.label}>소속 크루</div>
                <span className={styles.crewName}>
                  {member.leader && (
                    <FontAwesomeIcon icon={faCrown} className="crownColor" />
                  )}
                  &nbsp;
                  {member.crewName || (
                    <>
                      {member.requestJoinCrewName}
                      <span style={{ fontSize: "0.8rem", color: "#999", marginLeft: "4px" }}>승인 대기중</span>
                    </>
                  )}
                </span>
              </div>
            )}

          </div>

        </div>
      )}
      <div style={{ width: "100%", textAlign: "start" }}>
        <h3>피드 모아보기</h3>
        <hr />
        <div className={styles.feedListContainer}>
          {
            feedList.map(feed => {
              const fileUrl = feed.feedFileUrlList[0]?.fileUrl;
              const isVideo = fileUrl && /\.(mp4|mov|webm)(\?.*)?$/i.test(fileUrl); // 확장자 및 쿼리 대응

              return (
                <div
                  className={styles.imageBox}
                  onClick={() => setSelectedFeed(feed)}
                  key={feed.feedId}
                >
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
              );
            })
          }
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
                <FontAwesomeIcon icon={faClose} className={styles.modalCloseIcon} onClick={() => setSelectedFeed(null)} />
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
    </div>
  )
}

export default RunnerProfilePage;