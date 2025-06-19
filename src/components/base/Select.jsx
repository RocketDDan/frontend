import { useState } from 'react';
import selectStyle from './Select.module.css'
import Select from 'react-select';

/**
 * 셀렉트 박스 컴포넌트
 * @component
 * @param {String} value 초기 선택값
 * @param {Function} onChange 실행할 함수
 * @param {Array} options 옵션 목록
 * @param {String} options.value 
 * @param {String} options.label 
 * @param {String} width 가로 길이
 * @returns {JSX.Element} select 컴퍼넌트
 */
const BasicSelect = ({
    value,
    onChange,
    options = [],
    width = "100%"
}) => {

    return (
        <div style={{ width }}>
            <Select
                value={options.find(opt => opt.value === value)}
                onChange={(selected) => onChange?.(selected.value)}
                options={options}
                styles={{
                    container: (base) => ({
                        ...base,
                        width: width, // ✅ 명시적으로 container에 width 적용
                    }),
                    control: (base, state) => ({
                        ...base,
                        borderRadius: '8px',
                        borderColor: '#ccc',
                        boxShadow: 'none',
                        '&:hover': { borderColor: '#888' },
                        minHeight: '40px', // 필요시 높이 조정
                    }),
                    menu: (base) => ({
                        ...base,
                        zIndex: 9999, // 드롭다운이 다른 요소 위에 나오게
                    }),
                }}
            />
        </div>
    );
};

export { BasicSelect };