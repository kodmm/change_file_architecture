import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/card.module.css';
import { StreamingServicesMypage } from '../molecules/streamingServicesMypage';
import { CopyButton } from '../atoms/copyButton';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { getTvImgBaseUrl } from '../../recoil/selectors/tvSelector';
import { getWatchWatchState } from '../../recoil/selectors/watchSelector';
import { IWatchState } from '../../recoil/atoms/watchState';
import { watchesState } from '../../recoil/atoms/watchState';
import { IActor } from '../../types/watches/actor';
import { IWatch } from '../../types/watches/watch';
import { cardStatusKeys } from '../../types/watches/cardStatus';

import { updateWatch, destroyWatch } from '../../functions/watch';

import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';

type Props = {
    watch: IWatchState,
}

export const Card: React.FC<Props> = ({ watch }) => {
    const baseUrl = useRecoilValue(getTvImgBaseUrl);
    const watches = useRecoilValue(getWatchWatchState);
    const setWatches = useSetRecoilState(watchesState);
    const [cardStatusIsFront, setcardStatusIsFront] = useState<boolean>(true)

    const onClickCardStatus = () => {
        setcardStatusIsFront(!cardStatusIsFront)
    }

    const getCasts = (actors: IActor[]) => {
        const nameActor: Array<string> = actors.map(actor => actor.name)
        return nameActor.join(', ') + ', etc...'
    }

    const onClickUpdateIcon = async(id: number, isWatch: boolean) => {
        const watch: IWatch = await updateWatch(id, !isWatch);
        const new_watch: IWatchState[] | undefined = watches?.map(old_watch => {
            if (old_watch.id === watch.id) {
                return { ...old_watch, ...watch }
            } else {
                return old_watch
            }
        })
        setWatches(new_watch);
    }

    const onClickDeleteIcon = async(id: number) => {
       const watch: IWatch = await destroyWatch(id)
       setWatches(watches => watches?.filter(old_watch => old_watch.id !== id))
    }
    return(
        <li className={styles.watch_card_box} key={watch.id}>
            <div className={`${styles.watch_card} ${cardStatusIsFront? styles.watch_card_front: styles.watch_card_back}`}>
                <div className={styles.img_video}>
                    <Image
                        src={baseUrl + watch.Video.poster_path}
                        width={100}
                        height={160}
                        className={styles.video_image}
                    />
                </div>
                <div className={styles.watch_content}>
                    <div className={styles.watch_video_name_copy}>
                        <h4 className={styles.video_name}>{watch.Video.name}</h4>
                        <CopyButton name={watch.Video.name} />
                    </div>
                    
                    <p className={styles.casts_name}>{getCasts(watch.Video.Actors)}</p>
                </div>
                <div>
                    <ul className={styles.watchholder_icon_content}>
                        <li 
                            className={styles.watchholder_icon_box} 
                            onClick={() => onClickUpdateIcon(watch.id, watch.isWatch)}
                        >
                            <PlaylistAddCheckIcon  
                                sx={{ fontSize: 50 }} 
                                color={watch.isWatch? 'secondary' : 'success'}
                            />
                            <p className={styles.watchholder_label}>{watch.isWatch? 'no wached' : 'watched'}</p>
                        </li>
                        <li 
                            className={styles.watchholder_icon_box}
                            onClick={() => onClickDeleteIcon(watch.id)}
                        >
                            <PlaylistRemoveIcon sx={{ fontSize: 50 }} color='error' />
                            <p className={styles.watchholder_label}>delete</p>
                        </li>
                    </ul>
                </div>
                <div className={styles.detail_content}>
                        <p className={styles.back_card_text} onClick={onClickCardStatus}>{cardStatusIsFront? cardStatusKeys.BACK: cardStatusKeys.FRONT}</p>
                        <Link href="/tv/[id]" as={`/tv/${watch.Video.id}`} ><p className={styles.link_hover}>詳細ページへ</p></Link>
                </div>
                
            </div>
            <div className={`${styles.watch_card} ${!cardStatusIsFront? styles.watch_card_front : styles.watch_card_back}`}>
                <div className={styles.img_video}>
                    <Image
                        src={baseUrl + watch.Video.poster_path}
                        width={100}
                        height={160}
                        className={styles.video_image}
                    />
                </div>
                <ul className={styles.cast_image_lists}>
                    <span className={styles.back_lists_title}>main casts</span>
                    {watch.Video.Actors.map(actor => (
                        <li className={styles.cast_image_list} key={actor.id}>
                            <Image
                                
                                src={baseUrl + actor.profile_path}
                                width={80}
                                height={130}
                                className={styles.cast_image}
                            />
                        </li>
                    ))}
                    
                </ul>
                <div className={styles.streaming}>
                    <StreamingServicesMypage streaming={watch.Video.streaming} />
                </div>
                <div className={styles.detail_content}>
                        <p className={styles.back_card_text} onClick={onClickCardStatus}>{cardStatusIsFront? cardStatusKeys.BACK: cardStatusKeys.FRONT}</p>
                        <Link href="/tv/[id]" as={`/tv/${watch.Video.id}`} ><p className={styles.link_hover}>詳細ページへ</p></Link>
                </div>
            </div>
        </li>
        
    )
}