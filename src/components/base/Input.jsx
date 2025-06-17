import { v7 as uuidv7 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import InputStyle from "./Input.module.css";

/**
 * Text Input Component
 * @component
 * @param {String} width 가로 길이
 * @param {String} placeholder placeholder
 * @param {String} value value
 * @param {Boolean} autoFocus autoFocus (기본 포커싱)
 * @param {Function} onChange 값이 바뀔 때 이벤트
 * @param {Boolean} closeBtnVisible 닫기 버튼 여부
 * @param {Boolean} disabled 입력 비활성화 여부
 * @returns {JSX.Element} text input 컴퍼넌트
 */
const TextInput = ({
  width = "100%",
  placeholder = "",
  value = "",
  onChange,
  onEnter,
  closeBtnVisible = true,
  disabled = false,
  autoFocus = false,
}) => {
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
    <span className={InputStyle.container} style={{ width: width }}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        maxLength={50}
        className={InputStyle.inputStyle}
        disabled={disabled}
        autoFocus={autoFocus}
        onKeyDown={handleEnter}
      />
      {value && closeBtnVisible && (
        <FontAwesomeIcon
          icon={faTimes}
          onClick={handleClear}
          style={{
            position: "absolute",
            right: "0.5rem",
            top: "0.7rem",
            cursor: "pointer",
            color: "#999",
          }}
        />
      )}
    </span>
  );
};

/**
 * Text Input With Label Component
 * @component
 * @param {String} placeholder placeholder
 * @param {String} label label
 * @param {String} width 가로 길이
 * @param {String} value value
 * @param {Function} onChange 값이 바뀔 때 이벤트
 * @param {Boolean} closeBtnVisible 닫기 버튼 여부
 * @param {Boolean} disabled 입력 비활성화 여부
 * @returns {JSX.Element} text input 컴퍼넌트
 */
const TextInputWithLabel = ({
  placeholder = "",
  label = "label",
  width = "100%",
  value,
  onChange,
  closeBtnVisible = true,
  disabled = false,
}) => {
  const id = uuidv7();

  const handleChange = (e) => {
    onChange?.(e.target.value);
  };

  const handleClear = () => {
    onChange?.("");
  };

  return (
    <span className={InputStyle.container} style={{ width: width }}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        maxLength={50}
        style={{
          padding: "0.7rem 0 0.7rem 0.7rem",
          borderRadius: "8px",
          border: "solid 1px #999",
          width: "100%",
        }}
        disabled={disabled}
      />
      {value && closeBtnVisible && (
        <FontAwesomeIcon
          icon={faTimes}
          onClick={handleClear}
          style={{
            position: "absolute",
            right: "0.5rem",
            top: "2.3rem",
            cursor: "pointer",
            color: "#999",
          }}
        />
      )}
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
}) => {
  const id = uuidv7();

  const handleChange = (e) => {
    onChange?.(e.target.value);
  };

  const handleClear = () => {
    onChange?.("");
  };

    return (
        <span className={InputStyle.container} style={{ width: width, height: height }}>
            <textarea
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                maxLength={maxLength}
                style={{
                    padding: "0.7rem 0 0.7rem 0.7rem",
                    borderRadius: "8px",
                    border: "solid 1px #999",
                    width: "100%",
                    height: height, // 이 줄을 추가하세요!
                }}
            />
            {value && closeBtnVisible && (
                <FontAwesomeIcon
                    icon={faTimes}
                    onClick={handleClear}
                    style={{
                        position: "absolute",
                        right: "0.5rem",
                        top: "0.7rem",
                        cursor: "pointer",
                        color: "#999",
                    }}
                />
            )}
        </span>
    )
}

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
const TextAreaWithLabel = ({
  placeholder = "",
  width = "100%",
  height = "100%",
  label = "label",
  value,
  onChange,
  closeBtnVisible = true,
}) => {
  const id = uuidv7();
  const handleChange = (e) => {
    onChange?.(e.target.value);
  };

  const handleClear = () => {
    onChange?.("");
  };

  return (
    <span className={InputStyle.container} style={{ width: width, height: height }}>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        style={{
          padding: "0.7rem 0 0.7rem 0.7rem",
          borderRadius: "8px",
          border: "solid 1px",
          width: "100%",
        }}
      />
      {value && closeBtnVisible && (
        <FontAwesomeIcon
          icon={faTimes}
          onClick={handleClear}
          style={{
            position: "absolute",
            right: "0.5rem",
            top: "2.2rem",
            cursor: "pointer",
            color: "#999",
          }}
        />
      )}
    </span>
  );
};

/**
 * Password Input With Label Component
 * @component
 * @param {String} placeholder placeholder
 * @param {String} label label
 * @param {String} width 가로 길이
 * @param {String} value value
 * @param {Function} onChange 값이 바뀔 때 이벤트
 * @param {Boolean} showPasswordBtnVisible 닫기 버튼 여부
 * @returns {JSX.Element} password input 컴퍼넌트
 */
const PasswordInputWithLabel = ({
  placeholder = "영문, 숫자 포함 8~16자를 입력해주세요.",
  label = "비밀번호",
  width = "100%",
  value,
  onChange,
  showPasswordBtnVisible = true,
}) => {
  const id = uuidv7();
  const [visible, setVisible] = useState(false);

  const handleChange = (e) => {
    onChange?.(e.target.value);
  };

  const toggleVisibility = () => {
    setVisible((prev) => !prev);
  };

  return (
    <span className={InputStyle.container} style={{ width: width }}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        maxLength={50}
        style={{
          padding: "0.7rem 0 0.7rem 0.7rem",
          borderRadius: "8px",
          border: "solid 1px #999",
          width: "100%",
        }}
      />
      {value && showPasswordBtnVisible && (
        <FontAwesomeIcon
          icon={visible ? faEye : faEyeSlash}
          onClick={toggleVisibility}
          style={{
            position: "absolute",
            right: "0.5rem",
            top: "2.3rem",
            cursor: "pointer",
            color: "#999",
          }}
        />
      )}
    </span>
  );
};

export { TextInput, TextInputWithLabel, TextArea, TextAreaWithLabel, PasswordInputWithLabel };
