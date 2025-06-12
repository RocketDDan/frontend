import checkboxStyle from './Checkbox.module.css';

/**
 * 기본 체크 박스
 * @component
 * @param {String} content 글자 (안쓰면 없음)
 * @param {Function} onClick 클릭했을 때 이벤트
 * @returns {JSX.Element} checkbox 컴퍼넌트
 */
const BasicCheckbox = ({ content = "", onClick }) => {

    const handleChange = (val) => {
        onClick?.(val);
    }
    return (
        <label className={checkboxStyle.container}>
            <input type="checkbox"
                className={checkboxStyle.checkbox}
                onChange={(e) => { handleChange(e.target.checked) }} />
            <span className={checkboxStyle.text}>
                {content}
            </span>
        </label>
    );
};

export { BasicCheckbox };