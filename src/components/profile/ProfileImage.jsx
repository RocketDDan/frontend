// 이미지
import BaseProfileImage from '../../assets/images/base_profile.png';
// 스타일
import style from './ProfileImage.module.css';

/**
 * 유저 프로필 이미지 컴포넌트
 * @component
 * @param {string} profileUrl  프로필 이미지 URL (없으면 기본 이미지 사용)
 * @param {string} size 가로/세로 길이 (헤더: 30px, 피드 작성자: 30px, 멤버 프로필: 100px?, 크루 프로필: 200px?)
 * @param {Function} onClick 클릭 시 이벤트
 * @returns {JSX.Element} 프로필 이미지 컴포넌트
 */
const ProfileImage = ({ profileUrl, size = "30px", onClick }) => {

    const handleClick = (e) => {
        onClick?.(e);
    }
    
    return (
        <div>
            <div
                className={style.container}
                style={{
                    width: size,
                    height: size,
                }}
                onClick={handleClick}>
                {profileUrl
                    ? <img src={profileUrl} alt="피드 프로필 이미지" width={'100%'} />
                    : <img src={BaseProfileImage} alt="피드 프로필 이미지" width={'95%'} />}
            </div>
        </div>
  )
}

export { ProfileImage };
