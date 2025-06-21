import { useAuthStore } from '../store/authStore';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

/**
사용 방법

const checkLoginUser = useCheckLogin();

const handleClick = async () => {
  const isLogin = await checkLoginUser();
  if (!isLogin) return;

  // 로그인된 사용자만 실행할 코드
};

*/
const useCheckLogin = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const checkLoginUser = useCallback(async () => {
    if (!user || !user.role) {
      const result = await Swal.fire({
        icon: 'info',
        title: '로그인이 필요합니다.',
        // html: '유효하지 않은 요청입니다.',
        confirmButtonText: '로그인하기',
        confirmButtonColor: '#5164ED',
        cancelButtonText: '취소',
        cancelButtonColor: '#d33',
        showCancelButton: true,
        allowOutsideClick: false,
      });

      if (result.isConfirmed) {
        navigate('/login');
      }
      return false;
    }

    return true;
  }, [user, navigate]);

  return checkLoginUser;
};

export default useCheckLogin;