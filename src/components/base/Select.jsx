import selectStyle from './Select.module.css'


/**
 * 셀렉트 박스 컴포넌트
 * @param {Object} props 
 * @param {String} props.fruit - 초기 선택값 (기본값: 'orange')
 * @param {String} props.onChange - 실행할 함수
 * @param {String} props.options - 옵션 목록
 * @returns JSX.Element
 */
const BasicSelect = ({ value, onChange, options = [] }) => {
    return (
        <select
            className={selectStyle.container}
            value={value}
            onChange={e => onChange(e.target.value)}>
            {options.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
        </select>
    );
};

export { BasicSelect };