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
        if (error.response?.status === 400) {
            console.error("Bad request, please check your input.");
            alert(error.response.data);
            return;
        }
        if (error.response?.status === 401) {
            console.warn("Unauthorized, redirecting to login.");
            window.history.back(); // 이전 페이지로 이동
            return;
        }
        if (error.response?.status === 403) {
            console.warn("Forbidden, you do not have permission to access this resource.");
            alert("접근 권한이 없습니다.");
            window.history.back(); // 이전 페이지로 이동
            return;
        }
        if (error.response?.status === 404) {
            console.warn("Resource not found.");
            window.location.href = "/404"; // 또는 "/not-found"
            return;
        }
        if (error.response?.status >= 500) {
            console.error("Server error, please try again later.");
            alert("서버 오류가 발생했습니다. 나중에 다시 시도해주세요.");
        }
        return Promise.reject(error);
    }
);

export default apiClient;