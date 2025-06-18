import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./LoginPage.module.css";

import { PrimaryButton, CustomButton } from "../../components/base/Button";
import {
	TextInputWithLabel,
	PasswordInputWithLabel,
} from "../../components/base/Input";

import kakaoLogoImage from "../../assets/images/kakao_logo.png";

import { login } from "../../api/auth.api";

const LoginPage = () => {
	const kakaoLoginURL = `${process.env.REACT_APP_API_BASE_URL}/oauth2/authorization/kakao`;

	const navigate = useNavigate();

	const [emailValue, setEmailValue] = useState("");
	const [passwordValue, setPasswordValue] = useState("");
	const [errors, setErrors] = useState({});
	const [isFormValid, setIsFormValid] = useState(false);

	const emailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	const passwordValid = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!#?])[A-Za-z\d@!#?]{8,16}$/.test(password);

	useEffect(() => {
		const isEmailValid = emailValid(emailValue);
		const isPasswordValid = passwordValid(passwordValue);

		setIsFormValid(isEmailValid && isPasswordValid);

		const newErrors = {};
		if (emailValue && !isEmailValid) {
			newErrors.email = "유효한 이메일 주소를 입력해주세요.";
		}
		if (passwordValue && !isPasswordValid) {
			newErrors.password =
				"비밀번호는 영문, 숫자를 포함하여 8~16자여야 합니다.";
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
		} else {
			setErrors({});
		}
	}, [emailValue, passwordValue]);

	const handleEmailChange = (value) => {
		setEmailValue(value);
	};

	const handlePasswordChange = (value) => {
		setPasswordValue(value);
	};

	const handleSubmit = async () => {
		try {
			await login(emailValue, passwordValue);
			navigate("/auth/callback");
		} catch (error) { }
	};

	const handleKakaoLogin = () => {
		window.location.href = kakaoLoginURL;
	};

	return (
		<div className={styles.container}>
			<h1>Runners Hi</h1>
			<div style={{height: "1rem"}}></div>
			<div className={styles.form}>
				<div className={styles.errorContainer}>
					<TextInputWithLabel
						placeholder="이메일"
						label="아이디(이메일)"
						width="100%"
						value={emailValue}
						onChange={handleEmailChange}
					/>
					{errors.email && <div className={styles.error}>{errors.email}</div>}
				</div>

				<div className={styles.errorContainer}>
					<PasswordInputWithLabel
						placeholder="영문, 숫자 포함 8~16자"
						label="비밀번호"
						width="100%"
						value={passwordValue}
						onChange={handlePasswordChange}
						onEnter={handleSubmit}
					/>
					{errors.password && (
						<div className={styles.error}>{errors.password}</div>
					)}
				</div>

				<div className={styles.buttonContainer}>
					<PrimaryButton
						content="로그인"
						onClick={handleSubmit}
						active={isFormValid}
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

export default LoginPage;
