import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { io, Socket } from 'socket.io-client';
import { useSetRecoilState, useRecoilValue } from 'recoil'; 
import styles from '../../styles/chats.module.css';
import { Message } from '../atoms/message';
import TextField from '@mui/material/TextField';
import { getTvDetailState } from '../../recoil/selectors/tvSelector';
import { getChats } from '../../recoil/selectors/chatSelector';
import { tvChatState } from '../../recoil/atoms/tvChat';
import { IChatData, messageTypeKeys, IChatUser, IUser, IChat } from '../../types/chats/Chat';
import { getChatUserState } from '../../recoil/selectors/userSelector';
import { useRouter } from 'next/router';

export const Chats: React.FC = () => {
    const router = useRouter()
    const currentPath = router.asPath
    const chatSocket = useRef<Socket>()
    const [message, setMessage] = useState<string>("");
    const messages = useRecoilValue(getChats);
    const setMessages = useSetRecoilState(tvChatState);

    const tvDetail = useRecoilValue(getTvDetailState);
    const user = useRecoilValue(getChatUserState);

    const changeMessage = (event: any) => {
        const value: string = event.target.value;
        setMessage(value);
    }

    const submitMessage = () => {
        setMessage(message.trim());
        if (user) {
            const data: IChatData = { 
                user_id: user.id,
                video_id: tvDetail.id,
                messageType: messageTypeKeys.TEXT,
                message: message,
            }
            chatSocket.current?.emit("client_to_server", {data: { chat: data, user: user }})
        }
        setMessage("");
    }


    const messagesMemo = useMemo(
        () => {
            const messagesList = messages.map((message, idx)=> {
                return <Message key={message.id} message={message} />
            })
            return messagesList
        },
        [messages],
    );

    
    useEffect(() => {
        const paramsId = currentPath.split('/')[2]
        chatSocket.current = io("http://localhost:3001/chat")

        chatSocket.current.emit("client_to_server_join", { data: { room: paramsId} });

        chatSocket.current.on("server_to_client", ({ data }: { data: {message: IChat, user: IUser }}) => {
            
            if(data) {
                const newMessage: IChatUser = {...data.message, User: data.user}
                setMessages((messages) => [...messages, newMessage]);
            }
            
        });

        return () => {
            chatSocket.current?.disconnect()
        };
        
    },[])
    return (
        <div>
            <section className={styles.chat_wrapper}>
                <div className={styles.chat_box}>
                    {user && (
                        <div className={styles.text_form}>
                            <TextField 
                                id="standard-basic" 
                                label="Chat Message" 
                                variant="standard" 
                                className={styles.text_field}
                                value={message}
                                onChange={(event) => changeMessage(event)}
                                multiline
                                maxRows={10}

                            />
                            <button
                                className={`${message.length > 0 ? styles.submit_button : styles.submit_button_disabled}`}
                                disabled={message.length > 0 ? false : true}
                                onClick={submitMessage}
                            >コメント
                            </button>
                        </div>
                    )}
                    
                    
                    <div className={styles.chat}>
                        <ul className={styles.messages}>
                            {messagesMemo}
                            
                        </ul>
                    </div>
                    
                </div>
            </section>
        </div>
    )
}