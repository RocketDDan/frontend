import RegionSelector from '../components/base/RegionSelector';
import styles from './HomePage.module.css';
import { useEffect, useState } from 'react';
import { fetchRecommendedCrews } from '../api/crew.api';
import CrewCard from '../components/crew/CrewCard';
import LoadingSpinner from "../components/base/LoadingSpinner";

const HomePage = () => {

    const [region, setRegion] = useState("");
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
            <div className={styles.crewHeader}> 
                <RegionSelector region={region} setRegion={setRegion}/>   
                <h2 className="titleColor">근처 크루에 참여하세요!</h2>
            </div>
            {isFetch && crewList.length === 0 && (<LoadingSpinner/>)}
            {!isFetch && crewList === 0 && (<span className="noData">크루가 존재하지 않습니다.</span>)}
            {crewList.length > 0 && (     
                <div className={styles.crewListScrollWrapper}>
                    <div className={styles.crewListContainer}>
                        {[...crewList, ...crewList].map((crew, idx) => (
                            <CrewCard key={idx} crew={crew} />
                        ))}
                    </div>
                </div>  
            )}

        </div>
    )
}

export default HomePage;