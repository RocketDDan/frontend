import { v7 as uuidv7 } from 'uuid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import InputStyle from "./Input.module.css";

/**
 * Text Input Component
 * @param {Object} props 
 * @param {String} props.placeholder placeholder
 * @param {String} props.width width
 * @returns 
 */
const TextInput = (props) => {
    const [value, setValue] = useState(props.value || "");
    const handleChange = (e) => setValue(e.target.value);
    const clearInput = () => setValue("");

    return (
        <span className={InputStyle.container} style={{ width: props.width || "100%" }}>
            <input
                type="text"
                placeholder={props.placeholder || ""}
                value={value}
                onChange={handleChange}
                maxLength={50}
                style={{
                    padding: "0.7rem 0 0.7rem 0.7rem",
                    borderRadius: "8px",
                    border: "solid 1px",
                    width: "100%",
                }}
            />
            {value && (
                <FontAwesomeIcon
                    icon={faTimes}
                    onClick={clearInput}
                    style={{
                        position: "absolute",
                        right: "0.5rem",
                        top: "0.7rem",
                        cursor: "pointer",
                        color: "#999",
                    }}
                />
            )}
        </span>
    )
}

/**
 * Text Input With Label Component
 * @param {Object} props 
 * @param {String} props.placeholder placeholder
 * @param {String} props.width width
 * @returns 
 */
const TextInputWithLabel = (props) => {
    const id = uuidv7();
    const [value, setValue] = useState(props.value || "");

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const clearInput = () => {
        setValue("");
    };

    return (
        <span className={InputStyle.container} style={{ width: props.width || "100%" }}>
            <label htmlFor={id}>{props.label || "label"}</label>
            <input
                id={id}
                type="text"
                placeholder={props.placeholder || ""}
                value={value}
                onChange={handleChange}
                maxLength={50}
                style={{
                    padding: "0.7rem 0 0.7rem 0.7rem",
                    borderRadius: "8px",
                    border: "solid 1px",
                    width: "100%",
                }}
            />
            {value && (
                <FontAwesomeIcon
                    icon={faTimes}
                    onClick={clearInput}
                    style={{
                        position: "absolute",
                        right: "0.5rem",
                        top: "2.2rem",
                        cursor: "pointer",
                        color: "#999",
                    }}
                />
            )}
        </span>
    )
}

/**
 * TextArea With Label Component
 * @param {Object} props 
 * @param {String} props.placeholder placeholder
 * @param {String} props.width width
 * @returns 
 */
const TextAreaWithLabel = (props) => {
    const id = uuidv7();
    const [value, setValue] = useState(props.value || "");

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const clearInput = () => {
        setValue("");
    };

    return (
        <span className={InputStyle.container} style={{ width: props.width || "100%" }}>
            <label htmlFor={id}>{props.label || "label"}</label>
            <textarea
                id={id}
                placeholder={props.placeholder || ""}
                value={value}
                onChange={handleChange}
                style={{
                    padding: "0.7rem 0 0.7rem 0.7rem",
                    borderRadius: "8px",
                    border: "solid 1px",
                    width: "100%",
                }}
            />
            {value && (
                <FontAwesomeIcon
                    icon={faTimes}
                    onClick={clearInput}
                    style={{
                        position: "absolute",
                        right: "0.5rem",
                        top: "2.2rem",
                        cursor: "pointer",
                        color: "#999",
                    }}
                />
            )}
        </span>
    )
}

export { TextInput, TextInputWithLabel, TextAreaWithLabel }