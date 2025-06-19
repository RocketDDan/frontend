import ButtonStyle from "./Button.module.css";

/**
 * Primary 버튼 컴포넌트
 * @component
 * @param {String} content 글자
 * @param {String} width 가로 길이
 * @param {Function} onClick 클릭 이벤트
 * @param {Boolean} active 버튼 활성화 여부
 * @param {String} bg primaryBg secondaryBg pinkBg
 * @returns {JSX.Element} button 컴포넌트
 */
const Button = ({ 
  content = "버튼", 
  width = "100%", 
  onClick, 
  active = true,
  bg = "primaryBg",
}) => {
  return (
    <button
      style={{ width: width }}
      className={`${ButtonStyle.container} ${bg}`}
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

export { Button, CustomButton, };
