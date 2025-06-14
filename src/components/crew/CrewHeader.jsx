import styles from './CrewHeader.module.css';

/**
 * 
 * @param {Array} columns - 각 열의 정보 객체 배열, 각 객체는 label, width 속성을 가질 수 있음 
 * 예시 : [{ label: "이름", width: "160px" }, { label: "닉네임", width: "160px" }]
 * @returns 
 */
const CrewHeader = ({ columns }) => {
    return (
        <div className={styles.headerWrapper}>
            {columns && columns.map((col, idx) => (
                <div
                    key={col.label}
                    style={{ width: col.width, minWidth: col.width, flex: col.flex || 'none' }}
                    className={styles.headerCell}
                >
                    {col.label}
                </div>
            ))}
        </div>
    );
};

export {CrewHeader};

