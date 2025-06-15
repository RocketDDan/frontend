import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "./SignupPage.module.css";

import { PrimaryButton } from "../../components/base/Button";
import {
  TextInputWithLabel,
  PasswordInputWithLabel,
} from "../../components/base/Input";
import { BasicRadio } from "../../components/base/Radio";
import { ImageAddBlock } from "../../components/image/ImageAddBlock";
import { LoginMemberProfileImage } from "../../components/profile/ProfileImage";

import { checkNicknameDuplicate, signUp } from "../../api/auth.api";

const SignupPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const [signUpFormData, setSignupFormData] = useState({
    nickname: decodeURIComponent(queryParams.get("nickname") || ""),
    email: queryParams.get("email") || "",
    password: "",
    passwordConfirm: "",
    phone: "",
    isCompany: "no",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);

  useEffect(() => {
    return () => {
      if (profileImageUrl) {
        URL.revokeObjectURL(profileImageUrl);
      }
    };
  }, [profileImageUrl]);

  const handleChange = (key, value) => {
    setSignupFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
    if (key === "nickname") setIsNicknameChecked(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);

    const objectUrl = URL.createObjectURL(file);
    setProfileImageUrl(objectUrl);
  };

  const handleNicknameCheck = async () => {
    try {
      const isDuplicate = await checkNicknameDuplicate(signUpFormData.nickname);
      if (isDuplicate) {
        alert("이미 사용 중인 닉네임입니다.");
      } else {
        alert("사용 가능한 닉네임입니다.");
        setIsNicknameChecked(true);
      }
    } catch (error) {
      alert("닉네임 중복 확인에 실패했습니다. 나중에 다시 시도해주세요.");
    }
  };

  const handleSubmit = async () => {
    const signUpData = {
      email: signUpFormData.email,
      password: signUpFormData.password,
      nickname: signUpFormData.nickname,
      phone: signUpFormData.phone,
      companyMember: signUpFormData.isCompany === "yes" ? true : false,
    };

    await signUp(signUpData, profileImage);
    alert("회원가입이 완료되었습니다!");
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>회원가입</h1>
      <div className={styles.form}>
        <div className={styles.subtitleContainer}>
          <h2>프로필 정보</h2>
        </div>
        <div className={styles.profileImageContainer}>
          <LoginMemberProfileImage
            width="100px"
            height="100px"
            profileUrl={profileImageUrl}
          />
          <div style={{ position: "absolute", bottom: 0, right: 0 }}>
            <ImageAddBlock
              handleFile={handleImageChange}
              width="40px"
              height="40px"
            />
          </div>
        </div>
        <div className={styles.nicknameContainer}>
          <TextInputWithLabel
            placeholder="닉네임"
            label="닉네임"
            width="80%"
            value={signUpFormData.nickname}
            onChange={(value) => handleChange("nickname", value)}
          />
          <PrimaryButton
            content="중복 확인"
            width="20%"
            onClick={handleNicknameCheck}
            active={signUpFormData.nickname}
          />
        </div>
      </div>
      <div className={styles.form}>
        <div className={styles.subtitleContainer}>
          <h2>계정 정보</h2>
        </div>
        <div>
          <div className={styles.subtitleContainer}>
            <span>기업회원 여부</span>
          </div>
          <BasicRadio
            name="isCompany"
            options={[
              { value: "no", name: "아니오" },
              { value: "yes", name: "네" },
            ]}
            value={signUpFormData.isCompany}
            onChange={(value) => handleChange("isCompany", value)}
          />
        </div>

        <TextInputWithLabel
          placeholder="이메일"
          label="아이디(이메일)"
          width="100%"
          value={signUpFormData.email}
          disabled={true}
        />

        <PasswordInputWithLabel
          placeholder="비밀번호"
          label="비밀번호"
          width="100%"
          value={signUpFormData.password}
          onChange={(value) => handleChange("password", value)}
        />
        <PasswordInputWithLabel
          placeholder="비밀번호 확인"
          label="비밀번호 확인"
          width="100%"
          value={signUpFormData.passwordConfirm}
          onChange={(value) => handleChange("passwordConfirm", value)}
        />

        <TextInputWithLabel
          placeholder="휴대폰 번호"
          label="휴대폰 번호"
          width="100%"
          value={signUpFormData.phone}
          onChange={(value) => handleChange("phone", value)}
        />

        <PrimaryButton
          content="회원가입"
          onClick={handleSubmit}
          active={
            signUpFormData.password &&
            signUpFormData.password === signUpFormData.passwordConfirm &&
            signUpFormData.phone &&
            isNicknameChecked
          }
        />
      </div>
    </div>
  );
};
export default SignupPage;
