import React from 'react';

import Button from '@mui/material/Button';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import { useRecoilState, useRecoilValue } from 'recoil'
import { watchState } from '../../recoil/atoms/watchState';
import styles from '../../styles/bigWatchButton.module.css';
import { getTvCastState, getTvDetailState } from '../../recoil/selectors/tvSelector';
import { addWatch, destroyWatch } from '../../functions/watch';
import { IWatch } from '../../types/watches/watch';

export const BigWatchButton: React.FC = () => {
    const [watch, setWatch] = useRecoilState(watchState);
    const tvDetail = useRecoilValue(getTvDetailState);
    const tvCasts = useRecoilValue(getTvCastState);

    const onClickAddWatch = async() => {
        const { data }: {data: { watch: IWatch }} = await addWatch(tvDetail, tvCasts);
        setWatch(data.watch)
    }

    const onClickDestroyWatch = async() => {
        const delWatch: any = await destroyWatch(Number(watch?.id));
        setWatch(null)
    }

    if (watch) {
        return (
            <Button 
                variant="outlined"
                color='error' 
                startIcon={<PlaylistRemoveIcon />} 
                className={styles.watch_button}
                onClick={onClickDestroyWatch}
            >
                <p className={styles.watch_text}>Delete Watch</p>
            </Button>
        )
    }else if (watch === null) {
        return (
            <Button 
                variant="contained" 
                startIcon={<PlaylistAddIcon />} 
                className={styles.watch_button}
                onClick={onClickAddWatch}
            >
                <p className={styles.watch_text}>Add Watch</p>
            </Button>
        )
    } else {
        return null
    }

}
