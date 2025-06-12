import AcTableStyle from "./AnnouncementTable.module.css"
import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../announcement/Pagination";

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


const TableBody = ({ data, keys, page, limit }) => (
    <tbody>
        {data.map((row, rowIdx) => (
            <tr key={rowIdx} className={AcTableStyle.tr}>
                <td className={AcTableStyle.td}>
                    {(page-1) * limit + rowIdx + 1}
                </td>
                {keys.map((key, colIdx) => (
                    <td
                        key={colIdx}
                        className={
                            key === 'crewName' && row[key] === '관리자'
                                ? `${AcTableStyle.td} ${AcTableStyle.role}`
                                : key === 'title'
                                ? `${AcTableStyle.td} ${AcTableStyle.wideColumn}`
                                : AcTableStyle.td
                            }>
                        {row[key]}
                    </td>
                ))}
            </tr>
        ))}
    </tbody>
);


const CustomTable = ({headers, keys, data, page, limit}) => (
    <table className={AcTableStyle.table}>
        <TableHeader headers={headers}/>
        <TableBody data={data} keys={keys} page={page} limit={limit}/>
    </table>
);

const TableView = ({url, headers, keys}) => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const limit = 6;

    useEffect(() => {
        
        if (!url) return;
        const fullUrl = `${process.env.REACT_APP_API_BASE_URL}${url}`;
        console.log("호출 URL:", fullUrl);
        
        axios
            .get(fullUrl, {
                params: {
                    page,
                    perPage : limit,
                },
            })
            .then((res) => {
                console.log("데이터:", res.data);
                setData(res.data.announcements);
                setTotalCount(res.data.totalCount);
            }
            )
            .catch((err) => console.error("데이터 요청 실패 ", err));
    }, [url, page]);

    return (
       <div className={AcTableStyle.outerWrapper}>
            <div className={AcTableStyle.tableWrapper}>
                <CustomTable headers={headers} keys={keys} data={data} page={page} limit={limit} />
            </div>
            <div className={AcTableStyle.paginationWrapper}>
                <Pagination
                page={page}
                limit={limit}
                total={totalCount}
                onPageChange={(newPage) => setPage(newPage)}
                />
            </div>
        </div>

    )

}

export { TableView };