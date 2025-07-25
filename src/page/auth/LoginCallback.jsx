// react
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// login
import LoadingSpinner from "../../components/base/LoadingSpinner";
// api
import { fetchUserInfo } from "../../api/auth/auth.api";
import { fetchMyCrew, fetchCrew } from "../../api/crew/crew.api";
// store
import { useAuthStore } from "../../store/authStore";

const LoginCallback = () => {
  const navigate = useNavigate();
  const { setUser, setUserCrew } = useAuthStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await fetchUserInfo();
        setUser(user);
        const myCrewId = await fetchMyCrew();
        if (myCrewId) {
          const myCrewInfo = await fetchCrew(myCrewId);
          setUserCrew({
            crewId: myCrewInfo.crewId,
            crewName: myCrewInfo.crewName,
            isLeader: myCrewInfo.leader,
          });
        }
        const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
        localStorage.removeItem("redirectAfterLogin");
        navigate(redirectPath);
      } catch (error) {
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate, setUser, setUserCrew]);

  return <LoadingSpinner />;
};

export default LoginCallback;
