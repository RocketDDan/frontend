// 이미지
import BaseProfileImage from '../../assets/images/base_profile.png';
// 스타일
import ProfileImageStyle from './ProfileImage.module.css';

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
              className={ProfileImageStyle.container}
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

/**
 * 회원가입폼 프로필 이미지 프리뷰, 헤더 오른쪽 로그인 유저 프로필 이미지 컴포넌트
 *
 * @component
 * @param {Object} props - 컴포넌트 속성
 * @param {string} [props.profileUrl] - 프로필 이미지 URL (없으면 기본 이미지 사용)
 * @param {string} [props.width] - 프로필 이미지 가로 크기 (기본값: '30px')
 * @param {string} [props.height] - 프로필 이미지 세로 크기 (기본값: '30px')
 * @returns {JSX.Element} 프로필 이미지 컴포넌트
 */
const LoginMemberProfileImage = (props) => {
  return (
    <div>
      <div className={ProfileImageStyle.container} style={{
          width: props.width || "30px",
          height: props.height || "30px",
      }}>
            {props.profileUrl
                ? <img src={props.profileUrl} alt="피드 프로필 이미지" width={'100%'} />
                : <img src={BaseProfileImage} alt="피드 프로필 이미지" width={'95%'} />}
        </div>
    </div>
  )
}

/**
 * 피드 작성자 프로필 이미지 컴포넌트
 *
 * @component
 * @param {Object} props - 컴포넌트 속성
 * @param {string} [props.profileUrl] - 프로필 이미지 URL (없으면 기본 이미지 사용)
 * @returns {JSX.Element} 프로필 이미지 컴포넌트
 */
const FeedProfileImage = (props) => {
  return (
    <div>
            <div className={ProfileImageStyle.container} style={{
                width: '30px',
                height: '30px',
            }}>
                {props.profileUrl
                    ? <img src={props.profileUrl} alt="피드 프로필 이미지" width={'100%'} />
                    : <img src={BaseProfileImage} alt="피드 프로필 이미지" width={'95%'} />}
      </div>
    </div>
    )
}

/**
 * 멤버 프로필 이미지 컴포넌트
 *
 * @component
 * @param {Object} props - 컴포넌트 속성
 * @param {string} [props.profileUrl] - 프로필 이미지 URL (없으면 기본 이미지 사용)
 * @returns {JSX.Element} 프로필 이미지 컴포넌트
 */
const MemberProfileImage = (props) => {
  return (
    <div>
            <div className={ProfileImageStyle.container} style={{
                width: '100px',
                height: '100px',
            }}>
                {props.profileUrl
                    ? <img src={props.profileUrl} alt="피드 프로필 이미지" width={'100%'} />
                    : <img src={BaseProfileImage} alt="피드 프로필 이미지" width={'95%'} />}
      </div>
    </div>
    )
}

/**
 * 크루 관련 멤버 프로필 이미지 컴포넌트
 *
 * @component
 * @param {Object} props - 컴포넌트 속성
 * @param {string} [props.profileUrl] - 프로필 이미지 URL (없으면 기본 이미지 사용)
 * @returns {JSX.Element} 프로필 이미지 컴포넌트
 */
const CrewMemberProfileImage = (props) => {
  return (
    <div>
            <div className={ProfileImageStyle.crewContainer} style={{
                width: '40px',
                height: '40px',
            }}>
                {props.profileUrl
                    ? <img src={props.profileUrl} alt="크루 프로필 이미지" className={ProfileImageStyle.profileImg} />
                    : <img src={BaseProfileImage} alt="기본 프로필 이미지" width={'95%'} />}
      </div>
    </div>
    )
}

/**
 * 크루 프로필 이미지 컴포넌트
 *
 * @component
 * @param {Object} props - 컴포넌트 속성
 * @param {string} [props.profileUrl] - 프로필 이미지 URL (없으면 기본 이미지 사용)
 * @returns {JSX.Element} 프로필 이미지 컴포넌트
 */
const CrewProfileImage = (props) => {
  return (
    <div>
            <div className={ProfileImageStyle.crewContainer} style={{
                width: '200px',
                height: '200px',
            }}>
                {props.profileUrl
                    ? <img src={props.profileUrl} alt="피드 프로필 이미지" className={ProfileImageStyle.profileImg} />
                    : <img src={BaseProfileImage} alt="피드 프로필 이미지" className={ProfileImageStyle.profileImg} />}
      </div>
    </div>
    )
}

export { ProfileImage, LoginMemberProfileImage, FeedProfileImage, MemberProfileImage, CrewMemberProfileImage, CrewProfileImage };