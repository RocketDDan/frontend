import { useState, useEffect } from "react";
import styles from  "./MyRewardListPage.module.css";
import { SearchBar } from "../../components/search_bar/SearchBar";
import { TableView } from "../../components/base/AnnouncementTable";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyRewardListPage = () => {
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [totalCharge, setTotalCharge] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const limit = 6;
    const navigate = useNavigate();

    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/admin/my-wallet`, {
                    params: {
                        page,
                        perPage: limit,
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
    }, [page]);

    return (
    <div className={styles.container}>
      <h1>내 피드 광고 목록</h1>

      <TableView
        headers={["번호", "피드ID", "잔액", "충전", "업로드 날짜"]}
        keys={["feedId", "balance", "chargeAmount", "createdAt"]}
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

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "16px",
          fontWeight: "bold",
          width: "100%",
          maxWidth: "1200px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingRight: "8px",
        }}
      >
        <span>총 결제금액 (충전 금액 기준) :&nbsp;</span>
        <span style={{ color: "red" }}>{totalCharge.toLocaleString()}원</span>
      </div>
    </div>
  );
}

export default MyRewardListPage;
