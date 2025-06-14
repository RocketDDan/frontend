import styles from './CrewHeader.module.css';

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

export default CrewHeader;

