import React from 'react';
import styles from '../../styles/crews.module.css';
import Image from 'next/image'
import { useRecoilValue } from 'recoil';
import { getTvImgBaseUrl, getTvCrewState } from '../../recoil/selectors/tvSelector';

export const Crews: React.FC = () => {

    const tvCrews = useRecoilValue(getTvCrewState);
    const tvImgBaseUrl = useRecoilValue(getTvImgBaseUrl);

    return(
        <div className={styles.crews_box}>
            <h3 className={styles.subtitle}>スタッフ</h3>
            <div className={styles.scroll_box}>
                <ul className={styles.crews}>
                    {tvCrews?.map(crew => (
                        <li className={styles.card} key={crew.id}>
                            <div className={styles.image_box}>
                                <Image src={crew.profile_path? tvImgBaseUrl + crew.profile_path : '/assets/images/no_image.jpeg'} 
                                    alt={crew.original_name} 
                                    className={styles.image}
                                    width={140}
                                    height={180}
                                />
                            </div>
                            <div className={styles.text}>
                                <b>{crew.name}</b>
                                <p className={styles.department_name}>{crew.department}</p>   
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}