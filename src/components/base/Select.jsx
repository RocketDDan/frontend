import { useState } from 'react';
import selectStyle from './Select.module.css'


/**
 * 셀렉트 박스 컴포넌트
 * @component
 * @param {String} defaultValue 초기 선택값
 * @param {Function} onChange 실행할 함수
 * @param {Array} options 옵션 목록
 * @param {String} options.value 
 * @param {String} options.label 
 * @param {String} width 가로 길이
 * @returns {JSX.Element} select 컴퍼넌트
 */
const BasicSelect = ({ defaultValue, onChange, options = [], width = "100%" }) => {

    const [inValue, setInValue] = useState(defaultValue || "");

    const handleSelect = (val) => {
        setInValue(val);
        onChange?.(val);
    }
    return (
        <select className={selectStyle.container}
            onChange={e => handleSelect(e.target.value)}
            style={{ width: width }}
            value={inValue}>
            {options.map(opt => (
                <option
                    key={opt.value}
                    value={opt.value}
                    style={{ width: width }}>
                    {opt.label}
                </option>
            ))}
        </select>
    );
};

export { BasicSelect };