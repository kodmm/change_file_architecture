import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../styles/navigation.module.css';
import { logout } from '../../functions/auth'
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { userState } from '../../recoil/atoms/userState';
import { getUserState } from '../../recoil/selectors/userSelector';
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import Image from 'next/image';
const Navigation: React.FC = () => {
    const router = useRouter();
    const user = useRecoilValue(getUserState);
    const resetUser = useResetRecoilState(userState);
    
    const onClickLogout = async() => {
        await logout();
        resetUser();
        router.push('/');
    }
    if(user) {
        return(
            <nav className={styles.items}>
                <Link href="/">
                    <a className={styles.item}>
                        <HomeIcon />
                        <h3 className={styles.name}>Home</h3>
                    </a>
                </Link>
                <Link href="/about">
                    <a className={styles.item}>
                        <InfoIcon />
                        <h3 className={styles.name}>About</h3>
                    </a>
                </Link>
                <Link href="/mypage">
                    <a className={styles.item}>
                        <Image 
                            src={user.photo}
                            width={24}
                            height={24}
                            className={styles.user_photo}
                        />
                        <h3 className={styles.name}>MyPage</h3>
                    </a>
                </Link>
                <div className={styles.item} onClick={onClickLogout}>
                    <LogoutIcon  />
                    <h3 className={styles.name} >Logout</h3>
                </div>
            </nav>
        )
        
    } else {
        return(
            <nav className={styles.items}>
                <Link href="/">
                    <a className={styles.item}>
                        <HomeIcon />
                        <h3 className={styles.name}>Home</h3>
                    </a>
                </Link>
                <Link href="/about">
                    <a className={styles.item}>
                        <InfoIcon />
                        <h3 className={styles.name}>About</h3>
                    </a>
                </Link>
                <Link href="/login">
                    <a className={styles.item}>
                        <LoginIcon  />
                        <h3 className={styles.name}>Login</h3>
                    </a>
                </Link>
            </nav>
        )
    }
}
export { Navigation }