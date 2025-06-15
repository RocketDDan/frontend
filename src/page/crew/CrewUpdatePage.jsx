import { useParams } from 'react-router-dom';
import styles from './CrewUpdatePage.module.css';

const CrewUpdatePage = () => {
    const {crewId} = useParams(); 
    return (
        <div>
        <h1>Crew Update Page</h1>
        <p>This page will allow you to update crew information.</p>
        {/* Add form or components for updating crew information here */}
        </div>
    );
}
export default CrewUpdatePage;