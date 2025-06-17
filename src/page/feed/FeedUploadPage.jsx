import { useState } from "react";
import style from "./FeedUploadPage.module.css";
import { PrimaryButton } from '../../components/base/Button'
import { TextAreaWithLabel } from '../../components/base/Input';
import { ImageAddBlock } from "../../components/image/ImageAddBlock";
import { ImageBlock } from "../../components/image/ImageBlock";
import { v7 as uuid7 } from "uuid";
import { uploadFeed, uploadFeedByCompany } from "../../api/feed.api";
import { useNavigate } from "react-router-dom";
import KakaoMap from "../../components/map/KakaoMap";
import Swal from "sweetalert2";
import { useAuthStore } from "../../store/authStore";

const FeedUploadPage = () => {

    const [fileList, setFileList] = useState([]);
    const [content, setContent] = useState("");
    const [lat, setLat] = useState(33.450701);
    const [lng, setLng] = useState(126.570667);
    const [amount, setAmount] = useState(10000);

    const navigate = useNavigate();

    const user = useAuthStore((state) => state.user);

    const handleAmount = (e) => {
        setAmount(e.target.value);
    }

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

    // 등록
    const handleSubmit = () => {
        console.log(user);
        if (user.role === 'USER') {
            uploadPersonalFeed();
        } else if (user.role === 'COMPANY') {
            uploadAdvertiseFeed();
        }
    }

    // 일반 피드 올리기
    const uploadPersonalFeed = () => {
        uploadFeed(content, lat, lng, fileList.map(file => file.file))
            .then((data) => {
                // 업로드 후 피드 목록으로 이동
                navigate("/feed/list");
            })
            .catch((err) => {
                console.error('업로드 실패:', err);
                Swal.fire({
                    icon: 'error',
                    title: '업로드 실패',
                    text: '잠시 후 다시 시도해 주세요.',
                    timer: 1500,
                    showConfirmButton: false
                });
            });
    }
    // 홍보 피드 올리기
    const uploadAdvertiseFeed = () => {
        uploadFeedByCompany(content, lat, lng, fileList.map(file => file.file), amount)
            .then((data) => {
                // 업로드 후 피드 목록으로 이동
                localStorage.setItem("partner_order_id", data.partner_order_id)
                window.location.href = data.next_redirect_pc_url;
            })
            .catch((err) => {
                console.error('업로드 실패:', err);
                Swal.fire({
                    icon: 'error',
                    title: '업로드 실패',
                    text: '잠시 후 다시 시도해 주세요.',
                    timer: 1500,
                    showConfirmButton: false
                });
            });
    }

    // 위치 수정
    const handleLatLng = (lat, lng) => {
        setLat(lat);
        setLng(lng);
        console.log("lat: ", lat, " | lng: ", lng);
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
                <div style={{ textAlign: "start" }}>위도</div>
                <KakaoMap lat={lat} lng={lng} onLatLngChange={handleLatLng} />
            </div>
            <div>
                <PrimaryButton width="100px" content="등록" onClick={handleSubmit} />
            </div>
            {
                user.role == 'COMPANY' &&
                <div>
                    결제 금액: <input type="number" onChange={handleAmount}/>원
                </div>
            }
        </div>
    )
}

export default FeedUploadPage;