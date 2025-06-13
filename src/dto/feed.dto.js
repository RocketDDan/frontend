const sampleFeed = {
    feedId: 0,
    content: "",
    writerId: 0,
    writerNickname: "",
    writerProfileUrl: "",
    mine: false, // Boolean
    like: false, // Boolean
    viewCount: 0, // 조회수
    likeCount: 0, // 좋아요 수
    commentCount: 0,
    lat: 0, // null
    lng: 0, // null
    createdAt: "",
    feedFileUrlList: [
        {
            order: 1,
            fileUrl: "",
        },
    ],
    commentList: [
        {
            commentId: 1,
            writerProfileUrl: "",
            writerNickname: "",
            content: "",
        },
    ],
};

export default sampleFeed;