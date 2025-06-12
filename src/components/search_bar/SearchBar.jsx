import searchBarStyle from "./SearchBar.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSearch } from "@fortawesome/free-solid-svg-icons";

/**
 * @component
 * @param {String} placeholder placeholder
 * @param {String} value value
 * @param {String} width 가로 길이
 * @param {Function} onChange 변화 이벤트
 * @param {Boolean} closeBtnVisible 닫기 버튼 여부
 * @returns {JSX.Element} search bar 컴퍼넌트
 */
const SearchBar = ({
    placeholder = "",
    value,
    width = "100%",
    onChange,
    closeBtnVisible = true,
}) => {

    const handleChange = (e) => {
        onChange?.(e.target.value);
    };

    const handleClear = () => {
        onChange?.("");
    };

    return (
        <label className={searchBarStyle.container} style={{ width: width }}>
            <FontAwesomeIcon icon={faSearch} className={searchBarStyle.searchBtn} />
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                maxLength={50}
            />
            {value && closeBtnVisible && (
                <FontAwesomeIcon
                    icon={faTimes}
                    onClick={handleClear}
                    className={searchBarStyle.closeBtn}
                />
            )}
        </label>
    )
};

export { SearchBar };