import { useState, useEffect } from "react";
import styles from  "./MemberListPage.module.css";
import { SearchBar } from "../../components/search_bar/SearchBar";
import { TableView } from "../../components/base/AnnouncementTable";
import axios from "axios";

const RewardListPage = () => {
    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const limit = 6;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/admin/rewards`, {
                    params: {
                        page,
                        perPage: limit,
                        keyword,
                    },
                });
                setData(
                    res.data.feeds.map(item => ({
                        ...item,
                        createdAt: item.createdAt.split(" ")[0] + " " + item.createdAt.split(" ")[1].split(".")[0],
                    }))
                );

                setTotalCount(res.data.totalCount);
            } catch (err) {
                console.error("피드 광고 데이터 요청 실패", err);
            }
        };
        fetchData();
    }, [page, keyword]);

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
                headers={["번호", "이름", "피드ID" , "잔액", "충전", "업로드 날짜"]}
                keys={["nickname", "feedId", "balance", "chargeAmount", "createdAt"]}
                data={data}
                page={page}
                limit={limit}
                totalCount={totalCount}
                setPage={setPage}
            />
        </div>
    )
}

export default RewardListPage;
