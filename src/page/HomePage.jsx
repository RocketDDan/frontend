import styles from './HomePage.module.css';
import { useEffect, useState } from 'react';
import { fetchRecommendedCrews } from '../api/crew.api';
import CrewCard from '../components/crew/CrewCard';
import LoadingSpinner from "../components/base/LoadingSpinner";

const HomePage = ({region}) => {

    const [crewList, setCrewList] = useState([]);
    const [isFetch, setIsFetch] = useState(true);

    useEffect(() => {
        setIsFetch(true);
        fetchRecommendedCrews({ region: region, perPage: 10 })
            .then((data) => {
                setCrewList(data);
                setIsFetch(false);
            });
    }, [region]);
    return ( 
        <div>
            {isFetch && (<LoadingSpinner/>)}
            {crewList.length > 0 && (    
                <>
                <div className={styles.crewListScrollWrapper}>  
                    <div className={styles.crewListContainer}>
                        {[...crewList, ...crewList].map((crew, idx) => (
                            <CrewCard key={crew.crewId} crew={crew} />
                        ))}
                    </div>
                </div> 
                </>  
            )}

        </div>
    )
}

export default HomePage;