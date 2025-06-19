import { v7 as uuidv7 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faEyeSlash, faEye, } from "@fortawesome/free-solid-svg-icons";
import style from "./Input.module.css";
import { useState } from "react";

/**
 * Text Input Component
 * @component
 * @param {String} width 가로 길이
 * @param {String} placeholder placeholder
 * @param {String} value value
 * @param {Function} onChange 값이 바뀔 때 이벤트
 * @param {Boolean} disabled 입력 비활성화 여부
 * @param {Boolean} autoFocus autoFocus (기본 포커싱)
 * @param {Boolean} closeBtnVisible 닫기 버튼 여부
 * @param {Boolean} eyeVisible 눈모양 아이콘 여부
 * @returns {JSX.Element} text input 컴퍼넌트
 */
const TextInput = ({
	width = "100%",
	placeholder = "",
	value = "",
	onChange,
	onEnter,
	disabled = false,
	autoFocus = false,
	closeBtnVisible = false,
	eyeVisible = false,
}) => {

	const [visible, setVisible] = useState(!eyeVisible);

	const handleChange = (e) => {
		onChange?.(e.target.value);
	};

	const handleClear = () => {
		onChange?.("");
	};

	const handleEnter = (e) => {
		if (e.key === "Enter") {
			onEnter?.();
		}
	}

	const toggleVisibility = () => {
		setVisible((prev) => !prev);
	};

	return (
		<span className={style.container} style={{ width: width }}>
			<input
				type={visible ? "text" : "password"}
				placeholder={placeholder}
				value={value}
				onChange={handleChange}
				maxLength={50}
				className={style.inputStyle}
				disabled={disabled}
				autoFocus={autoFocus}
				onKeyDown={handleEnter}
			/>
			{value && closeBtnVisible &&

				<FontAwesomeIcon
					icon={faTimes}
					onClick={handleClear}
					className={`${style.iconBtn} ${style.iconClear}`}
				/>
			}
			{value && eyeVisible &&
				<FontAwesomeIcon
					icon={eyeVisible ? faEye : faEyeSlash}
					onClick={toggleVisibility}
					className={`${style.iconBtn} ${style.iconEye}`}
				/>
			}
		</span>
	);
};

/**
 * TextArea With Label Component
 * @component
 * @param {String} placeholder placeholder
 * @param {String} width 가로 길이
 * @param {String} height 세로 길이
 * @param {String} label label
 * @param {String} value value
 * @param {Function} onChange 값이 바뀔 때 이벤트
 * @param {Boolean} closeBtnVisible 닫기 버튼 여부
 * @returns {JSX.Element} textarea 컴퍼넌트
 */
const TextArea = ({
	placeholder = "",
	width = "100%",
	height = '100%',
	value,
	onChange,
	maxLength,
	closeBtnVisible = true,
	onEnter,
}) => {
	const id = uuidv7();

	const handleChange = (e) => {
		onChange?.(e.target.value);
	};

	const handleClear = () => {
		onChange?.("");
	};

	const handleEnter = (e) => {
		if (e.key === "Enter") {
			onEnter?.();
		}
	}

	return (
		<span className={style.container} style={{ width: width, height: height }}>
			<textarea
				id={id}
				placeholder={placeholder}
				value={value}
				onChange={handleChange}
				maxLength={maxLength}
				className={style.textareaStyle}
				onKeyDown={handleEnter}
			/>
			{value && closeBtnVisible && (
				<FontAwesomeIcon
					icon={faTimes}
					onClick={handleClear}
					className={`${style.iconBtn} ${style.iconClear}`}
				/>
			)}
		</span>
	)
}

export { TextInput, TextArea };
