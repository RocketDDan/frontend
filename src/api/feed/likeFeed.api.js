import apiClient from '../_base/apiClient';

const fetchLikeFeed = async (feedId) => {
    try {
        const response = await apiClient.post(`/feeds/${feedId}/likes`);
        return response.data;
    } catch (error) {
        console.error('피드 좋아요 클릭 실패:', error);
        throw error;
    }
};

const fetchUnlikeFeed = async (feedId) => {
    try {
        const response = await apiClient.delete(`/feeds/${feedId}/likes`);
        return response.data;
    } catch (error) {
        console.error('피드 좋아요 해제 실패:', error);
        throw error;
    }
};

export { fetchLikeFeed, fetchUnlikeFeed }