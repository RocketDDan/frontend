const RequiredLogin = ({user}) => {        
    if (user === null) {
        alert("로그인이 필요합니다.");
        return true;
    }

    return false;
};

export default RequiredLogin;