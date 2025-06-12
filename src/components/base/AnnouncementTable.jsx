import AcTableStyle from "./AnnouncementTable.module.css"
import { useState, useEffect } from "react";
import axios from "axios";

const TableHeader = ({headers}) => (
    <thead>
        <tr>
            {headers.map((h, i) => (
                <th
                    key={i}
                    className={h === "제목" ? AcTableStyle.wideColumn : AcTableStyle.th}>
                    {h}
                </th>
            ))}
        </tr>
    </thead>
);


const TableBody = ({ data, keys }) => (
    <tbody>
        {data.map((row, rowIdx) => (
            <tr key={rowIdx} className={AcTableStyle.tr}>
                <td className={AcTableStyle.td}>{rowIdx + 1}</td>
                {keys.map((key, colIdx) => (
                    <td
                        key={colIdx}
                        className={
                            key === 'role'
                                ? AcTableStyle.role
                                : key === 'title'
                                    ? `${AcTableStyle.td} ${AcTableStyle.wideColumn}` 
                                    : AcTableStyle.td
                        }
                    >
                        {row[key]}
                    </td>
                ))}
            </tr>
        ))}
    </tbody>
);


const CustomTable = ({headers, keys, data}) => (
    <table className={AcTableStyle.table}>
        <TableHeader headers={headers}/>
        <TableBody data={data} keys={keys}/>
    </table>
);

const TableView = ({url, headers, keys}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fullUrl = `${process.env.REACT_APP_API_BASE_URL}${url}`;
        console.log("호출 URL:", fullUrl);
        if (!url) return;
        axios
            .get(`${process.env.REACT_APP_API_BASE_URL}${url}`)
            .then((res) => {
                console.log("데이터:", res.data);
                setData(res.data);
            }
            )
            .catch((err) => console.error("데이터 요청 실패 ", err));
    }, [url]);

    return (
        <div className={AcTableStyle.tableWrapper}>
            <CustomTable headers={headers} keys={keys} data={data}/>
        </div>
    )

}

export { TableView };