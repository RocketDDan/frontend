import apiClient from "./apiClient";

const fetchCrewJoinRequestList = async (crewId, params) => {
    try {
        const response = await apiClient.get(`/crews/${crewId}/join-requests`, { params });
        if (response.status !== 200) {
            throw new Error('크루 가입 요청 목록 조회 실패', response.data);
        }
        console.log('크루 가입 요청 목록 조회 성공:', response);
        return response.data;
    } catch (error) {
        console.error('크루 가입 요청 목록 조회 실패:', error);
        throw error;
    }
}

const approveCrewJoinRequest = async (crewId, requestId) => {
    try {
        const response = await apiClient.put(`/crews/${crewId}/join-requests/${requestId}/accept`);
        if (response.status !== 200) {
            throw new Error('크루 가입 요청 승인 실패', response.data);
        }
        console.log('크루 가입 요청 승인 성공:', response);
        return response.data;
    } catch (error) {
        console.error('크루 가입 요청 승인 실패:', error);
        throw error;
    }
}

const rejectCrewJoinRequest = async (crewId, requestId) => {
    try {
        const response = await apiClient.put(`/crews/${crewId}/join-requests/${requestId}/deny`);
        if (response.status !== 200) {
            throw new Error('크루 가입 요청 거절 실패', response.data);
        }
        console.log('크루 가입 요청 거절 성공:', response);
        return response.data;
    } catch (error) {
        console.error('크루 가입 요청 거절 실패:', error);
        throw error;
    }
}

export {
    fetchCrewJoinRequestList,
    approveCrewJoinRequest,
    rejectCrewJoinRequest
};

