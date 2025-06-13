import React, { useEffect, useState } from "react";
import CrewCard from "../../components/crew/CrewCard";
import sampleCrewList from "../../dto/crewList.dto";
import styles from './CrewListPage.module.css';
import { CrewSearchBar } from "../../components/search_bar/CrewSearchBar";
import RegionSelector from "../../components/base/RegionSelector";
import { BasicRadio } from "../../components/base/Radio";
import { SearchBar } from "../../components/search_bar/SearchBar";

const CrewListPage = () => {
    const [crewList, setCrewList] = useState(Array(15).fill(sampleCrewList)); // 임시
    const [value, setValue] = useState("");
    const [region, setRegion] = useState(""); // 지역명(full_addr)
    const [sort, setSort] = useState("LATEST"); // 정렬 기준
    const sortOptions = [
        { value: "LATEST", name: "최신순" }, 
        { value: "OLDEST", name: "오래된순" }, 
        { value: "MEMBER_CNT", name: "크루원수" }];

    useEffect(() => {
        console.log("Selected region:", region);
    }, [region, sort]);

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.searchHeader}>
                <RegionSelector
                    region={region}
                    setRegion={setRegion}
                />
                {/* <CrewSearchBar 
                    width={500} 
                    placeholder="크루명을 입력해주세요." 
                    value={value} 
                    onChange={handleChange}
                    maxLength={30} // 최대 30자 제한
                /> */}
                <SearchBar
                    width={500} 
                    placeholder="크루명을 입력해주세요." 
                    defaultValue={value} 
                    onChange={setValue}
                />
                <BasicRadio
                    options={sortOptions}
                    name="sort"
                    defaultValue={'LATEST'}
                    onChange={setSort}
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