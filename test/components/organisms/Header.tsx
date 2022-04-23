import React, { useEffect } from 'react';
import Link from 'next/link';
import styles from '../../styles/header.module.css';
import { Navigation } from '../molecules'
import { useSetRecoilState } from 'recoil';
import { userState } from '../../recoil/atoms/userState';
import { useUser } from '../../hooks/auth';
const Header: React.FC = () => {
    const setUser = useSetRecoilState(userState);
    const { data, error } = useUser();

    useEffect(() => {
        if(data !== undefined) {
            setUser(data)
        }
    },[data])
    return(
        <header>
            <div className={styles.box}>
                <div>
                    <Link href="/">
                        <a><h1 className={styles.title}>Shares</h1></a>
                    </Link>
                </div>
                <Navigation />
            </div>
            
        </header>
    )
}

export { Header }