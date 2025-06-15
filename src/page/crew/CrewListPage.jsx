import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CrewCard from "../../components/crew/CrewCard";
import { sampleCrewList } from "../../dto/crew.dto";
import styles from "./CrewListPage.module.css";
import RegionSelector from "../../components/base/RegionSelector";
import { BasicRadio } from "../../components/base/Radio";
import { fetchCrewList } from "../../api/crew.api";
import { SearchBar } from "../../components/search_bar/SearchBar";

const CrewListPage = () => {
  const [crewList, setCrewList] = useState([]);
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [order, setOrder] = useState("LATEST");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const perPage = 9;

  const orderOptions = [
    { value: "LATEST", name: "최신순" },
    { value: "OLDEST", name: "오래된순" },
    { value: "MEMBER_CNT", name: "크루원수" },
  ];

  const handleSearchBar = () => {
    const params = {
      crewName: name,
      page: page,
      perPage: perPage,
      region: region,
      order: order,
    };
    fetchCrewList(params).then((data) => {
      setCrewList(data);
    });
  };

  // 지역, 정렬, 이름 변경 시에는 자동 fetch
  useEffect(() => {
    handleSearchBar();
  }, [region, order]);

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
          value={"LATEST"}
          onChange={setOrder}
        />
      </div>
      <div className={styles.container}>
        {crewList.length > 0 && crewList.map((crew, index) => (
          <CrewCard key={index} crew={crew}/>
        ))}
        {crewList.length === 0 && (
          <div className={styles.noRequest}> 크루가 없습니다. </div>
        )}
      </div>
    </div>
  );
};

export default CrewListPage;
