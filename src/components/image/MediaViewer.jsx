import { useEffect, useRef } from "react";

const MediaViewer = ({ fileUrl }) => {
    const videoRef = useRef(null);

    const isVideo = (url) => {
        if (!url) return false;
        const cleanUrl = url.split('?')[0];
        return cleanUrl.endsWith('.mp4') || cleanUrl.endsWith('.mov') || cleanUrl.endsWith('.webm');
    };

    const isVideoFile = isVideo(fileUrl);

    useEffect(() => {
        if (isVideoFile && videoRef.current) {
            videoRef.current.load();
        }
    }, [fileUrl, isVideoFile]);

    if (isVideoFile) {
        return (
            <video
                ref={videoRef}
                style={{ width: '100%', height: 'auto' }}
                controls>
                <source src={fileUrl} type="video/mp4" />
                브라우저가 video 태그를 지원하지 않습니다.
            </video>
        );
    }

    return <img
        src={fileUrl}
        alt="피드 이미지"
        style={{ width: '100%', height: 'auto' }} />;
};

export default MediaViewer;


// import { useEffect, useRef } from "react";

// const MediaViewer = ({ fileUrl }) => {
//     const videoRef = useRef(null);

//     const isVideo = (url) => {
//         if (!url) return false;
//         const cleanUrl = url.split('?')[0];
//         return cleanUrl.endsWith('.mp4') || cleanUrl.endsWith('.mov') || cleanUrl.endsWith('.webm');
//     };

//     const isVideoFile = isVideo(fileUrl);

//     useEffect(() => {
//         if (isVideoFile && videoRef.current) {
//             videoRef.current.load();
//         }
//     }, [fileUrl, isVideoFile]);

//     const handleVideoClick = () => {
//         const video = videoRef.current;
//         if (!video) return;

//         if (video.paused) {
//             video.play();
//         } else {
//             video.pause();
//         }
//     };

//     if (isVideoFile) {
//         return (
//             <video
//                 ref={videoRef}
//                 src={fileUrl}
//                 style={{ width: '100%', height: 'auto', cursor: 'pointer' }}
//                 controls
//                 onClick={handleVideoClick}
//             />
//         );
//     }

//     return (
//         <img
//             src={fileUrl}
//             alt="피드 이미지"
//             style={{ width: '100%', height: 'auto' }}
//         />
//     );
// };

// export default MediaViewer;ㅋ