import BaseProfileImage from '../../assets/images/base_profile.png'

// Parameter : width, height, profileUrl
const ProfileImage = (props) => {
    return (
        <div>
            <div style={{
                width: props.width || '30px',
                height: props.height || '30px',
                borderRadius: '100px',
                border: '1px solid #000',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <img src={props.profileUrl || BaseProfileImage} alt="프로필 이미지" width={'70%'} />
            </div>
        </div>
    )
}

export default ProfileImage;