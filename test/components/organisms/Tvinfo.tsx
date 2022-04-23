import React from 'react';
import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import styles from '../../styles/Tvinfo.module.css';
import { BigWatchButton, StreamingServices } from '../molecules/index';
import { getTvDetailState, getTvImgBaseUrl } from '../../recoil/selectors/tvSelector';
import { CopyButton } from '../atoms/copyButton';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from 'swiper';
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

SwiperCore.use([Pagination, Navigation]);


export const TvInfo: React.FC = () => {
    const tvDetail = useRecoilValue(getTvDetailState);
    const tvImgBaseUrl = useRecoilValue(getTvImgBaseUrl);

    return (
        <section className={styles.tv_info}>
            <div className={styles.poster_wrapper}>
                <div className={styles.poster_box}>
                    <div className={styles.poster}>
                        <Swiper slidesPerView={1} spaceBetween={30} loop={true} pagination={{
                            "clickable": true }} navigation={true}>
                                {tvDetail.images.posters.map((image, idx) => (
                                    <SwiperSlide key={idx}>
                                        <Image 
                                            src={tvImgBaseUrl + image.file_path} 
                                            alt={tvDetail.name} 
                                            className={styles.poster}
                                        
                                            width={300}
                                            height={450}
                                        />
                                    </SwiperSlide>
                                ))}
                        </Swiper>
                    </div>
                </div>
                <BigWatchButton />
            </div>
            <div className={styles.description_box}>
                <section className={styles.description}>
                    <div className={styles.title_box}>
                        <h2 className={styles.title}>{tvDetail.name}</h2>
                        <CopyButton name={tvDetail.name} />
                    </div>
                    <div className={styles.genres}>
                        <Stack direction="row" spacing={1}>
                            {tvDetail.genres.map(genre => (
                                <Chip 
                                    label={genre.name}
                                    variant="outlined" 
                                    key={genre.id}
                                />
                            ))}
                        </Stack>
                    </div>
                    <div className={styles.streaming_wrapper}>
                        <h3 className={styles.streaming_header}>ストリーミングサービス</h3>      
                        <StreamingServices />
                    </div>
                    <div className={styles.overview_box}>
                        <h3 className={styles.overview_header}>概要</h3>
                        <p className={styles.overview}>{tvDetail.overview}</p>
                    </div>
                </section>
            </div>
        </section>
    )
}