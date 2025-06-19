import Swal from 'sweetalert2';

const RequiredLogin = (user) => {
    if (user === null) {
        Swal.fire("로그인이 필요합니다.");
        return true;
    }

    return false;
};

export default RequiredLogin;