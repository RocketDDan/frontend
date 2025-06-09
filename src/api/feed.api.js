import apiClient from './apiClient';

const fetchFeedList = async (params) => {
    try {
        const response = await apiClient.get('/feeds', { params });
        return response.data;
    } catch (error) {
        console.error('피드 목록 조회 실패:', error);
        throw error;
    }
};

export { fetchFeedList, }