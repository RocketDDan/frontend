import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import style from "./SignupPage.module.css";

import { Button } from "../../components/base/Button";
import { TextInput, } from "../../components/base/Input";
import { BasicRadio } from "../../components/base/Radio";
import { ImageAddBlock } from "../../components/image/ImageAddBlock";
import { ProfileImage } from "../../components/profile/ProfileImage";

import { checkNicknameDuplicate, signUp } from "../../api/auth.api";

const SignupPage = () => {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const navigate = useNavigate();
	const imageAddRef = useRef(null);

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
	const passwordValid = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!#?])[A-Za-z\d@!#?]{8,16}$/.test(password);
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
		<div className={style.container}>
			<h1 className={style.title}>회원가입</h1>
			<div className={style.form}>
				<div className={style.profileImageContainer}>
					<ProfileImage
						size="100px"
						profileUrl={profileImageUrl}
						onClick={() => { imageAddRef.current.click() }}
					/>
					<div style={{ display: "none" }}>
						<input
							ref={imageAddRef}
							type="file"
							accept="image/*,video/*"
							multiple
							onChange={handleImageChange}
							style={{ display: 'none' }}
						/>
					</div>
					<div className={style.errorContainer}>
						<label htmlFor="">
							닉네임
						</label>
						<TextInput
							placeholder="2~20자의 한글, 영문, 숫자만 입력."
							width="100%"
							value={signUpFormData.nickname}
							onChange={(value) => handleChange("nickname", value)}
						/>
						{errors.nickname && (
							<div className={style.error}>{errors.nickname}</div>
						)}
						{errors.nicknameCheck && (
							<div className={style.error}>{errors.nicknameCheck}</div>
						)}
					</div>
					<Button
						content="중복 확인"
						width="12rem"
						onClick={handleNicknameCheck}
						active={signUpFormData.nickname}
					/>
				</div>
			</div>

			<div className={style.form}>
				<div className={style.subtitleContainer}>
					<h2>계정 정보</h2>
				</div>
				<div>
					<div className={style.subtitleContainer}>
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

				<div className={style.errorContainer}>
					<label htmlFor="" className={style.labelLeft}>
						아이디(이메일)
					</label>
					<TextInput
						placeholder="이메일"
						width="100%"
						value={signUpFormData.email}
						disabled={true}
					/>
				</div>

				<div className={style.errorContainer}>
					<label htmlFor="">
						비밀번호
					</label>
					<TextInput
						placeholder="영문, 숫자 포함 8~16자"
						width="100%"
						eyeVisible={true}
						value={signUpFormData.password}
						onChange={(value) => handleChange("password", value)}
					/>
					{errors.password && (
						<div className={style.error}>{errors.password}</div>
					)}
				</div>
				<div className={style.errorContainer}>
					<label htmlFor="">
						비밀번호 확인
					</label>
					<TextInput
						placeholder="비밀번호 재입력"
						width="100%"
						eyeVisible={true}
						value={signUpFormData.passwordConfirm}
						onChange={(value) => handleChange("passwordConfirm", value)}
					/>
					{errors.passwordConfirm && (
						<div className={style.error}>{errors.passwordConfirm}</div>
					)}
				</div>
				<div className={style.errorContainer}>
					<label htmlFor="">
						휴대폰 번호
					</label>
					<TextInput
						placeholder="'-'제외 10~11자리 입력"
						width="100%"
						value={signUpFormData.phone}
						onChange={(value) => handleChange("phone", value)}
					/>
					{errors.phone && <div className={style.error}>{errors.phone}</div>}
				</div>
				<Button
					content="회원가입"
					onClick={handleSubmit}
					active={isFormValid}
				/>
			</div>
		</div>
	);
};
export default SignupPage;
