import headerStyle from "./Header.module.css";

import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
				<h1 className={headerStyle.logo}>
					<Link to="/">Runners Hi</Link>
				</h1>

				<nav className={headerStyle.desktopNav}>
					{!user && <Link to="/login">로그인</Link>}
					{user && (
						<div className={headerStyle.profileWrapper}>
							<div className={headerStyle.profileContainer} onClick={toggleProfileMenu}>
								<ProfileImage profileUrl={user.profileImageUrl} size="40px" />
								<span>
									<span className={headerStyle.nickname}>{user.nickname}&nbsp;</span>
									<span className={headerStyle.nim}>님</span>
								</span>
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

				<div className={headerStyle.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
					<div /><div /><div />
				</div>
			</div>

			<div className={`${headerStyle.down} ${menuOpen ? headerStyle.open : ""}`}>
				<span>
					<Link to="/feed/list" className={currentPath.startsWith("/feed") ? headerStyle.activeLink : ""} onClick={() => setMenuOpen(false)}>
						피드
					</Link>
				</span>
				<span>
					<Link to="/crew/list" className={currentPath.startsWith("/crew") ? headerStyle.activeLink : ""} onClick={() => setMenuOpen(false)}>
						크루
					</Link>
				</span>
				<span>
					<Link to="/announcement/list" className={currentPath.startsWith("/announcement") ? headerStyle.activeLink : ""} onClick={() => setMenuOpen(false)}>
						공지
					</Link>
				</span>

				{user?.role === 'ADMIN' && (
					<>
						<span>
							<Link to="/admin/member/list" className={currentPath.startsWith("/admin/member") ? headerStyle.activeLink : ""} onClick={() => setMenuOpen(false)}>
								회원 관리
							</Link>
						</span>
						<span>
							<Link to="/admin/reward/list" className={currentPath.startsWith("/admin/reward") ? headerStyle.activeLink : ""} onClick={() => setMenuOpen(false)}>
								수익 관리
							</Link>
						</span>
					</>
				)}

				{user?.role === 'COMPANY' && (
					<span>
						<Link to="/company/reward/list" className={currentPath.startsWith("/company/reward") ? headerStyle.activeLink : ""} onClick={() => setMenuOpen(false)}>
							지출 관리
						</Link>
					</span>
				)}

				{!user && menuOpen && (
					<span>
						<Link to="/login" className={currentPath.startsWith("/login") ? headerStyle.activeLink : ""} onClick={() => setMenuOpen(false)}>
							로그인
						</Link>
					</span>
				)}

				{user && menuOpen && (
					<span>
						<Link to={`/runner/${user.memberId}`} className={currentPath.startsWith("/account/setting") ? headerStyle.activeLink : ""} onClick={() => setMenuOpen(false)}>
							내 정보 수정
						</Link>
					</span>

				)}
				{user && menuOpen && (
					<span>
						<Link to={KAKAO_LOGOUT_URL} onClick={() => setMenuOpen(false)}>
							로그아웃
						</Link>
					</span>
				)}
			</div>
		</header>
	);
};

export default Header;