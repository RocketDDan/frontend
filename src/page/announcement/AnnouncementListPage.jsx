import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./AnnouncementListPage.module.css";
import { SearchBar } from "../../components/search_bar/SearchBar";
import { SecondaryButton } from "../../components/base/Button";
import { TableView } from "../../components/base/AnnouncementTable";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient"

const AnnouncementListPage = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`${process.env.REACT_APP_API_BASE_URL}/announcements`);
        // const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/announcements`, {
        //   params: { page, perPage: limit, keyword }
        // });
        const res = await apiClient.get("/announcements", {
          params: {
            page,
            perPage: limit,
            keyword
          }
        });

        //const res = await apiClient.get(`/announcements`);
        console.log("응답:", res.data);

        setData(res.data.announcements);
        setTotalCount(res.data.totalCount);
      } catch (err) {
        console.error("데이터 요청 실패", err);
      }
    };
    fetchData();
  }, [page, keyword]);

  const handleChange = (val) => {
    setKeyword(val);
    setPage(1);
  };

  return (
    <div className={styles.container}>
      <h1>공지 사항</h1>
      <div className={styles.topBar}>
        <div style={{ width: "300px" }}>
          <SearchBar
            placeholder="검색하기"
            value={keyword}
            onChange={handleChange}
            onEnter={() => console.log("엔터")}
          />
        </div>
        <SecondaryButton
          width="160px"
          content="새 공지사항 등록"
          onClick={() => navigate("/announcement/upload")}
        />
      </div>
      <TableView
        headers={["번호", "제목", "작성자", "작성날짜"]}
        keys={["title", "crewName", "createdAt"]}
        data={data}
        page={page}
        limit={limit}
        totalCount={totalCount}
        setPage={setPage}
        onRowClick={(row) => navigate(`/announcement/${row.announcementId}/detail`)}
      />
    </div>
  );
};

export default AnnouncementListPage;
