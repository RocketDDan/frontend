import ButtonStyle from "./Button.module.css";

/**
 * Primary 버튼 컴포넌트
 * @component
 * @param {String} content 글자
 * @param {String} width 가로 길이
 * @param {Function} onClick 클릭 이벤트
 * @param {Boolean} active 버튼 활성화 여부
 * @returns {JSX.Element} button 컴포넌트
 */
const PrimaryButton = ({ content = "버튼", width = "100%", onClick, active = true }) => {
  return (
    <button
      style={{ width: width }}
      className={`${ButtonStyle.container} primaryBg`}
      onClick={onClick}
      disabled={!active}
    >
      {content}
    </button>
  );
};

/**
 * Secondary 버튼 컴포넌트
 * @component
 * @param {String} content 글자
 * @param {String} width 가로 길이
 * @param {Function} onClick 클릭 이벤트
 * @param {Boolean} active 버튼 활성화 여부
 * @returns {JSX.Element} button 컴포넌트
 */
const SecondaryButton = ({ content = "버튼", width = "100%", onClick, active = true }) => {
  return (
    <button
      style={{ width: width }}
      className={`${ButtonStyle.container} secondaryBg`}
      onClick={onClick}
      disabled={!active}
    >
      {content}
    </button>
  );
};

/**
 * Custom 버튼 컴포넌트
 * @component
 * @param {String} content 글자
 * @param {String} width 가로 길이
 * @param {Function} onClick 클릭 이벤트
 * @param {Boolean} active 버튼 활성화 여부
 * @param {String} bgColor 배경색
 * @param {String} color 글자색
 * @returns {JSX.Element} button 컴포넌트
 */
const CustomButton = ({
  content = "버튼",
  width = "100%",
  onClick,
  active = true,
  bgColor = "black",
  color = "white",
}) => {
  return (
    <button
      style={{ width: width, backgroundColor: bgColor, color: color }}
      className={ButtonStyle.container}
      onClick={onClick}
      disabled={!active}
    >
      {content}
    </button>
  );
};

/**
 * Secondary Hover 버튼 컴포넌트
 * @component
 * @param {String} content 글자
 * @param {String} width 가로 길이
 * @param {Function} onClick 클릭 이벤트
 * @param {Boolean} disabled 버튼 비활성화 여부
 * @returns {JSX.Element} button 컴포넌트
 */
const SecondaryHoverButton = ({ content = "버튼", width = '100%', onClick, disabled }) => {
    return (
        <button
            style={{ width: width }}
            className={`${ButtonStyle.container} secondaryBg secondaryHoverBg`}
            onClick={onClick}
            disabled={disabled}
        >
            {content}
        </button>
    )
}

/**
 * pink 버튼 컴포넌트
 * @component
 * @param {String} content 글자
 * @param {String} width 가로 길이
 * @param {Function} onClick 클릭 이벤트
 * @returns {JSX.Element} button 컴포넌트
 */
const ThirdaryButton = ({ content = "버튼", width = '100%', onClick }) => {
    return (
        <button style={{ width: width }}
            className={`${ButtonStyle.container} pinkBg pinkHoverBg`}
            onClick={onClick}>
            {content}
        </button>
    )
}

/**
 * Primary Big 버튼 컴포넌트
 * @component
 * @param {String} content 글자
 * @param {String} width 가로 길이
 * @param {Function} onClick 클릭 이벤트
 * @param {Boolean} active 버튼 활성화 여부
 * @returns {JSX.Element} button 컴포넌트
 */
const PrimaryBigButton = ({ content = "버튼", width = "100%", onClick, active = true }) => {
  return (
    <button
      style={{ width: width }}
      className={`${ButtonStyle.container} ${ButtonStyle.big} primaryBg`}
      onClick={onClick}
      disabled={!active}
    >
      {content}
    </button>
  );
};

/**
 * Secondary Big 버튼 컴포넌트
 * @component
 * @param {String} content 글자
 * @param {String} width 가로 길이
 * @param {Function} onClick 클릭 이벤트
 * @param {Boolean} active 버튼 활성화 여부
 * @returns {JSX.Element} button 컴포넌트
 */
const SecondaryBigButton = ({ content = "버튼", width = "100%", onClick, active = true }) => {
  return (
    <button
      style={{ width: width }}
      className={`${ButtonStyle.container} ${ButtonStyle.big} secondaryBg`}
      onClick={onClick}
      disabled={!active}
    >
      {content}
    </button>
  );
};

export { PrimaryButton, SecondaryButton, CustomButton, SecondaryHoverButton, ThirdaryButton, PrimaryBigButton, SecondaryBigButton };
