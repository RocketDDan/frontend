import styles from "./CrewJoinRequestListPage.module.css";
import { useParams } from "react-router-dom";

const CrewJoinRequestListPage = () => {
    const { crewId } = useParams(); // 여기서 crewId를 받아옴

    return (
        <div className={styles.pageWrapper}>
            <h1>크루 가입 신청 현황</h1>
            <p>크루 가입 요청 목록 페이지는 아직 구현되지 않았습니다.</p>
            <p>추후에 크루 가입 요청을 관리할 수 있는 기능이 추가될 예정입니다.</p>
        </div>
    );
}

export default CrewJoinRequestListPage;