import apiClient from './apiClient';

const logAdFeedView = async (feedId) => {
    try {
        const response = await apiClient.post(`/view-logs/feeds/${feedId}`);
        return response.data;
    } catch (error) {
        console.error('홍보 피드 조회수 로그 등록 실패:', error);
        throw error;
    }
}

export { logAdFeedView, }