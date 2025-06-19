import apiClient from './apiClient'; // apiClient 설정을 별도로 분리하여 import

const fetchCrew = async (crewId) => {
    try {
        const response = await apiClient.get(`/crews/${crewId}`);
        if (response.status !== 200) {
            throw new Error('크루 정보 조회 실패', response.data);
        }
        console.log('크루 정보 조회 성공', response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

const fetchCrewList = async (params) => {
    try {
        const response = await apiClient.get('/crews', { params });
        if (response.status !== 200) {
            throw new Error('크루 목록 조회 실패', response.data);
        }
        console.log('크루 목록 조회 성공', response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

const createCrew = async (crew, profileFile) => {
    try{
        const formData = new FormData();
        formData.append("crew", new Blob([JSON.stringify(crew)], { type: "application/json" }));
        if (profileFile) {
            formData.append("profile", profileFile);
        }
        console.log('profileFile', profileFile);
        const response = await apiClient.post('/crews', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        console.log('크루 생성 성공', response.data);
        return response.data;
    } catch (error) {
        throw error;
    }

};

const updateCrew = async (crewId, crew, profileFile) => {
    try{
        const formData = new FormData();
        formData.append("crew", new Blob([JSON.stringify(crew)], { type: "application/json" }));
        if (profileFile) {
            formData.append("profile", profileFile);
        }

        const response = await apiClient.put(`/crews/${crewId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        if (response.status !== 200) {
            throw new Error('크루 수정 실패', response.data);
        }

        console.log('크루 수정 성공', response.data);
        return response.data;
    } catch (error) {
        throw error;
    }

};

const deleteCrew = async (crewId) => {
    try{
        const response = await apiClient.delete(`/crews/${crewId}`);
        if (response.status !== 200) {
            throw new Error('크루 삭제 실패', response.data);
        }
        console.log('크루 삭제 성공', response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// 내 크루 조회
const fetchMyCrew = async () => {
    try {
        const response = await apiClient.get('/crews/me');
        if (response.status !== 200) {
            throw new Error('내 크루 조회 실패', response.data);
        }
        console.log('내 크루 조회 성공', response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 크루 이름 중복 조회
const checkDuplicateCrewName = async (crewName) => {
    try {
        const response = await apiClient.get('/crews/duplicate', {
            params: { crewName }
        });
        if (response.status !== 200) {
            throw new Error('크루 이름 중복 조회 실패', response.data);
        }
        console.log('크루 이름 중복 조회 성공', response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * 지역 기반 크루 랜덤 추천
 * @param {Object} params - { perPage?: number, region?: string }
 * @returns {Promise<Array>} 추천 크루 리스트
 */
const fetchRecommendedCrews = async (params = {}) => {
    try {
        const response = await apiClient.get('/crews/recommend', { params });
        console.log('추천 크루 조회 성공', response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export {
    fetchCrew,
    fetchCrewList,
    createCrew,
    updateCrew,
    deleteCrew,
    fetchMyCrew,
    checkDuplicateCrewName,
    fetchRecommendedCrews // 추가
};