import { useParams, useNavigate } from 'react-router-dom';
import styles from './CrewUpdatePage.module.css';
import { useEffect, useState, useRef } from 'react';
import { fetchCrew, updateCrew } from "../../api/crew.api";
import { TextArea, TextInput } from '../../components/base/Input';
import { Button, SecondaryHoverButton } from '../../components/base/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCamera } from '@fortawesome/free-solid-svg-icons';
import RegionSelector from '../../components/base/RegionSelector';
import { checkDuplicateCrewName, createCrew } from '../../api/crew.api';


const CrewUpdatePage = () => {
    const {crewId} = useParams(); 
    const [crewName, setCrewName] = useState("");
    const [crewImage, setCrewImage] = useState(null);
    const [crewImageFile, setCrewImageFile] = useState(null);
    const [region, setRegion] = useState("");
    const [address, setAddress] = useState("");
    const [introduction, setIntroduction] = useState("");
    const [isDuplicateChecked, setIsDuplicateChecked] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const fileInputRef = useRef(null);
    const crewImageFileRef = useRef(null); // 추가
    const navigate = useNavigate();

    const onClickDuplicateCheck = () => {
        checkDuplicateCrewName(crewName)
            .then((response) => {
                if (response.data) {
                    alert("이미 사용 중인 크루명입니다.");
                    setIsDuplicateChecked(false);
                } else {
                    alert("사용 가능한 크루명입니다.");
                    setIsDuplicateChecked(true);
                }
            });
    };

    // 원형 이미지 클릭 시 파일 선택창 열기
    const handleCircleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // 파일 선택 시 미리보기
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            crewImageFileRef.current = file; // ref에 저장
            setCrewImageFile(file); // (미리보기용)
            const reader = new FileReader();
            reader.onloadend = () => {
                setCrewImage(reader.result);
            };
            reader.readAsDataURL(file);
            e.target.value = ''; // 같은 파일 연속 선택 가능
        }
    };

    // 필드 변경 시 중복확인 다시 하도록
    const handleCrewNameChange = (val) => {
        setCrewName(val);
        setIsDuplicateChecked(false);
    };

    const onClickSubmit = async () => {
        const crew = {
            crewName: crewName,
            crewIntroduce: introduction,
            crewRegion: region,
            crewAddress: address,
            profilePath: crewImage
        };
        // ref에서 파일 꺼내서 전달
        await updateCrew(crewId, crew, crewImageFileRef.current);
        navigate(`/crew/${crewId}`);
    };

    useEffect(() => {
        setIsFormValid(
            crewName?.length > 0 &&
            region?.length > 0 &&
            address?.length > 0 &&
            introduction?.length > 0 &&
            isDuplicateChecked
        );
    }
    , [crewName, region, address, introduction, isDuplicateChecked]);

    useEffect(() => {
        fetchCrew(crewId).then(data => {
            setCrewName(data.crewName);
            setCrewImage(data.profilePath);
            setRegion(data.crewRegion);
            setAddress(data.crewAddress);
            setIntroduction(data.introduce);
            setIsDuplicateChecked(true); // 이미 크루 정보가 있으므로 중복확인 필요 없음
            setIsFormValid(true); // 이미 크루 정보가 있으므로 폼 유효성 검사 통과
        });
    }, []);


    return (
        <div className={styles.wrapper}>
            <div style={{ margin: "32px 0" }}>
                <label className={styles.label}>이미지</label>
                <div
                    onClick={handleCircleClick}
                    className={styles.circleImage}
                >
                    {crewImage ? (
                        <img
                            src={crewImage}
                            alt="crew"
                            className={styles.circleImgTag}
                        />
                    ) : (
                        <FontAwesomeIcon icon={faCamera} className={styles.imageIcon}/>
                    )}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                    />
                </div>
            </div>
            <div className={styles.mb16}>
                <label className={styles.label}>크루명 (50자 이내)</label>
                <div className={styles.rowFlex}>
                    <TextInput
                        width="100%"
                        placeholder="크루명을 입력해주세요."
                        value={crewName}
                        onChange={handleCrewNameChange}
                    />
                    <Button
                        content="중복확인"
                        width="110px"
                        className={styles.duplicateCheckButton}
                        onClick={onClickDuplicateCheck}
                        bg="secondaryBg"
                    />
                </div>
                {!(crewName?.length > 0) && (
                    <p className={styles.errorText}>필수 입력 항목입니다.</p>
                )}
                {crewName?.length > 0 && (!isDuplicateChecked) && (
                    <p className={styles.errorText}>크루명 중복확인을 해주세요.</p>
                )}
            </div>
            <div className={styles.mb16}>
                <label className={styles.label}>활동 지역 (50자 이내)</label>
                <div className={styles.rowFlex}>
                    <div className={styles.modalWrapper}>
                        <RegionSelector region={region} setRegion={setRegion} />
                    </div>
                    <TextInput
                        width="100%"
                        placeholder="상세 주소"
                        value={address}
                        onChange={setAddress}
                    />
                </div>
                {region && !(region.length > 0) || address && !(address.length > 0) && (
                    <p className={styles.errorText}>필수 입력 항목입니다.</p>
                )}
            </div>
            <div className={styles.mb16}>
                <label className={styles.label}>소개글 (255자 이내)</label>
                <TextArea
                    placeholder="소개글을 입력해주세요"
                    value={introduction}
                    onChange={setIntroduction}
                    width="100%"
                    height="100px"
                    maxLength={255}
                />
                {!(introduction?.length > 0) && (
                    <p className={styles.errorText}>필수 입력 항목입니다.</p>
                )}
            </div>
            <Button
                content="크루 수정"
                width="100%" 
                onClick={onClickSubmit}
                disabled={!isFormValid}
                bg="secondaryBg"
            />
        </div>
    );
}
export default CrewUpdatePage;