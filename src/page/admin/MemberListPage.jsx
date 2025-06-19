import { useState, useEffect } from "react";
import style from "./MemberListPage.module.css";
import { SearchBar } from "../../components/search_bar/SearchBar";
import { Table } from "../../components/base/Table";
import apiClient from "../../api/apiClient";
import { BasicSelect } from "../../components/base/Select";
import Pagination from "../../components/announcement/Pagination";


const MemberListPage = () => {
    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [roleFilter, setRoleFilter] = useState("");
    const limit = 6;

    const handleOptions = (val) => {
        setRoleFilter(val);
        setPage(1);
    }

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
        <div className={style.container}>
            <h1>회원 관리</h1>

            <div style={{ width: "100%", display: "flex", justifyContent: "space-between", gap: "1rem" }}>
                <SearchBar
                    placeholder="회원명, 크루 이름 입력"
                    width="35rem"
                    onChange={(val) => {
                        setKeyword(val);
                        setPage(1);
                    }}
                />
                <BasicSelect
                    width="15rem"
                    options={[
                        { value: "", label: "전체" },
                        { value: "COMPANY", label: "기업" },
                        { value: "USER", label: "유저" },
                    ]}
                    onChange={handleOptions} />
            </div>

            <div style={{ width: "6rem", display: "flex" }}>
                <span>회원수 :&nbsp;</span>
                <span style={{ color: "red" }}>{totalCount}명</span>
            </div>


            <div style={{ flex: 1 }} className="scrollX">
                <Table
                    headers={["번호", "이름", "이메일", "크루이름", "역할"]}
                    keys={["nickname", "email", "crewName", "crewRole"]}
                    data={data}
                    page={page}
                    width="600px"
                    height="fit-content"
                    limit={limit}
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
};

export default MemberListPage;
