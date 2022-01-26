import React, { useEffect, useRef } from 'react';

import { authentication } from '../../config/firebase.config';
import Message from './Message';

const MessageList = ({ messages }) => {

    const messageRef = useRef();

    useEffect(() => {
        messageRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className='pb-[15px] pt-[20px] absolute top-[50px] bottom-[70px] right-0 left-0 flex flex-col justify-end '>
            {/* Message Section */}
            <ul className='px-[15px] overflow-y-auto max-h-full'>
                {messages.length > 0 && messages.map((messageItem, index) => (
                    <Message
                        ref={messageRef}
                        key={index}
                        messageItem={messageItem}
                        myMessage={authentication.currentUser.uid === messageItem.from}
                    />
                ))}
            </ul>
        </div>
    );
};

export default MessageList;