import React from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';
import styles from '../../styles/watches.module.css';
import { WatchTabKeys } from '../../types/watches/watch';

import { watchesTabState } from '../../recoil/atoms/watchState';
import { getWatchWatchState } from '../../recoil/selectors/watchSelector';

import { Card } from '../molecules/card';

export const Watches: React.FC = () => {
    const [tabState, setTabState] = useRecoilState(watchesTabState);
    const watches = useRecoilValue(getWatchWatchState);

    const onClickTab = (key: WatchTabKeys) => {
        setTabState(key)
    }
    const activeStyles = (tab: WatchTabKeys) => {
        const isActive = tabState === tab? styles.watches_tab_active : styles.watches_tab_not_active
        return isActive
        
    }

    return (
        <div className={styles.watches_holder}>
            <ul className={styles.watches_tabs_box}>
                <li 
                    className={`${styles.watches_tab} ${activeStyles(WatchTabKeys.ALL)}`} 
                    onClick={() => onClickTab(WatchTabKeys.ALL)}
                >
                    ALL
                </li>
                <li 
                    className={`${styles.watches_tab} ${activeStyles(WatchTabKeys.NOT_WATCHES)}`} 
                    onClick={() => onClickTab(WatchTabKeys.NOT_WATCHES)}
                >
                    Not Watched
                </li>
                <li 
                    className={`${styles.watches_tab} ${activeStyles(WatchTabKeys.WATCHED)}`} 
                    onClick={() => onClickTab(WatchTabKeys.WATCHED)}
                >
                    Watched
                </li>
            </ul>
            <ul className={styles.watches_box}>
                {watches && watches.length === 0 && (
                    <div className={styles.no_watch_list}>
                        <li className={styles.no_watch_text}> No Watch list</li>
                    </div>
                    
                )}

                {watches && watches.map(watch => (
                    <Card watch={watch} key={watch.id} />
                ))}
                
            </ul>
        </div>
    )
}