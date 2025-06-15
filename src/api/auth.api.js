import apiClient from './apiClient';

export const fetchUserInfo = async () => {
  try {
    const response = await apiClient.get('/members/personal-info');
    return response.data;
  } catch (error) {
    console.error('사용자 정보 조회 실패:', error);
    throw error;
  }
};
