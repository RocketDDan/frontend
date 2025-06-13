import { MemberProfileImage } from "../profile/ProfileImage"
import styles from "./CrewMemberTable.module.css"

const MemberProfile = ({profilePath, nickname}) => {

    return(
        <div className={styles.memberProfile}>
            <MemberProfileImage profileUrl={profilePath}/>
            <span>{nickname}</span>
        </div>
    )
}

const TableHeader = ({headers}) => {
    return (
        <thead>
            <tr>
                {headers.map((h, i) => (
                    <th key={i} className={styles.th}>
                        {h}
                    </th>
                ))}
            </tr>
        </thead>
    );
}

const TableBody = ({ data, keys, onClickLeft, onClickRight }) => {
    return (
        <tbody>
            {data.map((row, i) => (
                <tr key={i}>
                    {keys.map((key, j) => {
                        <td key={j} className={styles.td}>
                            <MemberProfile profilePath={row.profilePath} nickname={row.nickname} />
                        </td>
                        if (header === '이메일') {
                            return <td key={j} className={styles.td}>{row.email}</td>;
                        }
                        // '가입일', '요청일'도 row[header]로 처리
                        if (header === '요청 메시지') {
                            return <td key={j} className={styles.td}>요청 메시지</td>;
                        }
                        if (header === '관리') {
                            return (
                                <td key={j} className={styles.td}>
                                    <button className={styles.buttonBlue} onClick={() => onClickLeft(row)}>승인</button>
                                    <button className={styles.buttonGray} onClick={() => onClickRight(row)}>삭제</button>
                                </td>
                            );
                        }
                        return <td key={j} className={styles.td}>{row[header]}</td>;
                    })}
                </tr>
            ))}
        </tbody>
    );
};

const CrewMemberTable = ({ headers, data, onClickLeft, onClickRight }) => {
    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <TableHeader headers={headers} />
                <TableBody
                    data={data}
                    headers={headers}
                    onClickLeft={onClickLeft}
                    onClickRight={onClickRight}
                />
            </table>
        </div>
    );
};

export default CrewMemberTable;