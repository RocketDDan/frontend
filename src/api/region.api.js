import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_REGION_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const getAccessToken = async () => {
    try {
        const { data } = await apiClient.get(
            '/OpenAPI3/auth/authentication.json',
            {
                params: {
                    consumer_key: process.env.REACT_APP_REGION_API_ID,
                    consumer_secret: process.env.REACT_APP_REGION_API_SECRET,
                }
            }
        );
        const accessToken = data.result.accessToken;
        console.log('Region Access Token 발급 성공');
        localStorage.setItem('region_accessToken', accessToken);
        return accessToken;
    } catch (error) {
        console.error('Region Access Token 발급 실패:', error);
        throw error;
    }
};

const fetchRegionList = async (cd) => {
    try {
        // 지역 조회 api 사용 시 accessToken을 localStorage에서 가져오고, 없으면 새로 발급
        let accessToken = localStorage.getItem('region_accessToken');
        if (!accessToken) {
            accessToken = await getAccessToken();
        }

        const response = await apiClient.get('/OpenAPI3/addr/stage.json', {
            params: cd ? { cd: cd, accessToken: accessToken } : { accessToken: accessToken },
        });
        return response.data;
    } catch (error) {
        console.error('지역 목록 조회 실패:', error);
        throw error;
    }
};

export { fetchRegionList, getAccessToken };