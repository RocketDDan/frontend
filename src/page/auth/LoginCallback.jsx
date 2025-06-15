import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

import LoadingSpinner from '../../components/base/LoadingSpinner';

import { fetchUserInfo } from '../../api/auth.api';

const LoginCallback = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await fetchUserInfo();
        setUser(user);
        navigate('/');
      } catch (error) {
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate, setUser]);

  return <LoadingSpinner />;
};

export default LoginCallback;
