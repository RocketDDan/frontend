import { useState, useEffect } from "react";
import style from "./AnnouncementListPage.module.css";
import { SearchBar } from "../../components/search_bar/SearchBar";
import { Button } from "../../components/base/Button";
import { Table } from "../../components/base/Table";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient"
<<<<<<< HEAD
import { useAuthStore } from "../../store/authStore";

const AnnouncementListPage = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 6;
  const user = useAuthStore((state) => state.user);
=======
import Pagination from "../../components/announcement/Pagination";

const AnnouncementListPage = () => {
	const navigate = useNavigate();
	const [keyword, setKeyword] = useState("");
	const [page, setPage] = useState(1);
	const [data, setData] = useState([]);
	const [totalCount, setTotalCount] = useState(0);
	const limit = 6;
>>>>>>> main

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

<<<<<<< HEAD
  return (
    <div className={styles.container}>
      <h1>공지 사항</h1>
      <div className={styles.topBar}>
      <div className={styles.searchWrapper}>
        <SearchBar
          placeholder="검색하기"
          value={keyword}
          onChange={handleChange}
          onEnter={() => console.log("엔터")}
        />
      </div>
      {user && (
        <SecondaryButton
          width="160px"
          content="새 공지사항 등록"
          onClick={() => navigate("/announcement/upload")}
        />
      )}

    </div>

      <TableView
        headers={["번호", "제목", "작성자", "작성날짜"]}
        keys={["title", "crewName", "createdAt"]}
        data={data}
        page={page}
        limit={limit}
        totalCount={totalCount}
        setPage={setPage}
        onRowClick={(row) => {
          if (!user) {
            alert("로그인 후 이용해주세요.");
            return;
          }
          navigate(`/announcement/${row.announcementId}/detail`);
        }}
      />
    </div>
  );
=======
	return (
		<div className={style.container}>

			<h1>공지 사항</h1>
			{/* 위 */}
			<div className={style.topBar}>
				<SearchBar
					placeholder="검색하기"
					value={keyword}
					onChange={handleChange}
					width="15rem"
					height="100%"
					onEnter={() => console.log("엔터")}
				/>
				<Button
					width="8rem"
					content="새 공지 등록"
					onClick={() => navigate("/announcement/upload")}
					bg = "primaryBg"
				/>
			</div>
			{/* 중간 */}
			<div style={{ flex: 1 }}>
				<Table
					headers={["번호", "제목", "작성자", "작성날짜"]}
					keys={["title", "crewName", "createdAt"]}
					data={data}
					page={page}
					limit={limit}
					height="fit-content"
					onRowClick={(row) => navigate(`/announcement/${row.announcementId}/detail`)}
				/>
			</div>
			{/* 아래 */}
			<Pagination
				page={page}
				limit={limit}
				total={totalCount}
				onPageChange={setPage}
			/>
		</div>
	);
>>>>>>> main
};

export default AnnouncementListPage;
