import apiClient from './apiClient'; // apiClient 설정을 별도로 분리하여 import

const fetchCrew = async (crewId) => {
    try {
        const response = await apiClient.get(`/crews/${crewId}`);
        if (response.status !== 200) {
            throw new Error('크루 정보 조회 실패', response.data);
        }
        console.log('크루 정보 조회 성공:', response.data);
        return response.data;
    } catch (error) {
        console.error('크루 정보 조회 실패:', error);
        throw error;
    }
}

const fetchCrewList = async (params) => {
    try {
        const response = await apiClient.get('/crews', { params });
        if (response.status !== 200) {
            throw new Error('크루 목록 조회 실패', response.data);
        }
        console.log('크루 목록 조회 성공:', response);
        return response.data;
    } catch (error) {
        console.error('크루 목록 조회 실패:', error);
        throw error;
    }
}

export {fetchCrew, fetchCrewList};