import { useState, useEffect } from "react";
import styles from  "./MemberListPage.module.css";
import { SearchBar } from "../../components/search_bar/SearchBar";
import { TableView } from "../../components/base/AnnouncementTable";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RewardListPage = () => {
    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [totalCharge, setTotalCharge] = useState(0);
    const [searchTrigger, setSearchTrigger] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const limit = 6;
    const navigate = useNavigate();

    // const handleSearch = () => {
    //     setPage(1);
    //     setSearchTrigger(prev => !prev);
    // };

    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/admin/rewards`, {
                    params: {
                        page,
                        perPage: limit,
                        keyword,
                        month,
                        day,
                    },
                });
                const updatedData = res.data.feeds.map(item => ({
                    ...item,
                    createdAt: item.createdAt.split(" ")[0] + " " + item.createdAt.split(" ")[1].split(".")[0],
                }));
                setData(updatedData);
                setTotalCount(res.data.totalCount);

                const total = updatedData.reduce((sum, item) => sum + (item.chargeAmount || 0), 0);
                setTotalCharge(total);
                
            } catch (err) {
                console.error("피드 광고 데이터 요청 실패", err);
            }
        };
        fetchData();
    }, [page, keyword, month, day]);

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
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    <select onChange={(e) => setMonth(e.target.value)} value={month}>
                        <option value="">월 선택</option>
                        {[...Array(12)].map((_, i) => (
                            <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                                {i + 1}월
                            </option>
                        ))}
                    </select>

                    <select onChange={(e) => setDay(e.target.value)} value={day}>
                        <option value="">일 선택</option>
                        {[...Array(31)].map((_, i) => (
                            <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                                {i + 1}일
                            </option>
                        ))}
                    </select>

                    {/* <button 
                        onClick={handleSearch} 
                        style={{ padding: "0 12px", height: "28px", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                        검색
                    </button> */}
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
                onRowClick={(row) =>
                    navigate(`/company/reward/${row.feedId}/detail`, {
                    state: { chargeAmount: row.chargeAmount },
                    })
                }
            />
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px", fontWeight: "bold", width: "100%", maxWidth: "1200px", marginLeft: "auto", marginRight: "auto", paddingRight: "8px" }}>
                <span>총 수익금 (충전 금액 기준) :&nbsp;</span>
                <span style={{ color: "red" }}>{totalCharge.toLocaleString()}원</span>
            </div>

        </div>
    )
}
 
export default RewardListPage;
                      