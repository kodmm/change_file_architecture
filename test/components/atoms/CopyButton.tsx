import React, { useState }  from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import styles from '../../styles/copybutton.module.css';
import { copyNameKeys } from '../../types/watches/cardStatus';

type Props = {
    name: string,
}

export const CopyButton: React.FC<Props> = ({ name }: Props) => {
    const [iconLabel, setIconLabel] = useState<copyNameKeys>(copyNameKeys.COPY)

    const onClickCopyButton = (name: string) => {
        navigator.clipboard.writeText(name)
        setIconLabel(copyNameKeys.COPIED)
        setTimeout(resetIconLabel, 1500)
    }

    const resetIconLabel = () => setIconLabel(copyNameKeys.COPY)

    

    return(
        <div className={styles.copybutton_box}>
            <ContentCopyIcon className={styles.copyicon} onClick = {() => onClickCopyButton(name)} />
            <p className={styles.iconlabel}>{iconLabel}</p>
        </div>
    )
}
