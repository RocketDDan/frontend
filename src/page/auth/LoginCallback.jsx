import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

import LoadingSpinner from "../../components/base/LoadingSpinner";

import { fetchUserInfo } from "../../api/auth.api";
import { fetchMyCrew, fetchCrew } from "../../api/crew.api";

const LoginCallback = () => {
  const navigate = useNavigate();
  const { setUser, setUserCrew } = useAuthStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await fetchUserInfo();
        setUser(user);
        try {
          const myCrewId = await fetchMyCrew();
          if (myCrewId) {
            const myCrewInfo = await fetchCrew(myCrewId);
            setUserCrew({
              crewId: myCrewInfo.crewId,
              crewName: myCrewInfo.crewName,
              isLeader: myCrewInfo.leader,
            });
          }
        } catch (error) {}
        navigate("/");
      } catch (error) {
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate, setUser, setUserCrew]);

  return <LoadingSpinner />;
};

export default LoginCallback;
