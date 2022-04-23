import React from 'react';
import styles from '../../styles/streamingServices.module.css';
import { Buy, Flatrate, Rent } from '../atoms/index';
import { IStreamingService } from '../../types/tvs/Tv';

type Props = {
    streaming: IStreamingService
}

export const StreamingServicesMypage: React.FC<Props> = ({ streaming }) => {
    const tvStreaming: IStreamingService = streaming

    if (tvStreaming) {
        return(
            <div className={`${styles.streaming_package} ${styles.no_wrap}`}>
                <div className={styles.flatrate}>
                    <h4 className={styles.streaming_title}>サブスクリプション</h4>
                    <Flatrate streaming={tvStreaming}/>
                </div>
                <div className={styles.rent}>
                    <h4 className={styles.streaming_title}>レンタル</h4>
                    <Rent streaming={tvStreaming}/>
                </div>
                <div className={styles.buy}>
                    <h4 className={styles.streaming_title}>購入</h4>
                    <Buy streaming={tvStreaming}/>
                </div>
            </div>
        )
    } else {
        return (
            <p className={styles.no_streaming}>現在、視聴できるストリーミングサービスはありません。</p>
        )
    }
    
}