import searchBarStyle from "./SearchBar.module.css";

import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSearch } from "@fortawesome/free-solid-svg-icons";


const SearchBar = (props) => {

    const [value, setValue] = useState(props.value || "");
    const handleChange = (e) => setValue(e.target.value);
    const clearInput = () => setValue("");

    return (
        <label className={searchBarStyle.container} style={{ width: props.width }}>
            <FontAwesomeIcon icon={faSearch} className={searchBarStyle.searchBtn}/>
            <input
                type="text"
                placeholder={props.placeholder || ""}
                value={value}
                onChange={handleChange}
                maxLength={50}
            />
            {value && (
                <FontAwesomeIcon
                    icon={faTimes}
                    onClick={clearInput}
                    className={searchBarStyle.closeBtn}
                />
            )}
        </label>
    )
};

export { SearchBar };