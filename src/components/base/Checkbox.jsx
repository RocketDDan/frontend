import checkboxStyle from './Checkbox.module.css';

/**
 * 체크 박스
 * @component
 * @param {Object} props 
 * @param {String} props.content 글자
 * @returns 
 */
const BasicCheckbox = (props) => {
    return (
        <label className={checkboxStyle.container}>
            <input type="checkbox" className={checkboxStyle.checkbox} />
            <span className={checkboxStyle.text}>{props.content || ""}</span>
        </label>
    );
};

export { BasicCheckbox };