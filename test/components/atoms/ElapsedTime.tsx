import React from 'react';
import styles from '../../styles/elapsedTime.module.css';

type Props ={
    createdAt: string
}

export const ElapsedTime: React.FC<Props> = ({ createdAt }) => {
    const createdTime = new Date(createdAt);
    const now = Date.now();

    const elapsedTime = now - createdTime.getTime()

    if(elapsedTime <= 60000) {
        const elapsedSeconds = Math.floor(elapsedTime / 1000)
        return <p className={styles.time}>{elapsedSeconds}seconds ago</p>
    }
    if (elapsedTime >= 86400000) {
        const elapsedDays = Math.floor(elapsedTime / (1000 * 60 * 60 * 24))
        return <p className={styles.time}>{elapsedDays}days ago</p>
    } else if (elapsedTime >= 3600000) {
        const elapsedHours = Math.floor(elapsedTime / (1000 * 60 * 60))
        return <p className={styles.time}>{elapsedHours}hours ago</p>
    } else if (elapsedTime >= 60000) {
        const elapsedMinutes = Math.floor(elapsedTime / (1000 * 60))
        return <p className={styles.time}>{elapsedMinutes}minutes ago</p>
    } else {
        const elapsedSeconds = Math.floor(elapsedTime / 1000)
        return <p className={styles.time}>{elapsedSeconds}seconds ago</p>
    }

}