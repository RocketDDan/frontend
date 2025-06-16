import { useState, useEffect } from "react";
import styles from  "./MemberListPage.module.css";
import { SearchBar } from "../../components/search_bar/SearchBar";
import { TableView } from "../../components/base/AnnouncementTable";
import axios from "axios";

const MemberListPage = () => {
    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const limit = 6;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/admin/members`, {
                    params: {
                        page,
                        perPage: limit,
                        keyword,
                    },
                });
                setData(res.data.members);
                setTotalCount(res.data.totalCount);
            } catch (err) {
                console.error("회원 데이터 요청 실패", err);
            }
        };
        fetchData();
    }, [page, keyword]);

    return (
        <div className={styles.container}>
            <h1>회원 관리</h1>
            <div className={styles.topBar}>
                <div style={{ width: '300px' }}>
                    <SearchBar 
                        placeholder="이름 또는 크루 이름 검색하기"
                        onChange={(val) => {
                            setKeyword(val);
                            setPage(1);
                        }}/>
                </div>
            </div>
            <TableView
                headers={["번호", "이름", "이메일" , "크루이름", "역할"]}
                keys={["nickname", "email", "crewName", "crewRole"]}
                data={data}
                page={page}
                limit={limit}
                totalCount={totalCount}
                setPage={setPage}
            />
        </div>
    )
}

export default MemberListPage;
