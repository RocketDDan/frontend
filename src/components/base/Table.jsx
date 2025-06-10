import tableStyle from './Table.module.css';

/**
 * 테이블
 * @component
 * @param {Object} props 
 * @param {String} props.width 가로 길이
 * @param {String} props.headers 
 * @param {String} props.keys
 * @param {String} props.data
 * @returns 
 */
const BasicTable = (props) => {

    const headers = props.headers;
    const keys = props.keys;
    const data = props.data;

    return (
        <table style={{ width: props.width || '100%', }}>
            <tr className={tableStyle.row}>
                {headers.map((header, idx) => (
                    <td key={idx} className={tableStyle.row}>{header}</td>
                ))}
            </tr>
            {data.map((d, rowIdx) => (
                <tr key={rowIdx} className={tableStyle.row}>
                    {keys.map((key, colIdx) => (
                        <td key={colIdx} className={tableStyle.row}>{d[key]}</td>
                    ))}
                </tr>
            ))}
        </table>
    )
}
export { BasicTable };