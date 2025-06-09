import { useState } from 'react';
import { Link } from 'react-router-dom';
import headerStyle from './Header.module.css';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const userRole = 'ANONYMOUS'; // TODO: 어디선가 빼올 예정

    return (
        <header className={headerStyle.container}>
            <div className={headerStyle.up}>
                <h1>
                    <Link to="/">Runners Hi</Link>
                </h1>

                <nav className={headerStyle.desktopNav}>
                    {userRole === 'ANONYMOUS' ? (
                        <Link to="/login">로그인</Link>
                    ) : (
                        <Link to="/logout">로그아웃</Link>
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
                <span><Link to="/feed/list">피드</Link></span>
                <span><Link to="/crew/list">크루</Link></span>
                <span><Link to="/runner/list">러너</Link></span>
                <span><Link to="/component">컴포넌트 확인</Link></span>
            </div>
        </header>
    );
};

export default Header;