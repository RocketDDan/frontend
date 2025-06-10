import radioStyle from './Radio.module.css';

/**
 * 라디오 버튼 컴포넌트
 * @component
 * @param {Object} props 
 * @param {String} props.name - 라디오 그룹 이름
 * @param {String} props.value - 값
 * @param {String} props.content - 라벨에 표시될 내용
 * @param {Boolean} props.defaultChecked - 초기 체크 여부
 * @returns JSX.Element
 */
const BasicRadio = (props) => {
    return (
        <label className={radioStyle.container}>
            <input
                type="radio"
                name={props.name}
                value={props.value}
                defaultChecked={props.defaultChecked}
                className={radioStyle.radio}
            />
            <span className={radioStyle.labelText}>{props.content}</span>
        </label>
    );
};

export { BasicRadio };