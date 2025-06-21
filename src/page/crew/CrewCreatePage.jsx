import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextArea, TextInput } from "../../components/base/Input";
import RegionSelector from "../../components/base/RegionSelector";
import styles from "./CrewCreatePage.module.css";
import { Button } from "../../components/base/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { checkDuplicateCrewName, createCrew } from "../../api/crew.api";

const CrewCreatePage = () => {
    const [crewName, setCrewName] = useState("");
    const [crewImage, setCrewImage] = useState(null);
    const [region, setRegion] = useState("");
    const [address, setAddress] = useState("");
    const [introduction, setIntroduction] = useState("");
    const [isDuplicateChecked, setIsDuplicateChecked] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const fileInputRef = useRef(null);
    const crewImageFileRef = useRef(null);
    const navigate = useNavigate();

    const onClickDuplicateCheck = () => {
        try {
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
        } catch (error) {

        }

    };

    // 원형 이미지 클릭 시 파일 선택창 열기
    const handleCircleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // 파일 선택 시 미리보기
    const handleImageChange = (e) => {
        // console.log("파일 변경");
        const file = e.target.files[0];
        if (file) {
            crewImageFileRef.current = file; // ref에 저장
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
        try {
            const crew = {
                crewName,
                crewIntroduce: introduction,
                crewRegion: region,
                crewAddress: address,
            };
            // console.log("크루 정보:", crew);
            // console.log("크루 이미지 파일:", crewImageFileRef.current);
            // ref에서 파일 꺼내서 전달
            const crewId = await createCrew(crew, crewImageFileRef.current);
            navigate(`/crew/${crewId}`);
        }
        catch (error) {
        }

    };

    useEffect(() => {
        setIsFormValid(
            crewName.length > 0 &&
            region.length > 0 &&
            address.length > 0 &&
            introduction.length > 0 &&
            isDuplicateChecked
        );
    }
        , [crewName, region, address, introduction, isDuplicateChecked]);

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
                        <FontAwesomeIcon icon={faCamera} className={styles.imageIcon} />
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
                        width="130px"
                        onClick={onClickDuplicateCheck}
                    />
                </div>
                {!(crewName.length > 0) && (
                    <p className={styles.errorText}>필수 입력 항목입니다.</p>
                )}
                {crewName.length > 0 && (!isDuplicateChecked) && (
                    <p className={styles.errorText}>크루명 중복확인을 해주세요.</p>
                )}
            </div>
            <div className={styles.mb16}>
                <label className={styles.label}>활동 지역 (50자 이내)</label>
                <div className={styles.rowFlex}>
                    <RegionSelector region={region} setRegion={setRegion} />
                    <TextInput
                        width="100%"
                        placeholder="상세 주소"
                        value={address}
                        onChange={setAddress}
                    />
                </div>
                {(region.length === 0 || address.length === 0)
                    && (
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
                {!(introduction.length > 0) && (
                    <p className={styles.errorText}>필수 입력 항목입니다.</p>
                )}
            </div>
            <Button
                content="크루 생성"
                width="100%"
                onClick={onClickSubmit}
                disabled={!isFormValid}
                bg="secondaryBg"
            />
        </div>
    );
};

export default CrewCreatePage;