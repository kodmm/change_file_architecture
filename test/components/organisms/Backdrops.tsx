import React from 'react';
import Image from 'next/image';
import styles from '../../styles/backdrops.module.css';
import { useRecoilValue } from 'recoil';
import { getTvDetailState, getTvImgBaseUrl } from '../../recoil/selectors/tvSelector';

export const Backdrops: React.FC = () => {

    const tvDetail = useRecoilValue(getTvDetailState);
    const tvImgBaseUrl = useRecoilValue(getTvImgBaseUrl)

    return (
        <div className={styles.backdrops_box}>
                <h3 className={styles.subtitle}>背景画像</h3>
                <div className={styles.scroll_box}>
                    <ul className={styles.backdrops}>
                        {tvDetail?.images.backdrops.map((image, idx) => (
                            <li className={styles.backdrop_box} key={idx}>
                                <div className={styles.backdrop}>
                                    <Image 
                                        src={tvImgBaseUrl + image.file_path} 
                                        alt={tvDetail.name} 
                                        className={styles.poster}
                                        
                                        width={500}
                                        height={300}
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
        </div> 
    )
}