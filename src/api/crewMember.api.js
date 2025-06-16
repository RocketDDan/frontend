import apiClient from "./apiClient";

// 크루 멤버 탈퇴 
const resignCrewMember = async (crewId, resignRequest) => {
    try {
        const response = await apiClient.post(`/crews/${crewId}/resign`, resignRequest);
        if (response.status !== 200) {
            throw new Error('크루 멤버 탈퇴 실패', response.data);
        }
        console.log('크루 멤버 탈퇴 성공', response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 크루 멤버 강퇴 
const forceRemoveCrewMember = async (crewId, crewMemberId) => {
    try {
        const response = await apiClient.delete(`/crews/${crewId}/members/${crewMemberId}`);
        if (response.status !== 200) {
            throw new Error('크루 멤버 강퇴 실패', response.data);
        }
        console.log('크루 멤버 강퇴 성공', response.data);
        return response.data;
    } catch (error) {
        alert(error.message || '크루 멤버 강퇴 실패');
    }
};

// 크루원 목록 조회 
const fetchCrewMembers = async (crewId, params) => {
    try {
        const response = await apiClient.get(`/crews/${crewId}/members`, params);
        if (response.status !== 200) {
            throw new Error('크루원 목록 조회 실패', response.data);
        }
        console.log('크루원 목록 조회 성공', response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 크루장 변경 
const changeCrewLeader = async (crewId, crewMemberId) => {
    try {
        const response = await apiClient.put(`/crews/${crewId}/leader/${crewMemberId}`);
        if (response.status !== 200) {
            throw new Error('크루장 변경 실패', response.data);
        }
        console.log('크루장 변경 성공', response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export {
    resignCrewMember,
    forceRemoveCrewMember,
    fetchCrewMembers,
    changeCrewLeader
};