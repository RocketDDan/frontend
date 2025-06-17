import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

import LoadingSpinner from "../../components/base/LoadingSpinner";

const LogoutCallback = () => {
  const navigate = useNavigate();
  const clearUser = useAuthStore((state) => state.clearUser);
  const clearUserCrew = useAuthStore((state) => state.clearUserCrew);

  useEffect(() => {
    const doLogout = async () => {
      clearUser();
      clearUserCrew();
      navigate("/");
    };

    doLogout();
  }, [navigate, clearUser, clearUserCrew]);

  return <LoadingSpinner />;
};

export default LogoutCallback;
