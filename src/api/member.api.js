import apiClient from "./apiClient";

// 로그인한 회원 정보 조회 (GET /members/personal-info)
const fetchMemberInfo = async () => {
    try {
        const response = await apiClient.get("/members/personal-info");
        if (response.status !== 200) {
            throw new Error("회원 정보 조회 실패", response.data);
        }
        console.log("회원 정보 조회 성공", response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export { fetchMemberInfo };