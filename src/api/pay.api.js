import apiClient from './apiClient';

const sendKakaoPayApprove = async (pgToken, partnerOrderId) => {
    try {
        const response = await apiClient.post("/pay/kakao/success", {
            pgToken,
            partnerOrderId,
        });
        return response.data;
    } catch (error) {
        console.error('피드 목록 조회 실패:', error);
        throw error;
    }
};


export { sendKakaoPayApprove, }