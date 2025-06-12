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

const TableView = ({url, headers, keys, keyword, page, setPage}) => {
    const [data, setData] = useState([]);
    const [actualPage, setActualPage] = useState(page); 
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
                    keyword: keyword || "",
                },
            })
            .then((res) => {
                setData(res.data.announcements);
                setTotalCount(res.data.totalCount);
                setActualPage(page);
            }
            )
            .catch((err) => console.error("데이터 요청 실패 ", err));
    }, [url, page, keyword]);

    return (
       <div className={AcTableStyle.outerWrapper}>
            <div className={AcTableStyle.tableWrapper}>
                <CustomTable headers={headers} keys={keys} data={data} page={actualPage} limit={limit} />
            </div>
            <div className={AcTableStyle.paginationWrapper}>
                <Pagination
                page={page}
                limit={limit}
                total={totalCount}
                onPageChange={setPage}
                />
            </div>
        </div>

    )

}

export { TableView };