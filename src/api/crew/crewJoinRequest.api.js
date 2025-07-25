import apiClient from "../_base/apiClient";

const fetchCrewJoinRequestList = async (crewId, params) => {
    try {
        const response = await apiClient.get(`/crews/${crewId}/join-requests`, { params });
        if (response.status !== 200) {
            throw new Error('크루 가입 요청 목록 조회 실패', response.data);
        }
        // console.log('크루 가입 요청 목록 조회 성공', response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

const approveCrewJoinRequest = async (crewId, requestId) => {
    try {
        const response = await apiClient.put(`/crews/${crewId}/join-requests/${requestId}/accept`);
        if (response.status !== 200) {
            throw new Error('크루 가입 요청 승인 실패', response.data);
        }
        // console.log('크루 가입 요청 승인 성공', response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

const rejectCrewJoinRequest = async (crewId, requestId) => {
    try {
        const response = await apiClient.put(`/crews/${crewId}/join-requests/${requestId}/deny`);
        if (response.status !== 200) {
            throw new Error('크루 가입 요청 거절 실패', response.data);
        }
        // console.log('크루 가입 요청 거절 성공', response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

const requestCrewJoin = async (crewId, message) => {
    try {
        const response = await apiClient.post(`/crews/${crewId}/join-requests`, { requestMessage: message });
        if (response.status === 200) {
            // console.log('크루 가입 요청 성공', response.data);
            return response.data;
        }
    } catch (error) {
        // 400 에러 메시지 처리
        if (error.response && error.response.status === 400) {
            console.error(error.response.data);
            return null;
        }
        throw error; // 그 외 에러만 throw
    }
}

const deleteCrewJoinRequest = async (crewId) => {
    try{
        const response = await apiClient.delete(`/crews/${crewId}/join-requests`);
        if(response.status === 200){
            // console.log('크루 가입 요청 삭제 성공', response.data);
            return response.data;
        }
    }
    catch(error) {
        // 400 에러 메시지 처리
        if (error.response && error.response.status === 400) {
            console.error(error.response.data);
            return null;
        }
        throw error; // 그 외 에러만 throw
    }
}

export {
    fetchCrewJoinRequestList,
    approveCrewJoinRequest,
    rejectCrewJoinRequest,
    requestCrewJoin,
    deleteCrewJoinRequest
};

