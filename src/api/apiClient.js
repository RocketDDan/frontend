import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL, // .env에 설정 가능
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // 필요 시 쿠키 포함
});

// 요청 인터셉터 (옵션)
apiClient.interceptors.request.use(
    config => {
        // 예: 토큰 추가
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// 응답 인터셉터 (옵션)
apiClient.interceptors.response.use(
    response => response,
    error => {
        // 예: 공통 에러 처리
        if (error.response?.status === 401) {
            console.warn("Unauthorized, redirecting to login.");
        }
        return Promise.reject(error);
    }
);

export default apiClient;