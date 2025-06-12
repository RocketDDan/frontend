import React, { useEffect, useState } from "react";
import CrewCard from "../../components/crew/CrewCard";
import sampleCrewList from "../../dto/crewList.dto";
import styles from './CrewListPage.module.css';
import RegionSelector from "../../components/base/RegionSelector";
import { BasicRadio } from "../../components/base/Radio";
import { CrewSearchBar } from "../../components/search_bar/CrewSearchBar";
import { fetchCrewList } from "../../api/crew.api";

const CrewListPage = () => {
    const [crewList, setCrewList] = useState(Array(15).fill(sampleCrewList));
    const [name, setName] = useState("");
    const [region, setRegion] = useState("");
    const [order, setOrder] = useState("LATEST");
    const [page, setPage] = useState(1);

    const perPage = 9;

    const orderOptions = [
        { value: "LATEST", name: "최신순" }, 
        { value: "OLDEST", name: "오래된순" }, 
        { value: "MEMBER_CNT", name: "크루원수" }
    ];

    const params = {
        crewName: name,
        page: page,
        perPage: perPage,
        region: region,
        order: order,
    };

    // 지역, 정렬, 이름 변경 시에는 자동 fetch
    useEffect(() => {
        fetchCrewList(params)
            .then((data) => {
                setCrewList(data);
            })
            .catch((error) => {
                throw error;
            });
    }, [region, order, name]);

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.searchHeader}>
                <RegionSelector
                    region={region}
                    setRegion={setRegion}
                />
                <CrewSearchBar
                    width={500} 
                    placeholder="크루명을 입력해주세요." 
                    defaultValue={name} 
                    onChange={setName}
                />
                <BasicRadio
                    options={orderOptions}
                    name="order"
                    defaultValue={"LATEST"}
                    onChange={setOrder}
                />
            </div>
            <div className={styles.container}>
                {crewList.map((crew, index) => (
                    <CrewCard key={index} crew={crew} />
                ))}
            </div>
        </div>
    )
}

export default CrewListPage;