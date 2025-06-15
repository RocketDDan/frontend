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

const uploadFeed = async (content, lat, lng, fileList) => {
    try {
        const formData = new FormData();

        formData.append("content", content);
        if (lat !== undefined && lat !== null) formData.append("lat", lat);
        if (lng !== undefined && lng !== null) formData.append("lng", lng);

        fileList.forEach(file => {
            formData.append("fileList", file);
        });

        const response = await apiClient.post('/feeds', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        return response.data;
    } catch (error) {
        console.error('피드 업로드 실패:', error);
        throw error;
    }
};

export { fetchFeedList, uploadFeed }