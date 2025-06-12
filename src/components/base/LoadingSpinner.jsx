import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const LoadingSpinner = () => {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <FontAwesomeIcon icon={faSpinner} spin size="2x" />
            <div>Loading...</div>
        </div>
    );
};

export default LoadingSpinner;