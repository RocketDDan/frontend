import { faImage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";

const ImageAddBlock = ({ width = "100px", height = "100px", handleFile }) => {

    const inputRef = useRef(null);

    const handleClick = () => {
        inputRef.current.click();
    }
    return (
        <div style={{
            width: width,
            height: height,
            backgroundColor: "white",
            border: "1px solid",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
        }}
            onClick={handleClick}>

            <FontAwesomeIcon
                icon={faImage}
                style={{
                    width: "35px",
                    height: "35px",
                }} />

            {/* 파일 선택 버튼 (안보임) */}
            <input
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={handleFile}
                style={{ display: 'none' }}
                ref={inputRef}/>
        </div>
    )
}

export { ImageAddBlock };