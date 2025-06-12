import tableStyle from './Table.module.css';

/**
 * 테이블
 * @component
 * @param {String} width 가로 길이
 * @param {Array} headers 
 * @param {Array} keys
 * @param {Array} data
 * @param {Boolean} headerLine 헤더 아래 선 있는지 여부
 * @param {Boolean} bodyLine 행마다 선 있는지 여부
 * @param {Boolean} bodyLastLine 행마다 선 있는지 여부
 * @returns {JSX.Element} table 컴퍼넌트
 */
const BasicTable = ({ width = '100%', headers = [], keys = [], data = [], headerLine = false, bodyLine = false, bodyLastLine = true }) => {

    return (
        <table style={{ width: width }}>
            <thead>
                <tr className={`${tableStyle.row} ${headerLine ? tableStyle.borderButtom : ""}`}>
                    {headers.map((header, idx) => (
                        <td key={idx} className={`${tableStyle.row}`}>{header}</td>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((d, rowIdx) => {
                    const isLastRow = (rowIdx === data.length - 1);
                    return (
                        <tr key={rowIdx} className={`${tableStyle.row} ${bodyLine && !isLastRow ? tableStyle.borderButtom :
                            bodyLastLine ? tableStyle.borderButtom
                            : ""}`}>
                            {keys.map((key, colIdx) => (
                                <td key={colIdx} className={`${tableStyle.row}`}>{d[key]}</td>
                            ))}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
export { BasicTable };