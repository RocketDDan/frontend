import ButtonStyle from "./Button.module.css"
import CommonStyle from "../../Common.module.css"

/**
 * Primary 버튼 컴포넌트
 * @component
 * @param {Object} props
 * @param {String} props.content 버튼 내 글자
 * @param {String} props.width 버튼 가로 길이
 * @returns {JSX.Element} 프로필 이미지 컴포넌트
 */
const PrimaryButton = (props) => {
    return (
        <button style={{ width: props.width || '100%' }} className={`${ButtonStyle.container} ${CommonStyle.primaryBg}`}>
            {props.content || "버튼"}
        </button>
    )
}


/**
 * Secondary 버튼 컴포넌트
 * @component
 * @param {Object} props
 * @param {String} props.content 버튼 내 글자
 * @param {String} props.width 버튼 가로 길이
 * @returns {JSX.Element} 프로필 이미지 컴포넌트
 */
const SecondaryButton = (props) => {
    return (
        <button style={{ width: props.width || '100%' }} className={`${ButtonStyle.container} ${CommonStyle.secondaryBg}`} >
            {props.content || "버튼"}
        </button>
    )
}

/**
 * Primary Big 버튼 컴포넌트
 * @component
 * @param {Object} props
 * @param {String} props.content 버튼 내 글자
 * @param {String} props.width 버튼 가로 길이
 * @returns {JSX.Element} 프로필 이미지 컴포넌트
 */
const PrimaryBigButton = (props) => {
    return (
        <button style={{ width: props.width || '100%' }} className={`${ButtonStyle.container} ${ButtonStyle.big} ${CommonStyle.primaryBg}`}>
            {props.content || "버튼"}
        </button>
    )
}

/**
 * Secondary Big 버튼 컴포넌트
 * @component
 * @param {Object} props
 * @param {String} props.content 버튼 내 글자
 * @param {String} props.width 버튼 가로 길이
 * @returns {JSX.Element} 프로필 이미지 컴포넌트
 */
const SecondaryBigButton = (props) => {
    return (
        <button style={{ width: props.width || '100%' }} className={`${ButtonStyle.container} ${ButtonStyle.big} ${CommonStyle.secondaryBg}`}>
            {props.content || "버튼"}
        </button>
    )
}

export { PrimaryButton, SecondaryButton, PrimaryBigButton, SecondaryBigButton };