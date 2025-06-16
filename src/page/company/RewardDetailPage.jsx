import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./RewardDetailPage.module.css"; // 스타일 따로 생성
import { Line, Bar } from "react-chartjs-2";

const RewardDetailPage = () => {
  const { feedId } = useParams();
  const navigate = useNavigate();

  // 예시 state
  const [summary, setSummary] = useState(null); // 총 클릭수, 방문자수
  const [dailyData, setDailyData] = useState([]);
  const [hourlyData, setHourlyData] = useState([]);
  const [feedInfo, setFeedInfo] = useState({
    uploadDate: "2025-06-10",
    balance: 30000,
  });

  useEffect(() => {
    // TODO: API 호출해서 summary, dailyData, hourlyData 불러오기
  }, [feedId]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={() => navigate(-1)} className={styles.backBtn}>목록</button>
        <h2>피드 ID #{feedId}</h2>
        <div className={styles.meta}>
          <span>업로드: {feedInfo.uploadDate}</span>
          <span>잔액: {feedInfo.balance.toLocaleString()}원</span>
        </div>
      </div>

      <div className={styles.summaryCards}>
        <div className={styles.card}>
          <p>총 클릭수</p>
          <h3>{summary?.totalViews?.toLocaleString()}회</h3>
        </div>
        <div className={styles.card}>
          <p>순 방문자 수</p>
          <h3>{summary?.uniqueVisitors?.toLocaleString()}명</h3>
        </div>
      </div>

      <div className={styles.graphSection}>
        <div className={styles.chartBox}>
          <h3>📈 일자별 클릭 수 (6/10 ~ 6/16)</h3>
          <Line data={{ /* dummy */ }} />
        </div>
        <div className={styles.chartBox}>
          <h3>📊 시간대별 클릭 분포</h3>
          <Bar data={{ /* dummy */ }} />
        </div>
      </div>
    </div>
  );
};

export default RewardDetailPage;
