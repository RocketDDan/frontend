import headerStyle from './Header.module.css';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { LoginMemberProfileImage } from '../profile/ProfileImage'

import MetamongImage from "../../assets/images/metamong.jpeg"


const Header = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const user = {
        nickname: "러너스하이",
        role: 'USER', // TODO: 어디선가 빼올 예정 (ANONYMOUS, USER, ADMIN, COMPANY)
    }

    const toggleProfileMenu = () => setProfileOpen(prev => !prev);

    return (
        <header className={headerStyle.container}>
            <div className={headerStyle.up}>
                <h1>
                    <Link to="/">Runners Hi</Link>
                </h1>

                <nav className={headerStyle.desktopNav}>
                    {user.role === 'ANONYMOUS' ? (
                        <Link to="/login">로그인</Link>
                    ) : (
                        <div className={headerStyle.profileWrapper}>
                            <div className={headerStyle.profileContainer} onClick={toggleProfileMenu}>
                                <LoginMemberProfileImage profileUrl={MetamongImage} />
                                <span>
                                    <span className={headerStyle.nickname}>{user.nickname}&nbsp;</span>
                                    <span className={headerStyle.nim}>님</span>
                                </span>
                                {/* <Link to="/logout">로그아웃</Link> */}
                            </div>
                            {profileOpen && (
                                <div className={headerStyle.dropdownMenu}>
                                    <Link to="/account/setting">내 정보 수정</Link>
                                    <Link to="/logout">로그아웃</Link>
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
            <div className={`${headerStyle.down} ${menuOpen ? headerStyle.open : ''}`}>
                <span><Link
                    to="/feed/list"
                    className={currentPath.startsWith("/feed") ? headerStyle.activeLink : ""}>피드</Link></span>
                <span><Link
                    to="/crew/list"
                    className={currentPath.startsWith("/crew") ? headerStyle.activeLink : ""}>크루</Link></span>
                <span><Link
                    to="/runner/list"
                    className={currentPath.startsWith("/runner") ? headerStyle.activeLink : ""}>러너</Link></span>
                <span><Link
                    to="/component"
                    className={currentPath.startsWith("/component") ? headerStyle.activeLink : ""}>컴포넌트 확인</Link></span>
            </div>
        </header>
    );
};

export default Header;