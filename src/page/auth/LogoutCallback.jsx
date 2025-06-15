import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

import LoadingSpinner from "../../components/base/LoadingSpinner";

const LogoutCallback = () => {
  const navigate = useNavigate();
  const clearUser = useAuthStore((state) => state.clearUser);

  useEffect(() => {
    const doLogout = async () => {
      clearUser();
      navigate("/");
    };

    doLogout();
  }, [navigate, clearUser]);

  return <LoadingSpinner />;
};

export default LogoutCallback;
