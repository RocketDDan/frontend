import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import CrewCard from "../../components/crew/CrewCard";
import styles from "./CrewListPage.module.css";
import RegionSelector from "../../components/base/RegionSelector";
import { BasicRadio } from "../../components/base/Radio";
import { fetchCrewList } from "../../api/crew.api";
import { SearchBar } from "../../components/search_bar/SearchBar";
import { SecondaryHoverButton } from "../../components/base/Button";

const CrewListPage = () => {
  const [crewList, setCrewList] = useState([]);
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [order, setOrder] = useState("LATEST");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef(null);
  const navigate = useNavigate();

  const perPage = 6;

  const orderOptions = [
    { value: "LATEST", name: "최신순" },
    { value: "OLDEST", name: "오래된순" },
    { value: "MEMBER_CNT", name: "크루원수" },
  ];

  // 검색/필터 변경 시 새로고침
  const handleSearchBar = () => {
    setPage(1);
    fetchCrewList({
      crewName: name,
      page: 1,
      perPage,
      region,
      order,
    }).then((data) => {
      setCrewList(data);
    });
  };

  // page 변경 시 데이터 누적
  useEffect(() => {
    setIsLoading(true);
    fetchCrewList({
      crewName: name,
      page,
      perPage,
      region,
      order,
    }).then((data) => {
      if (page === 1) {
        setCrewList(data);
      } else {
        setCrewList((prev) => [...prev, ...data]);
      }
      setIsLoading(false);
      setHasMore(data.length === perPage); // 더 받아올 데이터가 있는지 체크
    });
    // eslint-disable-next-line
  }, [page, region, order]);

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
      threshold: 0.5,
    });
    if (observerTarget.current) observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.searchHeader}>
        <RegionSelector region={region} setRegion={setRegion} />
        <SearchBar
          width={500}
          placeholder="크루명을 입력해주세요."
          value={name}
          onChange={setName}
          onEnter={handleSearchBar}
        />
        <BasicRadio
          options={orderOptions}
          name="order"
          value={order}
          onChange={setOrder}
        />
        <SecondaryHoverButton
          content="크루 생성"
          width="100px"
          onClick={() => navigate("/crew/create")}
        />
      </div>
      <div className={styles.container}>
        {crewList.length > 0 &&
          crewList.map((crew, index) => <CrewCard key={index} crew={crew} />)}
        {crewList.length === 0 && (
          <div className={styles.noRequest}> 크루가 없습니다. </div>
        )}
        {/* 관찰 타겟: 더 불러올 데이터가 있을 때만 렌더링 */}
        {hasMore && <div ref={observerTarget} style={{ height: "20px" }} />}
      </div>
    </div>
  );
};

export default CrewListPage;
