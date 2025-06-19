import { Routes, Route } from "react-router-dom";
// Component 확인 페이지
import ComponentPage from "../page/ComponentPage";

// 관리자 (admin)
import MemberListPage from "../page/admin/MemberListPage"
import RewardListPage from "../page/admin/RewardListPage";

// 공지 (announcement)
import AnnouncementListPage from "../page/announcement/AnnouncementListPage";
import AnnouncementUploadPage from "../page/announcement/AnnouncementUploadPage";
import AnnouncementUpdatePage from "../page/announcement/AnnouncementUpdatePage";
import AnnouncementDetailPage from "../page/announcement/AnnouncementDetailPage";

// 멤버 인증/인가 (auth)
import LoginCallback from "../page/auth/LoginCallback";
import LogoutCallback from "../page/auth/LogoutCallback";
import SignupPage from "../page/auth/SignupPage";
import LoginPage from "../page/auth/LoginPage";
import AccountSettingPage from "../page/auth/AccountSettingPage";

// 크루 (crew)
import CrewProfilePage from "../page/crew/CrewProfilePage";
import CrewListPage from "../page/crew/CrewListPage";
import CrewCreatePage from "../page/crew/CrewCreatePage";
import CrewUpdatePage from  "../page/crew/CrewUpdatePage";

// 피드 (feed)
import FeedListPage from "../page/feed/FeedListPage";
import FeedUploadPage from "../page/feed/FeedUploadPage";
import FeedUpdatePage from "../page/feed/FeedUpdatePage";

// 러너 (runner)
import RunnerProfilePage from "../page/runner/RunnerProfilePage";

// 홈 (home)
import HomePage from "../page/HomePage";
import NotFoundPage from "../page/NotFoundPage";
import CrewJoinRequestListPage from "../page/crew/CrewJoinRequestListPage";
import KakaoPaySuccessPage from "../page/pay/KakaoPaySuccessPage";

// 회사 (company)
import MyRewardListPage from "../page/company/MyRewardListPage";
import RewardDetailPage from "../page/company/RewardDetailPage";


const Router = () => {
    return (
        <Routes>
            {/* 컴포넌트 확인 */}
            <Route path="/component" element={<ComponentPage/>} />

            {/* 관리자 */}
            <Route path="/admin/member/list" element={<MemberListPage/>} />
            <Route path="/admin/reward/list" element={<RewardListPage/>} />

            {/* 회사 */}
            <Route path="/company/reward/list" element={<MyRewardListPage/>}/>
            <Route path="/company/reward/:feedId/detail" element={<RewardDetailPage />} />

            {/* 공지 */}
            <Route path="/announcement/list" element={<AnnouncementListPage/>} />
            <Route path="/announcement/upload" element={<AnnouncementUploadPage/>} />
            <Route path="/announcement/:announcementId/update" element={<AnnouncementUpdatePage/>} />
            <Route path="/announcement/:announcementId/detail" element={<AnnouncementDetailPage />} />

            {/* 멤버 인증/인가 */}
            <Route path="/auth/callback" element={<LoginCallback />} />
            <Route path="/logout/callback" element={<LogoutCallback />} />
            <Route path="/signup" element={<SignupPage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/account/setting" element={<AccountSettingPage/>} />

            {/* 크루 */}
            <Route path="/crew/:crewId" element={<CrewProfilePage />} />
            <Route path="/crew/list" element={<CrewListPage/>} />
            <Route path="/crew/:crewId/join-request/list" element={<CrewJoinRequestListPage/>} />
            <Route path="/crew/create" element={<CrewCreatePage />} />
            <Route path="/crew/:crewId/update" element={<CrewUpdatePage />} />

            {/* 피드 */}
            <Route path="/feed/list" element={<FeedListPage/>} />
            <Route path="/feed/upload" element={<FeedUploadPage/>} />
            <Route path="/feed/:feedId/update" element={<FeedUpdatePage/>} />

            {/* 러너 */}
            <Route path="/runner/:memberId" element={<RunnerProfilePage/>}/>

            {/* 홈 */}
            <Route path="/" element={<HomePage/>} />

            {/* 페이 */}
            <Route path="/pay/kakao/success" element={<KakaoPaySuccessPage/>} />

            {/* 나머지 경로 */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}

export default Router;
