import apiClient from "./apiClient";

// 회원 정보 조회 (GET /members/{memberId})
const fetchMemberInfo = async (memberId) => {
  const response = await apiClient.get(`/members/${memberId}`);
  if (response.status !== 200) {
    throw new Error("회원 정보 조회 실패", response.data);
  }
  console.log("회원 정보 조회 성공", response.data);
  return response.data;
};

const fetchMemberProfile = async (memberId) => {
  const response = await apiClient.get(`/members/${memberId}/profile`);
  if (response.status !== 200) {
    throw new Error("회원 프로필 조회 실패", response.data);
  }
  console.log("회원 프로필 조회 성공", response.data);
  return response.data;
};

export { fetchMemberInfo, fetchMemberProfile };
