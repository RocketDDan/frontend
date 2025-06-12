import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_SERVER_DOMAIN, // .env에 설정 가능
    headers: {
        'Content-Type': 'application/json',
    }
});

const fetchCrew = async (crewId) => {
    console.log("API BASE URL:", process.env.REACT_APP_SERVER_DOMAIN);
    try {
        const response = await apiClient.get(`/crews/${crewId}`);
        if (!response.ok) {
            // console.error('크루 정보 조회 실패:', response.data);
            // throw new Error('크루 정보 조회 실패', response.data);
        }
        console.log('크루 정보 조회 성공:', response);
        return response.data;
    } catch (error) {
        console.error('크루 정보 조회 실패:', error);
        throw error;
    }
}

export {fetchCrew};