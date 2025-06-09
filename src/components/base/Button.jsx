
// Parameter: content
const PrimaryButton = (props) => {
    return (
        <button style={{
            textAlign: "center",
            background: "blue",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
        }}>
            {props.content || "버튼"}
        </button>
    )
}

export { PrimaryButton };