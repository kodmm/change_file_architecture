import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import styles from '../../styles/message.module.css';
import { IChatUser } from '../../types/chats/Chat';
import { ElapsedTime } from '../atoms/elapsedTime';

type Props = {
    message: IChatUser
}

export const Message: React.FC<Props> = ({ message }) => {
    const [isHeightOver, setIsHeightOver] = useState<boolean>(false);
    const [isReadContinue, setIsReadContinue] = useState<boolean>(false);
    const messageEl = useRef<any>(null)
    useEffect(() => {
        const { height } = messageEl.current.getBoundingClientRect()
        height > 80? setIsHeightOver(!isHeightOver) : null;
    },[])
    const onClickReadContinue = () => {
        setIsReadContinue(!isReadContinue)
    }
    return (
        <li className={styles.message_box} >
            <div className={styles.message}>
                <div className={styles.icon_box}>
                    <div className={styles.icon}>
                        <Image 
                            src={message.User.photo}
                            alt={message.User.displayName}
                            width={50}
                            height={50}
                            className={styles.user_photo}
                        />
                    </div>
                </div>
                <div className={styles.comment_box}>
                    <div className={styles.upper_box}>
                        <h5 className={styles.username}>{message.User.displayName}</h5>
                        <ElapsedTime createdAt={message.createdAt} />
                    </div>
                    <div className={styles.down_box}>
                        <p  className={`${(isHeightOver === isReadContinue)? styles.comment : styles.comment_over}`} ref={messageEl}>{message.message}</p>
                        {isHeightOver && (
                        <span 
                            className={styles.read_more_trigger} 
                            onClick={onClickReadContinue}
                        >
                            {!isReadContinue? "Read more": "Back to"}
                        </span>
                        )}
                        
                    </div>
                    
                </div>
            </div>
        </li>
    )
}