import { useState } from "react";
import styles from  "./MemberListPage.module.css";
import { SearchBar } from "../../components/search_bar/SearchBar";
import { SecondaryButton } from "../../components/base/Button";
import { TableView } from "../../components/base/AnnouncementTable";

const MemberListPage = () => {
    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState(1);
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
                <SecondaryButton width="160px" content="회원 등록" />
            </div>
            <TableView
                url="/admin/members"
                headers={["번호", "이름", "이메일" , "크루이름", "역할"]}
                keys={["nickname", "email", "crewName", "crewRole"]}
                responseKey="members"
                keyword={keyword}
                page={page}
                setPage={setPage}
            />
        </div>
    )
}

export default MemberListPage;