// style
import styles from "./RewardDetailPage.module.css";
// react
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
// component
import { Button } from "../../components/base/Button";
// api
import apiClient from "../../api/_base/apiClient";
// external
import { Line, Bar } from "react-chartjs-2";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
dayjs.extend(isSameOrBefore);
// Chart.js 컴포넌트 등록
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	Title,
	Tooltip,
	Legend
);


const RewardDetailPage = () => {
	const { feedId } = useParams();
	const navigate = useNavigate();
	const location = useLocation();
	const chartRef = useRef();
	// 충전금액 꺼내오기
	const chargeAmount = location.state?.chargeAmount || 0;
	const balance = location.state?.balance || 0;

	const [summary, setSummary] = useState(null);
	const [dailyData, setDailyData] = useState([]);
	const [hourlyData, setHourlyData] = useState([]);
	// 초기 화면에는 기본적으로 최근 30일 가져오기
	const [startDate, setStartDate] = useState(dayjs().subtract(30, "day").format("YYYY-MM-DD"));
	const [endDate, setEndDate] = useState(dayjs().format("YYYY-MM-DD"));
	const [hourlyTargetDate, setHourlyTargetDate] = useState(dayjs().format("YYYY-MM-DD"));

	const fetchDailyData = async () => {
		try {
			const res = await apiClient.get(
				`/admin/feeds/${feedId}/views/daily`,
				{ params: { startDate, endDate } }
			);

			const allDates = [];
			let current = dayjs(startDate);
			const end = dayjs(endDate);
			// 시작일부터 종료일까지 날짜 세주기
			while (current.isSameOrBefore(end)) {
				allDates.push(current.format("YYYY-MM-DD"));
				current = current.add(1, "day");
			}
			// API 데이터 변환
			const dataMap = Object.fromEntries(res.data.map(d => [d.viewDate, d.views]));
			const filledData = allDates.map(date => ({ viewDate: date, views: dataMap[date] || 0 }));
			setDailyData(filledData);
		} catch (err) {
			console.error("일자별 클릭 수 조회 실패", err);
		}
	};

	const fetchHourlyData = async () => {
		try {
			const res = await apiClient.get(
				`/admin/feeds/${feedId}/views/hourly`,
				{ params: { targetDate: hourlyTargetDate } }
			);
			setHourlyData(res.data);
			// console.log(res.data);
		} catch (err) {
			console.error("시간대별 클릭 수 조회 실패", err);
		}
	};

	const handleClick = (event) => {
		const chart = chartRef.current;
		if (!chart) return;

		const points = chart.getElementsAtEventForMode(
			event,
			"nearest",
			{ intersect: true },
			true
		);

		if (points.length) {
			const pointIndex = points[0].index;
			const clickedDate = lineData.labels[pointIndex]; // 날짜
			const clickedValue = lineData.datasets[0].data[pointIndex]; // 값

			// console.log("Clicked Date:", clickedDate);
			// console.log("Clicked Value:", clickedValue);

			setHourlyTargetDate(clickedDate);
		}
	};

	useEffect(() => {
		const fetchAll = async () => {
			try {
				const summaryRes = await apiClient.get(
					`/admin/feeds/${feedId}/views/summary`,
					{ params: { startDate, endDate } }
				);
				setSummary(summaryRes.data);
				// console.log(summaryRes.data);

				await fetchDailyData();
				await fetchHourlyData();
			} catch (err) {
				console.error("통계 데이터 조회 실패", err);
			}
		};

		fetchAll();
	}, [feedId, startDate, endDate, hourlyTargetDate]);

	const lineData = {
		labels: dailyData.map(d => d.viewDate), // x축 표시
		datasets: [
			{
				label: "일자별 클릭 수",
				data: dailyData.map(d => d.views), // y축 표시
				borderColor: "rgba(75,192,192,1)",
				backgroundColor: "rgba(75,192,192,0.2)",
				tension: 0.3,
			},
		],
	};
	// display : false 하면! x,y 격자선 없애준다!
	const lineOptions = {
		scales: {
			x: {
				grid: { display: false },
			},
			y: {
				grid: { display: false },
				min: 0,
			},
		},
	};


	const allHours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
	const hourlyMap = Object.fromEntries(hourlyData.map(d => [d.viewHour.padStart(2, "0"), d.views]));
	const hourlyViews = allHours.map(hour => hourlyMap[hour] || 0);

	const barData = {
		labels: allHours.map(h => `${h}시`),
		datasets: [
			{
				label: "시간대별 클릭 수",
				data: hourlyViews,
				backgroundColor: "rgba(153, 102, 255, 0.5)",
			},
		],
	};

	const barOptions = {
		scales: {
			x: {
				grid: {
					display: false,
				},
			},
			y: {
				grid: {
					display: false,
				},
			},
		},
	};

	return (
		<div className={styles.container}>

			<div className={styles.header}>
				<div>
					<div style={{ textAlign: "start" }} className={styles.hideOnMobile}>
						<Button content="뒤로 가기" width="120px" onClick={() => navigate(-1)} bg="primaryBg" />
					</div>
				</div>

				<h2>피드 ID<br />#{feedId}</h2>

				<div className={styles.meta}>
					<div style={{ textAlign: "end" }}>
						<div>
							충전 금액
						</div>
						<div>
							{chargeAmount.toLocaleString()}원
						</div>
						<div>
							잔여 금액
						</div>
						<div>
							{balance.toLocaleString()}원
						</div>
					</div>
				</div>
			</div>

			<div className={styles.dateFilter}>
				<label>
					시작일
					<input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
				</label>
				<label>
					종료일
					<input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
				</label>
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
					<h3>일자별 클릭 수</h3>
					<Line data={lineData} options={{ ...lineOptions, onClick: handleClick }} ref={chartRef} />
				</div>
			</div>
			<div className={styles.graphSection}>

				<div className={styles.chartBox}>
					<h3>{hourlyTargetDate} 시간대별 클릭 분포</h3>
					<Bar data={barData} options={barOptions} />
				</div>
			</div>
		</div>
	);
};

export default RewardDetailPage;
