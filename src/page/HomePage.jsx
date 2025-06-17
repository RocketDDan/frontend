import RegionSelector from '../components/base/RegionSelector';
import styles from './HomePage.module.css';
import { useEffect, useState } from 'react';
import commonStyles from '../Common.module.css';
import { fetchRecommendedCrews } from '../api/crew.api';
import CrewCard from '../components/crew/CrewCard';

const HomePage = () => {

    const [region, setRegion] = useState("");
    const [crewList, setCrewList] = useState([]);

    useEffect(() => {
        fetchRecommendedCrews({ region: region, perPage: 10 })
            .then((data) => {
                setCrewList(data);
            });

    }, [region]);
    return (
        <div>
            <div className={styles.crewHeader}>
                <RegionSelector region={region} setRegion={setRegion}/>
                <h2 className={commonStyles.titleColor}>근처 크루에 참여하세요!</h2>
            </div>
            <div className={styles.crewListScrollWrapper}>
                <div className={styles.crewListContainer}>
                    {[...crewList, ...crewList].map((crew, idx) => (
                        <CrewCard key={idx + crew.id} crew={crew} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HomePage;