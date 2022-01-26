import React from 'react';

import MyAvatar from '../MyAvatar';
import MessageForm from './MessageForm';
import MessageList from './MessageList';


const ChatWindow = ({ selectedUser, messages, onHandleSubmitMessage, textMessage, onSetTextMessage, onSetImgMessage }) => {
    return (
        <div className='w-[75%] absolute top-[50px] right-0 bottom-0'>
            <div className={`px-[10px] py-[10px] flex ${selectedUser ? 'justify-start' : 'justify-center'} items-center z-10 shadow-md`}>
                {selectedUser ?
                    <>
                        <MyAvatar
                            isOnline={selectedUser.isOnline}
                            photoURL={selectedUser.photoURL}
                            displayName={selectedUser.displayName}
                        />
                        <div className='ml-2'>
                            <h1 className='font-medium'>{selectedUser.displayName}</h1>
                            {selectedUser.isOnline && <p className='text-[13px] text-[#65676b]'>Active Now</p>}
                        </div>
                        <MessageForm
                            textMessage={textMessage}
                            onSetTextMessage={onSetTextMessage}
                            onHandleSubmitMessage={onHandleSubmitMessage}
                            onSetImgMessage={onSetImgMessage}
                        />
                    </> : <h1 className='text-[18px]'>Select user to start conversation!!!</h1>}

            </div>
            <MessageList messages={messages} />
        </div>
    );
};

export default ChatWindow;