import apiClient from '../_base/apiClient';

/**
 * 피드 댓글 가져오기
 * @param {Number} feedId 피드 id
 * @returns 
 */
const fetchFeedCommentList = async (feedId) => {
    try {
        const response = await apiClient.get(`/feeds/${feedId}/comments`);
        return response.data;
    } catch (error) {
        console.error("댓글 가져오기 실패:", error);
        throw error;
    }
};

/**
 * 피드 댓글 수정하기
 * @param {Number} feedId 
 * @param {Number} commentId 
 * @param {String} newComment 
 * @returns 
 */
const updateFeedComment = async (feedId, commentId, { newComment }) => {
    try {
        const response = await apiClient.put(`/feeds/${feedId}/comments/${commentId}`, { newComment });
        return response.data;
    } catch (error) {
        console.error('댓글 수정 실패:', error);
        throw error;
    }
};

/**
 * 피드에 댓글 달기
 * @param {Number} feedId 피드 id
 * @param {String} comment 댓글
 * @returns 
 */
const postFeedComment = async (feedId, comment) => {
    try {
        const response = await apiClient.post(`/feeds/${feedId}/comments`, { comment });
        return response.data;
    } catch (error) {
        console.error("댓글 달기 실패:", error);
        throw error;
    }
};

/**
 * 피드 댓글 삭제하기
 * @param {Number} feedId 피드 id
 * @param {Number} commentId 댓글 id
 * @returns 
 */
const deleteFeedComment = async (feedId, commentId) => {
    try {
        const response = await apiClient.delete(`/feeds/${feedId}/comments/${commentId}`);
        return response.data;
    } catch (error) {
        console.error("댓글 삭제 실패:", error);
        throw error;
    }
};
export { fetchFeedCommentList, updateFeedComment, postFeedComment, deleteFeedComment }