import style from "./RewardListPage.module.css";

import apiClient from "../../api/apiClient";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { SearchBar } from "../../components/search_bar/SearchBar";
import { Table } from "../../components/base/Table";
import { BasicSelect } from "../../components/base/Select"

const RewardListPage = () => {
    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [totalCharge, setTotalCharge] = useState(0);
    // const [searchTrigger, setSearchTrigger] = useState(false);
    // const [totalCount, setTotalCount] = useState(0);
    const limit = 6;
    const navigate = useNavigate();


    useEffect(() => {

        const fetchData = async () => {
            try {
                const res = await apiClient.get(`/admin/rewards`, {
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
                // setTotalCount(res.data.totalCount);

                const total = updatedData.reduce((sum, item) => sum + (item.chargeAmount || 0), 0);
                setTotalCharge(total);

            } catch (err) {
                console.error("피드 광고 데이터 요청 실패", err);
            }
        };
        fetchData();
    }, [page, keyword, month, day]);

    return (
        <div className={style.container}>

            <h1>기업 피드 관리</h1>

            <div className={style.topBar}>
                <SearchBar
                    placeholder="이름 검색하기"
                    onChange={(val) => {
                        setKeyword(val);
                        setPage(1);
                    }}
                    width="12rem"
                />
                <BasicSelect
                    options={
                        [{ value: "", label: "전체" },
                        ...[...Array(12)].map((_, i) => {
                            return { value: String(i + 1).padStart(2, "0"), label: (i + 1) + "월" }
                        })]
                    }
                    onChange={setMonth}
                    value={month}
                    width="5rem"
                />
                <BasicSelect
                    options={
                        [{ value: "", label: "전체" },
                        ...[...Array(31)].map((_, i) => {
                            return { value: String(i + 1).padStart(2, "0"), label: (i + 1) + "일" }
                        })]
                    }
                    onChange={setDay}
                    value={day}
                    width="5rem"
                />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px", fontWeight: "bold", width: "100%", maxWidth: "1200px", marginLeft: "auto", marginRight: "auto", paddingRight: "8px" }}>
                <span>총 수익금 (충전 금액 기준) :&nbsp;</span>
                <span style={{ color: "red" }}>{totalCharge.toLocaleString()}원</span>
            </div>

            <Table
                headers={["번호", "이름", "피드ID", "잔액", "충전", "업로드 날짜"]}
                keys={["nickname", "feedId", "balance", "chargeAmount", "createdAt"]}
                data={data}
                page={page}
                height="fit-content"
                limit={limit}
                onRowClick={(row) =>
                    navigate(`/company/reward/${row.feedId}/detail`, {
                        state: { chargeAmount: row.chargeAmount },
                    })
                }
            />
        </div>
    )
}

export default RewardListPage;
