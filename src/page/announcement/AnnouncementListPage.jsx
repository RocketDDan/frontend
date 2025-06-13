import { SearchBar } from "../../components/search_bar/SearchBar";
import { SecondaryButton } from "../../components/base/Button";
import { TableView } from "../../components/base/AnnouncementTable";
import styles from "./AnnouncementListPage.module.css"
import { useState } from "react";

const AnnouncementListPage = () => {

    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState(1);
    // 엔터시마다 진행할 이벤트
    const handleEnter = (e) => {
        console.log("엔터");
    }
    // 값이 바뀔 때마다 진행할 이벤트
    const handleChange = (val) => {
        setKeyword(val);
        setPage(1);
    }

    return (
        <div className={styles.container}>
            <h1>공지 사항</h1>
            <div className={styles.topBar}>
                <div style={{ width: '300px' }}>
                    <SearchBar
                        placeholder="검색하기"
                        value={keyword}
                        onChange={handleChange}
                        onEnter={handleEnter} />
                </div>
                <SecondaryButton width="160px" content="새 공지사항 등록" />
            </div>
            <TableView
                url="/announcements"
                headers={["번호", "제목", "작성자", "작성날짜"]}
                keys={["title", "crewName", "createdAt"]}
                keyword={keyword}
                page={page}
                setPage={setPage}
            />
        </div>
    )
}

export default AnnouncementListPage;