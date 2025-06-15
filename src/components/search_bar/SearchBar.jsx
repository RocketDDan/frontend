import searchBarStyle from "./SearchBar.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSearch } from "@fortawesome/free-solid-svg-icons";

/**
 * @component
 * @param {String} placeholder placeholder
 * @param {String} value value
 * @param {String} width 가로 길이
 * @param {Function} onChange 변화 이벤트
 * @param {Function} onEnter 엔터 이벤트
 * @param {Boolean} closeBtnVisible 닫기 버튼 여부
 * @returns {JSX.Element} search bar 컴퍼넌트
 */
const SearchBar = ({
    placeholder = "",
    value,
    width = "100%",
    onChange,
    onEnter,
    closeBtnVisible = true,
}) => {
    // 값 바뀜 감지
    const handleChange = (e) => {
        onChange?.(e.target.value);
    };
    // X 버튼 클릭 감지
    const handleClear = () => {
        onChange?.("");
    }
    // 엔터 감지
    const handleEnter = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            onEnter?.(e);
        }
    }

    return (
        <label className={searchBarStyle.container} style={{ width: width }}>
            <FontAwesomeIcon icon={faSearch} className={searchBarStyle.searchBtn} />
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                onKeyDown={handleEnter}
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