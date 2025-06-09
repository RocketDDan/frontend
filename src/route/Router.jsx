import { Routes, Route } from "react-router-dom";

import LoginPage from "../page/member/LoginPage";
import CrewProfilePage from "../page/crew/CrewProfilePage";
import FeedListPage from "../page/feed/FeedListPage";
import HomePage from "../page/HomePage"

const Router = () => {
    return (
        <Routes>
            {/* 홈 */}
            <Route path="/" element={<HomePage/>} />
            {/* 멤버 */}
            <Route path="/login" element={<LoginPage/>} />
            {/* 피드 */}
            <Route path="/feed/list" element={<FeedListPage/>} />
            {/* 크루 */}
            <Route path="/crew/profile" element={<CrewProfilePage/>} />
        </Routes>
    )
}

export default Router;