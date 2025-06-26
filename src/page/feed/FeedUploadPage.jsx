// style
import style from "./FeedUploadPage.module.css";
import Swal from "sweetalert2";
// react
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v7 as uuid7 } from "uuid";
// api
import { uploadFeed, uploadFeedByCompany } from "../../api/feed/feed.api";
// component
import { Button } from '../../components/base/Button'
import KakaoMap from "../../components/map/KakaoMap";
import { TextArea } from '../../components/base/Input';
import { ImageBlock } from "../../components/image/ImageBlock";
import { ImageAddBlock } from "../../components/image/ImageAddBlock";
// store
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
        if (user == null) {
            Swal.fire({
                icon: 'error',
                title: '로그인이 만료되었습니다.',
                text: '다시 로그인 해주세요.',
                confirmButtonText: '확인',
            }).then(() => {
                navigate("/login");
            });
            return;
        }
        if (user.role === 'USER' || user.role === 'ADMIN') {
            uploadPersonalFeed();
        } else if (user.role === 'COMPANY') {
            uploadAdvertiseFeed();
        }
    }

    // 일반 피드 올리기
    const uploadPersonalFeed = () => {
        uploadFeed(content, lat, lng, fileList.map(file => file.file))
            .then((data) => {
                Swal.fire({
                    icon: 'success',
                    title: '업로드 완료!',
                    text: '피드가 성공적으로 등록되었습니다.',
                    timer: 1500,
                    showConfirmButton: false,
                }).then((res) => {
                    // 업로드 후 피드 목록으로 이동
                    // navigate("/feed/list");
                    navigate(`/runner/${user.memberId}`);
                });
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
                const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                const redirectUrl = isMobile ? data.next_redirect_mobile_url : data.next_redirect_pc_url;
                // window.location.href = data.next_redirect_pc_url; // [발표용] 웹에서 모바일 화면으로 테스트할 때 이거 써야함
                window.location.href = redirectUrl; // [배포용] 실제 배포 환경에선 이렇게 해야 함 (모바일과 웹 뷰 다름)
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
    }

    return (
        <div className={style.container}>
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
                <div style={{ textAlign: "start", marginBottom: "5px", }}>위치 검색</div>
                <KakaoMap
                    lat={lat}
                    lng={lng}
                    width="100%"
                    height="300px"
                    rounded={true}
                    onLatLngChange={handleLatLng} />
            </div>

            <div>
                <div style={{ textAlign: "start", marginBottom: "5px", }}>내용</div>
                <TextArea
                    width="100%"
                    maxHeight="100px"
                    maxLength={1000}
                    value={content}
                    closeBtnVisible={false}
                    onChange={handleContent} />
            </div>

            {
                user && user.role === 'COMPANY' &&
                <div>
                    결제 금액: <input type="number" onChange={handleAmount} />원
                </div>
            }

            <div>
                <Button width="100px" content="등록" onClick={handleSubmit} />
            </div>
        </div>
    )
}

export default FeedUploadPage;