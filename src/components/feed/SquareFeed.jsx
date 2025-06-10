
/**
 * 정사각형 피드
 * @component
 * @param {Object} props 
 * @param {String} props.url
 * @returns {JSX.Element} 정사각형 피드 컴포넌트
 */
const SquareFeed = (props) => {
    const length = '140px';
    return (
        <div style={{ width: length, height: length }}>
            <img src={props.url} alt="피드 대표 이미지 url" width={length} />
        </div>
    )
}

export { SquareFeed };