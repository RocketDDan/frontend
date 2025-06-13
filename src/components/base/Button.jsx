import ButtonStyle from "./Button.module.css"
import CommonStyle from "../../Common.module.css"

/**
 * Primary 버튼 컴포넌트
 * @component
 * @param {String} content 글자
 * @param {String} width 가로 길이
 * @param {Function} onClick 클릭 이벤트
 * @returns {JSX.Element} button 컴포넌트
 */
const PrimaryButton = ({ content = "버튼", width = '100%', onClick }) => {
    return (
        <button style={{ width: width }}
            className={`${ButtonStyle.container} ${CommonStyle.primaryBg}`}
            onClick={onClick}>
            {content}
        </button>
    )
}


/**
 * Secondary 버튼 컴포넌트
 * @component
 * @param {String} content 글자
 * @param {String} width 가로 길이
 * @param {Function} onClick 클릭 이벤트
 * @returns {JSX.Element} button 컴포넌트
 */
const SecondaryButton = ({ content = "버튼", width = '100%', onClick }) => {
    return (
        <button style={{ width: width }}
            className={`${ButtonStyle.container} ${CommonStyle.secondaryBg}`}
            onClick={onClick}>
            {content}
        </button>
    )
}

/**
 * Secondary Hover 버튼 컴포넌트
 * @component
 * @param {String} content 글자
 * @param {String} width 가로 길이
 * @param {Function} onClick 클릭 이벤트
 * @returns {JSX.Element} button 컴포넌트
 */
const SecondaryHoverButton = ({ content = "버튼", width = '100%', onClick }) => {
    return (
        <button
            style={{ width: width }}
            className={`${ButtonStyle.container} ${CommonStyle.secondaryBg} ${CommonStyle.secondaryHoverBg}`}
            onClick={onClick}
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
            className={`${ButtonStyle.container} ${CommonStyle.pinkBg} ${CommonStyle.pinkHoverBg}`}
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
 * @returns {JSX.Element} button 컴포넌트
 */
const PrimaryBigButton = ({ content = "버튼", width = '100%', onClick }) => {
    return (
        <button style={{ width: width }}
            className={`${ButtonStyle.container} ${ButtonStyle.big} ${CommonStyle.primaryBg}`}
            onClick={onClick}>
            {content}
        </button>
    )
}

/**
 * Secondary Big 버튼 컴포넌트
 * @component
 * @param {String} content 글자
 * @param {String} width 가로 길이
 * @returns {JSX.Element} button 컴포넌트
 */
const SecondaryBigButton = ({ content = "버튼", width = "100%", onClick }) => {
    return (
        <button style={{ width: width }}
            className={`${ButtonStyle.container} ${ButtonStyle.big} ${CommonStyle.secondaryBg}`}
            onClick={onClick}>
            {content}
        </button>
    )
}

export { PrimaryButton, SecondaryButton, SecondaryHoverButton, ThirdaryButton, PrimaryBigButton, SecondaryBigButton };