import searchBarStyle from "./SearchBar.module.css";

import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSearch } from "@fortawesome/free-solid-svg-icons";


const CrewSearchBar = (props) => {
    const [value, setValue] = useState(props.value || "");
    const clearInput = () => setValue("");

    return (
        <label className={searchBarStyle.container} style={{ width: props.width }}>
            <FontAwesomeIcon icon={faSearch} className={searchBarStyle.searchBtn}/>
            <input
                type="text"
                value={props.value}
                onChange={props.onChange} // onChange로 연결
                placeholder={props.placeholder}
                style={{ width: props.width }}
                maxLength={props.maxLength}
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

export { CrewSearchBar };