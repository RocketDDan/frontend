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
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const nicknameValid = (nickname) => /^[a-zA-Z0-9가-힣]{2,20}$/.test(nickname);
  const passwordValid = (password) =>
    /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/.test(password);
  const passwordConfirmValid = (password, passwordConfirm) =>
    password === passwordConfirm;
  const phoneValid = (phone) => /^\d{10,11}$/.test(phone);

  useEffect(() => {
    const isNicknameValid = nicknameValid(signUpFormData.nickname);
    const isPasswordValid = passwordValid(signUpFormData.password);
    const isPasswordConfirmValid = passwordConfirmValid(
      signUpFormData.password,
      signUpFormData.passwordConfirm
    );
    const isPhoneValid = phoneValid(signUpFormData.phone);

    setIsFormValid(
      isNicknameValid &&
        isPasswordValid &&
        isPasswordConfirmValid &&
        isPhoneValid &&
        isNicknameChecked
    );

    const newErrors = {};
    if (!isNicknameValid) {
      newErrors.nickname =
        "닉네임은 한글, 영어, 숫자만 포함한 2~20자여야 합니다.";
    }
    if (!isPasswordValid) {
      newErrors.password = "비밀번호는 영어와 숫자를 포함한 8~16자여야 합니다.";
    }
    if (!isPasswordConfirmValid) {
      newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
    }
    if (!isPhoneValid) {
      newErrors.phone = "휴대폰 번호는 '-' 없이 10~11자리 숫자여야 합니다.";
    }
    if (!isNicknameChecked) {
      newErrors.nicknameCheck = "닉네임 중복 확인을 해주세요.";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
    }
  }, [signUpFormData, isNicknameChecked]);

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
          <div className={styles.errorContainer}>
            <TextInputWithLabel
              placeholder="2~20자의 한글, 영문, 숫자만 입력."
              label="닉네임"
              width="100%"
              value={signUpFormData.nickname}
              onChange={(value) => handleChange("nickname", value)}
            />
            {errors.nickname && (
              <div className={styles.error}>{errors.nickname}</div>
            )}
            {errors.nicknameCheck && (
              <div className={styles.error}>{errors.nicknameCheck}</div>
            )}
          </div>
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

        <div className={styles.errorContainer}>
          <PasswordInputWithLabel
            placeholder="영문, 숫자 포함 8~16자"
            label="비밀번호"
            width="100%"
            value={signUpFormData.password}
            onChange={(value) => handleChange("password", value)}
          />
          {errors.password && (
            <div className={styles.error}>{errors.password}</div>
          )}
        </div>
        <div className={styles.errorContainer}>
          <PasswordInputWithLabel
            placeholder="비밀번호 재입력"
            label="비밀번호 확인"
            width="100%"
            value={signUpFormData.passwordConfirm}
            onChange={(value) => handleChange("passwordConfirm", value)}
          />
          {errors.passwordConfirm && (
            <div className={styles.error}>{errors.passwordConfirm}</div>
          )}
        </div>
        <div className={styles.errorContainer}>
          <TextInputWithLabel
            placeholder="'-'제외 10~11자리 입력"
            label="휴대폰 번호"
            width="100%"
            value={signUpFormData.phone}
            onChange={(value) => handleChange("phone", value)}
          />
          {errors.phone && <div className={styles.error}>{errors.phone}</div>}
        </div>
        <PrimaryButton
          content="회원가입"
          onClick={handleSubmit}
          active={isFormValid}
        />
      </div>
    </div>
  );
};
export default SignupPage;
