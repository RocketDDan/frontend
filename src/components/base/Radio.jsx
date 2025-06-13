import { useState } from 'react';
import style from './Radio.module.css';

/**
 * 라디오 버튼 컴포넌트
 * @component
 * @param {Array} options - 값 목록
 * @param {String} options.value - 값
 * @param {String} options.name - 이름
 * @param {String} name - name
 * @param {String} value - 기본 값
 * @param {Function} onChange - 변경될 때 이벤트
 * @returns {JSX.Element} radio 컴퍼넌트
 */
const BasicRadio = ({ options = [], name, value, onChange }) => {

    const [inValue, setInValue] = useState(value);

    const handleChange = (value) => {
        setInValue(value);
        onChange?.(value);  // 선택된 value를 부모로 전달
    };

    return (

        options.map(opt => {
            return (
                <label className={style.container} key={opt.value}>
                    <input
                        type="radio"
                        name={name}
                        value={opt.value}
                        checked={opt.value === inValue}
                        onChange={(e) => { handleChange(e.target.value) }}
                        className={style.radio}
                    />
                    <span className={style.labelText}>{opt.name}</span>
                </label>
            )
        })

    );
};

export { BasicRadio };