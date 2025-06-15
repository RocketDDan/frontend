import { useState } from "react";

import styles from "./LoginPage.module.css";

import { PrimaryButton, CustomButton } from "../../components/base/Button";
import {
  TextInputWithLabel,
  PasswordInputWithLabel,
} from "../../components/base/Input";

import kakaoLogoImage from "../../assets/images/kakao_logo.png";

const LoginPage = () => {
  const kakaoLoginURL = `${process.env.REACT_APP_API_BASE_URL}/oauth2/authorization/kakao`;

  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const handleEmailChange = (value) => {
    setEmailValue(value);
  };
  const handlePasswordChange = (value) => {
    setPasswordValue(value);
  };
  const handleKakaoLogin = () => {
    window.location.href = kakaoLoginURL;
  };

  const KakaoLoginButtonText = () => {
    return (
      <div className={styles.kakaoLoginButtonTextContainer}>
        <img
          src={kakaoLogoImage}
          alt="Kakao Logo"
          style={{ width: "1em", height: "1em" }}
        />
        <span>카카오로 계속하기</span>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>로그인</h1>
      <div className={styles.form}>
        <TextInputWithLabel
          placeholder="이메일"
          label="아이디(이메일)"
          width="100%"
          value={emailValue}
          onChange={handleEmailChange}
        />

        <PasswordInputWithLabel
          placeholder="비밀번호"
          label="비밀번호"
          width="100%"
          value={passwordValue}
          onChange={handlePasswordChange}
        />

        <div className={styles.buttonContainer}>
          <PrimaryButton
            content="로그인"
            onClick={() => {
              console.log(
                "아이디, 비밀번호 기반 로그인 기능은 아직 구현되지 않았습니다."
              );
            }}
            active={false}
          />
          <CustomButton
            content={<KakaoLoginButtonText />}
            onClick={handleKakaoLogin}
            bgColor="#FEE502"
            color="#3C1D1D"
          />
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
