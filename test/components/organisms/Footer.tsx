import React from 'react';
import styles from '../../styles/footer.module.css';

const Footer:React.FC = () => {
    return(
        <footer className={styles.box}>
            <p className={styles.copyright}>&copy; 2022 kodmm</p>
        </footer>
    )
}

export { Footer }