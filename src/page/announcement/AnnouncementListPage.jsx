import { SearchBar } from "../../components/search_bar/SearchBar";
import { SecondaryButton } from "../../components/base/Button";
import { TableView } from "../../components/announcement/AnnouncementTable";
import styles from "./AnnouncementListPage.module.css"

const AnnouncementListPage = () => {
    
    return (
        <div className={styles.container}>
            <h1>공지 사항</h1>
            <div className={styles.topBar}>
                <div style={{ width: '300px' }}>
                    <SearchBar placeholder="검색하기"/>
                </div>
                <SecondaryButton width="160px" content="새 공지사항 등록" />
            </div>
            <TableView
                url="/announcements"
                headers={["번호", "제목" , "작성자", "작성날짜"]}
                keys={["title", "email", "createdAt"]}
            />
        </div>
    )
}

export default AnnouncementListPage;