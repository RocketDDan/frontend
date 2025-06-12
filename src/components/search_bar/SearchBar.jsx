import searchBarStyle from "./SearchBar.module.css";

import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSearch } from "@fortawesome/free-solid-svg-icons";

/**
 * 
 * @param {String} placeholder placeholder
 * @param {String} defaultValue 기본 값
 * @param {String} width 가로 길이
 * @param {Function} onChange 가로 길이
 * @returns {JSX.Element} search bar 컴퍼넌트
 */
const SearchBar = ({ placeholder = "", defaultValue, width = "100%", onChange }) => {

    const [inValue, setInValue] = useState(defaultValue || "");

    const handleChange = (val) => {
        setInValue(val);
        onChange?.(val);
    }

    return (
        <label className={searchBarStyle.container} style={{ width: width }}>
            <FontAwesomeIcon icon={faSearch} className={searchBarStyle.searchBtn} />
            <input
                type="text"
                placeholder={placeholder}
                value={inValue}
                onChange={(e) => { handleChange(e.target.value) }}
                maxLength={50}
            />
            {inValue && (
                <FontAwesomeIcon
                    icon={faTimes}
                    onClick={() => { handleChange("") }}
                    className={searchBarStyle.closeBtn}
                />
            )}
        </label>
    )
};

export { SearchBar };