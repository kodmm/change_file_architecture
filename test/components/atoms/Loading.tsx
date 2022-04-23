import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import styles from '../../styles/loading.module.css'

export const Loading: React.FC = () => {
    return(
        <div className={styles.loading_box}>
            <CircularProgress />
            
        </div>
    )
}