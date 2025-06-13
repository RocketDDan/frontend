import { useState } from "react";
import style from "./FeedUploadPage.module.css";
import { PrimaryButton } from '../../components/base/Button'
import { TextAreaWithLabel } from '../../components/base/Input';
import { ImageAddBlock } from "../../components/image/ImageAddBlock";
import { ImageBlock } from "../../components/image/ImageBlock";
import { v7 as uuid7 } from "uuid";
import { uploadFeed } from "../../api/feed.api";
import { useNavigate } from "react-router-dom";


const FeedUploadPage = () => {

    const [fileList, setFileList] = useState([]);
    const [content, setContent] = useState("");
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);

    const navigate = useNavigate();

    // 파일 추가
    const handleFile = (e) => {
        const files = Array.from(e.target.files);
        const filesWithId = files.map(file => ({
            id: uuid7(),
            file: file
        }));
        setFileList(prev => [...prev, ...filesWithId]);
    };
    // 글 
    const handleContent = (val) => {
        setContent(val);
    }
    // 위치 수정
    const handleLocation = (lat, lng) => {
        setLat(lat);
        setLng(lng);
    }
    // 등록
    const handleSubmit = () => {
        uploadFeed(content, lat, lng, fileList.map(file => file.file))
            .then((data) => {
                navigate("/feed/list");
            })
    }

    return (
        <div className={style.container}>
            <h1>피드 업로드</h1>
            <div>
                <div style={{ textAlign: "start", marginBottom: "5px", }}>사진 선택</div>

                {/* 선택된 파일 미리보기 */}
                <div className={style.imageList}>
                    {fileList.map(({ id, file }) => {
                        return (
                            <ImageBlock
                                key={id}
                                file={file}
                                width="100px" />
                        )
                    })}
                    <ImageAddBlock handleFile={handleFile} />
                </div>
            </div>
            <div>
                <TextAreaWithLabel label="내용" height="200px" value={content} onChange={handleContent} />
            </div>
            <div>
                <span>주소</span>
                <div>
                    카카오 주소 어쩌구
                </div>
            </div>
            <div>
                <PrimaryButton width="100px" content="등록" onClick={handleSubmit} />
            </div>
        </div>
    )
}

export default FeedUploadPage;