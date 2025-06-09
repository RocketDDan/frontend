import { v7 as uuidv7 } from 'uuid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';

const TextInput = (props) => {
    const [value, setValue] = useState(props.value || "");
    const handleChange = (e) => {
        setValue(e.target.value);
    };
    const clearInput = () => {
        setValue("");
    };

    return (
        <span style={{
            textAlign: "start",
            display: "flex",
            flexDirection: "column",
            gap: "0.3rem",
            width: props.width || "100%",
            position: "relative",
        }}>
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
                        right: "10px",
                        top: "0.7rem",
                        cursor: "pointer",
                        color: "#999",
                    }}
                />
            )}
        </span>
    )
}

const TextInputWithLabels = (props) => {
    const id = uuidv7();
    const [value, setValue] = useState(props.value || "");

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const clearInput = () => {
        setValue("");
    };

    return (
        <span
            style={{
                textAlign: "start",
                display: "flex",
                flexDirection: "column",
                gap: "0.3rem",
                width: props.width || "100%",
                position: "relative",
            }}
        >
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
                        right: "10px",
                        top: "2.2rem",
                        cursor: "pointer",
                        color: "#999",
                    }}
                />
            )}
        </span>
    )
}

export { TextInput, TextInputWithLabels }