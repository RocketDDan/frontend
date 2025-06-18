import headerStyle from "./Header.module.css";

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

import { ProfileImage } from "../profile/ProfileImage";

const Header = () => {
	const KAKAO_LOGOUT_REDIRECT_URL = `${process.env.REACT_APP_API_BASE_URL}/auth/logout`;
	const KAKAO_LOGOUT_URL = `https://kauth.kakao.com/oauth/logout?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&logout_redirect_uri=${KAKAO_LOGOUT_REDIRECT_URL}`;

	const location = useLocation();
	const currentPath = location.pathname;

	const [menuOpen, setMenuOpen] = useState(false);
	const [profileOpen, setProfileOpen] = useState(false);

	const user = useAuthStore((state) => state.user);

	const toggleProfileMenu = () => setProfileOpen((prev) => !prev);

	const menuRef = useRef(null);
	const handleMenuLinkClick = () => setMenuOpen(false);
	// 전역 클릭 감지 로직
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				setMenuOpen(false);
				setProfileOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<header className={headerStyle.container} ref={menuRef}>
			<div className={headerStyle.up}>
				<h1>
					<Link to="/">Runners Hi</Link>
				</h1>

				<nav className={headerStyle.desktopNav}>
					{!user && (
						<Link to="/login">로그인</Link>
					)}
					{user && (
						<div className={headerStyle.profileWrapper}>
							<div className={headerStyle.profileContainer} onClick={toggleProfileMenu}>
								<ProfileImage profileUrl={user.profileImageUrl} size="40px"/>
								<span>
									<span className={headerStyle.nickname}>{user.nickname}&nbsp;</span>
									<span className={headerStyle.nim}>님</span>
								</span>
								{/* <Link to="/logout">로그아웃</Link> */}
							</div>
							{profileOpen && (
								<div className={headerStyle.dropdownMenu}>
									<Link to={`/runner/${user.memberId}`}>내 프로필</Link>
									<Link to={KAKAO_LOGOUT_URL}>로그아웃</Link>
								</div>
							)}
						</div>
					)}
				</nav>

				{/* 햄버거 버튼 */}
				<div className={headerStyle.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
					<div /><div /><div />
				</div>
			</div>

			{/* 메뉴 */}
			<div className={`${headerStyle.down} ${menuOpen ? headerStyle.open : ""}`}>
				<span>
					<Link
						to="/feed/list"
						className={currentPath.startsWith("/feed") && headerStyle.activeLink}
						onClick={handleMenuLinkClick}>
						피드
					</Link>
				</span>

				<span>
					<Link
						to="/crew/list"
						className={currentPath.startsWith("/crew") && headerStyle.activeLink}
						onClick={handleMenuLinkClick}>
						크루
					</Link>
				</span>

				<span>
					<Link
						to="/announcement/list"
						className={currentPath.startsWith("/announcement") && headerStyle.activeLink}>
						공지
					</Link>
				</span>

				{/* <span>
					<Link
						to="/component"
						className={currentPath.startsWith("/component") && headerStyle.activeLink}
						onClick={handleMenuLinkClick}>
						컴포넌트 확인
					</Link>
				</span> */}

				{!user && menuOpen && <span>
					<Link
						to="/login"
						className={currentPath.startsWith("/login") && headerStyle.activeLink}
						onClick={handleMenuLinkClick}>
						로그인
					</Link>
				</span>}

				{user && menuOpen && <span>
					<Link
						// to="/account/setting"
						to={`/runner/${user.memberId}`}
						className={currentPath.startsWith("/account/setting") && headerStyle.activeLink}
						onClick={handleMenuLinkClick}>
						내 정보 수정
					</Link>
				</span>}

				{user && menuOpen && <span>
					<Link
						to={KAKAO_LOGOUT_URL}
						onClick={handleMenuLinkClick}>
						로그아웃
					</Link>
				</span>}

				{user && user.role === 'ADMIN' && <span>
					<Link
						to="/admin/member/list"
						className={currentPath.startsWith("/admin/member") && headerStyle.activeLink}
						onClick={handleMenuLinkClick}>
						회원 관리
					</Link>
				</span>}

				{user && user.role === 'ADMIN' && <span>
					<Link
						to="/admin/reward/list"
						className={currentPath.startsWith("/admin/reward") && headerStyle.activeLink}
						onClick={handleMenuLinkClick}>
						수익 관리
					</Link>
				</span>}

				{user && user.role === 'COMPANY' && <span>
					<Link
						to="/company/reward/list"
						className={currentPath.startsWith("/company/reward") && headerStyle.activeLink}
						onClick={handleMenuLinkClick}>
						지출 관리
					</Link>
				</span>}

				<span></span>
			</div>
		</header>
	);
};

export default Header;
