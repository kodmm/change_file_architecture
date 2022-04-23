import React from 'react';
import Image from 'next/image';
import styles from '../../styles/streamingServices.module.css';
import { useRecoilValue } from 'recoil';
import { getTvImgBaseUrl, getTvStreamingState } from '../../recoil/selectors/tvSelector';
import { IStreamingService } from '../../types/tvs/Tv';

type Props ={
    streaming: IStreamingService
}

export const Buy: React.FC<Props> = ({ streaming }) => {
    const tvStreaming: IStreamingService = streaming
    const tvImgBaseUrl = useRecoilValue(getTvImgBaseUrl);
    
    const isBuy: boolean | undefined = tvStreaming?.hasOwnProperty('buy')
    if(isBuy) {
        return(
            <ul className={styles.streaming_box}>
                {tvStreaming?.buy.map(service => (
                    <li 
                        className={styles.streaming}
                        key={service.provider_name}
                    >
                        <Image 
                            src={tvImgBaseUrl + service.logo_path}
                            className={styles.provider_img}
                            width={50}
                            height={50}
                        />

                    </li>
                ))}
            </ul>
        )
    } else {
        return null
    }
}