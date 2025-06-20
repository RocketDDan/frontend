import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./RunnerProfilePage.module.css";
import { ProfileImage } from "../../components/profile/ProfileImage";
import { fetchMemberProfile } from "../../api/member.api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { fetchFeedList } from "../../api/feed.api";
import FeedDetailModal from "../../components/feed/FeedDetailModal";

const RunnerProfilePage = () => {
    const navigate = useNavigate();
    const { memberId } = useParams();
    const [member, setMember] = useState(null);

    useEffect(() => {
        console.log("RunnerProfilePage useEffect", memberId);
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
            const data = await fetchFeedList({ page: page, perPage: 9, scope: "MEMBER", order: "LATEST", memberId: memberId});
            console.log("data: ", data);
            setFeedList(prev => [...data, ...prev]);  // 누적!
            setIsLoading(false);
        };
        loadFeeds();
    }, [page]);

    const [selectedFeed, setSelectedFeed] = useState();

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
                        <div className={styles.crewGroup} onClick={() => navigate(`/crew/${member.crewId}`)}>
                            <div className={styles.label}>소속 크루</div>

                            <span className={styles.crewName}>
                                {member.leader && (
                                    <FontAwesomeIcon icon={faCrown} className="crownColor" />
                                )}
                                &nbsp;
                                {member.crewName}
                            </span>
                        </div>
                    </div>

                </div>
            )}
            <div style={{ width: "100%", textAlign: "start" }}>
                <h3>피드 모아보기</h3>
                <hr />
                <div className={styles.feedListContainer}>
                    {
                        feedList.map(feed => {
                            return (
                                <div className={styles.imageBox} onClick={() => setSelectedFeed(feed)}>
                                    <img
                                        key={feed.feedId}
                                        src={feed.feedFileUrlList[0]?.fileUrl}
                                        alt="" />
                                </div>
                            )
                        })
                    }
                </div>
                {selectedFeed && (
                    <FeedDetailModal
                        feed={selectedFeed}
                        onClose={() => setSelectedFeed(null)}
                    />
                )}
            </div>
        </div>
    )
}

export default RunnerProfilePage;