import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./RunnerProfilePage.module.css";
import { ProfileImage } from "../../components/profile/ProfileImage";
import { fetchMemberProfile } from "../../api/member.api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { fetchFeedList } from "../../api/feed.api";
import FeedDetailModal from "../../components/feed/FeedDetailModal";
import FeedCard from "../../components/feed/FeedCard";
import { logAdFeedView } from "../../api/feedViewLog.api";
import { faClose } from '@fortawesome/free-solid-svg-icons';

const RunnerProfilePage = () => {
    const navigate = useNavigate();
    const { memberId } = useParams();
    const [member, setMember] = useState(null);
    

    const handleAdFeedVisible = useCallback((feedId) => {
        // console.log(`홍보 피드 노출 감지: ${feedId}`);
        logAdFeedView(feedId);
    }, []);

  useEffect(() => {
    // console.log("RunnerProfilePage useEffect", memberId);
    fetchMemberProfile(memberId)
      .then(data => {
        setMember(data);
      });
  }, [])

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

  useEffect(() => {
    const loadFeeds = async () => {
      setIsLoading(true);
      const data = await fetchFeedList({ page: page, perPage: 9, scope: "MEMBER", order: "LATEST", memberId: memberId });
      // console.log("data: ", data);
      setFeedList(prev => [...data, ...prev]);  // 누적!
      setIsLoading(false);
    };
    loadFeeds();
  }, [page]);

  const [selectedFeed, setSelectedFeed] = useState();

  const [modalStatus, setModalStatus] = useState();

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
                                controls
                                muted
                                playsInline
                                loop
                                style={{ width: "100%", borderRadius: "10px" }}
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
                        onAdVisible={handleAdFeedVisible}
                      />
                      <FontAwesomeIcon icon={faClose} className={styles.modalCloseIcon} onClick={() => setSelectedFeed(null)} />
                    </div>
                  </div>
                )}
                </div>
            </div>
        </div>
    )
}

export default RunnerProfilePage;