import React, { useEffect, useState, useRef, useCallback } from "react";
import Swal from "sweetalert2";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import CrewCard from "../../components/crew/CrewCard";
import style from "./CrewListPage.module.css";
import RegionSelector from "../../components/base/RegionSelector";
import { fetchCrewList, fetchMyCrew } from "../../api/crew.api";
import { SearchBar } from "../../components/search_bar/SearchBar";
import LoadingSpinner from "../../components/base/LoadingSpinner";
import { BasicSelect } from "../../components/base/Select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import useCheckLogin from "../../util/RequiredLogin";
import HomePage from "../HomePage";

const CrewListPage = () => {
	const [hasCrew, setHasCrew] = useState(false);
	const [crewList, setCrewList] = useState([]);
	const [name, setName] = useState("");
	const [region, setRegion] = useState("");
	const [order, setOrder] = useState("LATEST");
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [isFetch, setIsFetch] = useState(true);

	const observerTarget = useRef(null);
	const navigate = useNavigate();
	const checkLoginUser = useCheckLogin();

	// user 정보
	const user = useAuthStore((state) => state.user);

	const perPage = 6;

	const orderOptions = [
		{ value: "LATEST", label: "최신순" },
		{ value: "OLDEST", label: "오래된순" },
		{ value: "MEMBER_CNT", label: "크루원수" },
	];

	const afterFetchCrewList = (data) => {
		if (!data || data.length === 0) {
			setIsFetch(false);
		}
		else {
			setIsFetch(true);
		}
	}

	const onClickCreateBtn = async () => {
		const isLogin = await checkLoginUser();
		if (isLogin) {
			if (hasCrew) {
				Swal.fire("크루원은 크루를 생성할 수 없습니다.");
			} else {
				navigate("/crew/create");
			}
		}
	}
	// 검색/필터 변경 시 새로고침 및 page 초기화
	useEffect(() => {
		setPage(1);
		setIsLoading(true);
		fetchCrewList({
			crewName: name,
			page: 1,
			perPage,
			region,
			order,
		}).then((data) => {
			setCrewList(data);
			setIsLoading(false);
			setHasMore(data.length === perPage);
			afterFetchCrewList(data);
		});
	}, [order, region]);

	// page 변경 시 데이터 누적 (page 1은 위에서 처리함)
	useEffect(() => {
		if (page === 1) return; // page 1은 위에서 처리함
		setIsLoading(true);
		fetchCrewList({
			crewName: name,
			page,
			perPage,
			region,
			order,
		}).then((data) => {
			setCrewList((prev) => [...prev, ...data]);
			setIsLoading(false);
			setHasMore(data.length === perPage);
			afterFetchCrewList(data);
		});
	}, [page]);

	// IntersectionObserver 콜백
	const handleObserver = useCallback(
		(entries) => {
			const target = entries[0];
			if (target.isIntersecting && !isLoading && hasMore) {
				setPage((prev) => prev + 1);
			}
		},
		[isLoading, hasMore]
	);

	// 옵저버 등록
	useEffect(() => {
		const observer = new window.IntersectionObserver(handleObserver, {
			threshold: 0.1,
		});
		if (observerTarget.current) observer.observe(observerTarget.current);
		return () => observer.disconnect();
	}, [handleObserver]);

	useEffect(() => {
	if (user) {
		fetchMyCrew().then((data) => {
		setHasCrew(data != null && data > 0 );
		console.log("hasCrew", hasCrew);
		});
	}
	}, [user, hasCrew]);

	const handleSearchBar = () => {
		setPage(1);
		fetchCrewList({
			crewName: name,
			page,
			perPage,
			region,
			order,
		}).then((data) => {
			setCrewList(data);
			afterFetchCrewList(data);
		});
	};

	return (
		<div className={style.pageWrapper}>
			<div className={style.searchHeader}>
				<div className={style.searchBar}>
					<SearchBar
						width="100%"
						placeholder="크루명을 입력해주세요."
						value={name}
						onChange={setName}
						onEnter={handleSearchBar}
					/>
				</div>

				<div className={style.selectGroup}>
					<RegionSelector
						region={region}
						setRegion={setRegion} />
					<BasicSelect
						options={orderOptions}
						value={order}
						onChange={setOrder}
						width="7rem"
					/>
				</div>
				<button className={style.uploadBtn} onClick={onClickCreateBtn}>
					<FontAwesomeIcon style={{ color: "white" }} icon={faPlus} size="2xl" />
				</button>
			</div>
			<HomePage region={region}/>
			<div className={style.container}>
				{crewList.length > 0 &&
					crewList.map((crew, index) => (
						<CrewCard key={crew.crewId} crew={crew} />
					))}
				{isFetch && crewList.length === 0 && <LoadingSpinner />}
				{!isFetch && crewList.length === 0 && <span className="noData">크루가 존재하지 않습니다.</span>}
				{/* 관찰 타겟: 더 불러올 데이터가 있을 때만 렌더링 */}
				{hasMore && <div ref={observerTarget} style={{ height: "1px" }} />}
			</div>
		</div>
	);
};

export default CrewListPage;
