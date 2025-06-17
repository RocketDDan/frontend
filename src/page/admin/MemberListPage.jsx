import { useState, useEffect } from "react";
import styles from "./MemberListPage.module.css";
import { SearchBar } from "../../components/search_bar/SearchBar";
import { TableView } from "../../components/base/AnnouncementTable";
import apiClient from "../../api/apiClient";

const MemberListPage = () => {
    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [roleFilter, setRoleFilter] = useState("");
    const limit = 6;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await apiClient.get(`/admin/members`, {
                    params: {
                        page,
                        perPage: limit,
                        keyword,
                        role: roleFilter,
                    },
                });
                setData(res.data.members);
                console.log(res.data.members)
                setTotalCount(res.data.totalCount);
            } catch (err) {
                console.error("회원 데이터 요청 실패", err);
            }
        };
        fetchData();
    }, [page, keyword, roleFilter]);

    return (
        <div className={styles.container}>
            <h1>회원 관리</h1>
            
            <div className={styles.topBar}>
                <div style={{ width: "300px" }}>
                    <SearchBar 
                        placeholder="이름 또는 크루 이름 검색하기"
                        onChange={(val) => {
                            setKeyword(val);
                            setPage(1);
                        }}
                    />
                </div>

                <div className={styles.radioGroup}>
                    <label>
                        <input
                        type="radio"
                        name="role"
                        value=""
                        checked={roleFilter === ""}
                        onChange={() => { setRoleFilter(""); setPage(1); }}
                        /> 전체
                    </label>
                    <label>
                        <input
                        type="radio"
                        name="role"
                        value="COMPANY"
                        checked={roleFilter === "COMPANY"}
                        onChange={() => { setRoleFilter("COMPANY"); setPage(1); }}
                        /> 회사
                    </label>
                    <label>
                        <input
                        type="radio"
                        name="role"
                        value="USER"
                        checked={roleFilter === "USER"}
                        onChange={() => { setRoleFilter("USER"); setPage(1); }}
                        /> 사용자
                    </label>
                </div>
            </div>

            <TableView
                headers={["번호", "이름", "이메일", "크루이름", "역할"]}
                keys={["nickname", "email", "crewName", "crewRole"]}
                data={data}
                page={page}
                limit={limit}
                totalCount={totalCount}
                setPage={setPage}
            />
        
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px", fontWeight: "bold", width: "100%", maxWidth: "1200px", marginLeft: "auto", marginRight: "auto", paddingRight: "8px" }}>
                <span>총 회원수 :&nbsp;</span>
                <span style={{ color: "red" }}>{totalCount}명</span>
            </div>
        </div>
    );
};

export default MemberListPage;
