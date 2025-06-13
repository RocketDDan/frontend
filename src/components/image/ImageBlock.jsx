import { useState } from "react";

const ImageBlock = ({ file, width = "100px", height = "100px" }) => {
    const [preview, setPreview] = useState("");

    // 파일 미리보기 URL 생성
    useState(() => {
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);

    return (
        <div style={{ width: width, height: height, backgroundColor: "white", border: "1px solid", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            {/* 이미지인지 동영상인지 확인 */}
            {file.type.startsWith("image/") ? (
                <img src={preview} alt="" style={{ width: "100%", height: "100%", objectFit: "contain", }} />
            ) : (
                <video src={preview} controls style={{ width: "100%" }} />
            )}
        </div>
    )
}
export { ImageBlock };