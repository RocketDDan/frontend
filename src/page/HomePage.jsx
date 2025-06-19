import styles from './HomePage.module.css';
import { useEffect, useState } from 'react';
import { fetchRecommendedCrews } from '../api/crew.api';
import CrewCard from '../components/crew/CrewCard';
import LoadingSpinner from "../components/base/LoadingSpinner";

const HomePage = ({region}) => {

    const [crewList, setCrewList] = useState([]);
    const [isFetch, setIsFetch] = useState(true);

    useEffect(() => {
        fetchRecommendedCrews({ region: region, perPage: 10 })
            .then((data) => {
                setCrewList(data);
                // if(data.length === 0){
                //     setIsFetch(false);
                // }
                // else{
                //     setIsFetch(true);
                // }
                setIsFetch(false);
            });

    }, [region, isFetch]);
    return ( 
        <div>
            {isFetch && crewList.length === 0 && (<LoadingSpinner/>)}
            {crewList.length > 0 && (    
                <>
                <div className={styles.crewListScrollWrapper}>  
                    <div className={styles.crewListContainer}>
                        {[...crewList, ...crewList].map((crew, idx) => (
                            <CrewCard key={idx} crew={crew} />
                        ))}
                    </div>
                </div> 
                </>  
            )}

        </div>
    )
}

export default HomePage;