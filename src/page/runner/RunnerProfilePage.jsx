import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./RunnerProfilePage.module.css";
import { sampleMember } from "../../dto/member.dto";
import { CrewProfileImage } from "../../components/profile/ProfileImage";
import { SecondaryHoverButton } from "../../components/base/Button";

const RunnerProfilePage = () => {
    const navigate = useNavigate();
    const { memberId } = useParams();
    const [member, setMember] = useState(sampleMember);

    return(
        <div>
            <div className={styles.profileWrapper}>
                <CrewProfileImage profileUrl={member.profilePath}/>
                <div className={styles.infoSection}>
                    <span className={styles.nickname}>{member.nickname}</span>
                    <span className={styles.info}>{member.email}</span>
                    <span className={styles.info}>소속크루 : {member.crewName}</span>
                </div>
                <div className={styles.buttonSection}>
                    {!member.isFollowed && (
                        <SecondaryHoverButton
                            content="팔로우"
                            width="120px"
                            onClick={()=>console.log("팔로우")}
                        />
                    )
                    }
                    {member.isFollowed && (
                        <SecondaryHoverButton
                            content="팔로우 취소"
                            width="120px"
                            onClick={()=>console.log("팔로우 취소")}
                        />
                    )

                    }
                </div>
            </div>
            <div className={styles.memberFeeds}>
                <span>피드 모아보기</span>
                {/* 피드 목록 조회 컴포넌트 추가 */}
            </div>
        </div>
    )
}

export default RunnerProfilePage;