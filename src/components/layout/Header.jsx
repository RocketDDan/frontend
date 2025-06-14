import headerStyle from "./Header.module.css";

import { ProfileImage } from '../profile/ProfileImage'

import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const Header = () => {
  const KAKAO_LOGOUT_REDIRECT_URL = `${process.env.REACT_APP_API_BASE_URL}/auth/logout`;
  const KAKAO_LOGOUT_URL = `https://kauth.kakao.com/oauth/logout?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&logout_redirect_uri=${KAKAO_LOGOUT_REDIRECT_URL}`;

  const location = useLocation();
  const currentPath = location.pathname;

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const user = useAuthStore((state) => state.user);

  const toggleProfileMenu = () => setProfileOpen((prev) => !prev);

  return (
    <header className={headerStyle.container}>
      <div className={headerStyle.up}>
        <h1>
          <Link to="/">Runners Hi</Link>
        </h1>

        <nav className={headerStyle.desktopNav}>
          {!user ? (
            <Link to="/login">로그인</Link>
          ) : (
            <div className={headerStyle.profileWrapper}>
              <div className={headerStyle.profileContainer} onClick={toggleProfileMenu}>
                <ProfileImage profileUrl={user.profileImageUrl} />
                <span>
                  <span className={headerStyle.nickname}>{user.nickname}&nbsp;</span>
                  <span className={headerStyle.nim}>님</span>
                </span>
                {/* <Link to="/logout">로그아웃</Link> */}
              </div>
              {profileOpen && (
                <div className={headerStyle.dropdownMenu}>
                  <Link to="/account/setting">내 정보 수정</Link>
                  <Link to={KAKAO_LOGOUT_URL}>로그아웃</Link>
                </div>
              )}
            </div>
          )}
        </nav>

        {/* 햄버거 버튼 */}
        <div className={headerStyle.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
          <div />
          <div />
          <div />
        </div>
      </div>

      {/* 메뉴 */}
      <div className={`${headerStyle.down} ${menuOpen ? headerStyle.open : ""}`}>
        <span>
          <Link to="/feed/list" className={currentPath.startsWith("/feed") ? headerStyle.activeLink : ""}>
            피드
          </Link>
        </span>
        <span>
          <Link to="/crew/list" className={currentPath.startsWith("/crew") ? headerStyle.activeLink : ""}>
            크루
          </Link>
        </span>
        <span>
          <Link to="/runner/list" className={currentPath.startsWith("/runner") ? headerStyle.activeLink : ""}>
            러너
          </Link>
        </span>
        <span>
          <Link to="/announcement/list" className={currentPath.startsWith("/announcement") ? headerStyle.activeLink : ""}>
            공지
          </Link>
        </span>
        <span>
          <Link to="/component" className={currentPath.startsWith("/component") ? headerStyle.activeLink : ""}>
            컴포넌트 확인
          </Link>
        </span>
      </div>
    </header>
  );
};

export default Header;
