import { useState } from "react";
import styles from  "./MemberListPage.module.css";
import { SearchBar } from "../../components/search_bar/SearchBar";
import { SecondaryButton } from "../../components/base/Button";
import { TableView } from "../../components/base/AnnouncementTable";

const RewardListPage = () => {
    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState(1);
    return (
        <div className={styles.container}>
            <h1>피드 광고 관리</h1>
            <div className={styles.topBar}>
                <div style={{ width: '300px' }}>
                    <SearchBar 
                        placeholder="이름 검색하기"
                        onChange={(val) => {
                            setKeyword(val);
                            setPage(1);
                        }}/>
                </div>
                
            </div>
            <TableView
                url="/admin/rewards"
                headers={["번호", "이름", "피드ID" , "잔액", "충전", "업로드 날짜"]}
                keys={["nickname", "feedId", "balance", "chargeAmount", "createdAt"]}
                responseKey="feeds"
                keyword={keyword}
                page={page}
                setPage={setPage}
            />
        </div>
    )
}

export default RewardListPage;