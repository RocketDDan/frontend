import axios from 'axios';
import Swal from 'sweetalert2';

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
        const originalRequest = error.config;
        if (error.response?.status === 400) {
            console.error("Bad request, please check your input.");
            // alert(error.response.data);
            Swal.fire({
                icon: "error",
                title: "잘못된 접근",
                text: error.response.data,
                timer: 1500,
                showConfirmButton: false
            });
        }

        if (error.response?.status === 401) {
            if(error.response.data === "⚠️ 만료된 엑세스 토큰입니다.") {
                console.log("만료된 엑세스 토큰입니다.");
                return apiClient.post("/auth/token/reissue")
                    .then(() => {
                        console.log("엑세스 토큰 재발급 성공");
                        return apiClient(originalRequest);
                    })
                    .catch(() => {
                        Swal.fire({
                            icon: "error",
                            title: "로그인 만료",
                            text: "로그아웃 되었습니다. 다시 로그인해주세요.",
                            timer: 1500,
                            showConfirmButton: false
                        });
                        // alert("로그아웃 되었습니다. 다시 로그인해주세요.");
                        return apiClient.get('/auth/logout')
                            .then(() => {})
                            .catch((error) => {
                                console.error("로그아웃 요청 실패:", error);
                                window.location.href = "/logout/callback";
                            });
                    });
            } else if(error.response.data === "⚠️ 만료된 리프레시 토큰입니다.") {
                console.log("만료된 리프레시 토큰입니다.");
                Swal.fire({
                    icon: "error",
                    title: "로그인 만료",
                    text: "로그아웃 되었습니다. 다시 로그인해주세요.",
                    timer: 1500,
                    showConfirmButton: false
                });
                // alert("로그아웃 되었습니다. 다시 로그인해주세요.");
                return apiClient.get('/auth/logout')
                    .then(() => {})
                    .catch((error) => {
                        console.error("로그아웃 요청 실패:", error);
                        window.location.href = "/logout/callback";
                    });
            } else if(error.response.data === "⚠️ 만료된 회원가입용 인증 토큰입니다.") {
                Swal.fire({
                    icon: "error",
                    title: "로그인 실패",
                    text: "소셜 로그인을 다시 수행하고, 회원가입을 시도해주세요",
                    timer: 1500,
                    showConfirmButton: false
                });
                // alert("소셜 로그인을 다시 수행하고, 회원가입을 시도해주세요.");
                window.location.href = "/login";
            } else {
                console.warn("Unauthorized, redirecting to login.");
                const currentPath = window.location.pathname + window.location.search;
                localStorage.setItem("redirectAfterLogin", currentPath);
                window.location.href = "/login";
            }
        }

        if (error.response?.status === 403) {
            console.warn("Forbidden, you do not have permission to access this resource.");
            Swal.fire({
                icon: "error",
                title: "잘못된 접근",
                text: "접근 권한이 없습니다.",
                timer: 1500,
                showConfirmButton: false
            });
            // alert("접근 권한이 없습니다.");
            window.history.back(); // 이전 페이지로 이동
        }

        if (error.response?.status === 404) {
            console.warn("Resource not found.");
            window.location.href = "/404"; // 또는 "/not-found"
        }

        if (error.response?.status >= 500) {
            console.error("Server error, please try again later.");
            Swal.fire({
                icon: "error",
                title: "서버 오류 발생",
                text: "서버 오류가 발생했습니다. 나중에 다시 시도해주세요.",
                timer: 1500,
                showConfirmButton: false
            });
            // alert("서버 오류가 발생했습니다. 나중에 다시 시도해주세요.");
        }
        return Promise.reject(error);
    }
);

export default apiClient;