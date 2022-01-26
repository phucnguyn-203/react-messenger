/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import Moment from 'react-moment';
import { onSnapshot, doc } from 'firebase/firestore';

import MyAvatar from '../MyAvatar';
import { database } from '../../config/firebase.config';
import { AuthContext } from '../../context/AuthProvider';

const User = ({ user, onHandleSelectUser, isSelected }) => {

    const { displayName, photoURL, isOnline } = user;
    const currentUser = useContext(AuthContext);
    // state to save last message
    const [lastMessage, setLastMessage] = useState('');

    useEffect(() => {
        const receiverMessage = user.uid;
        const id = currentUser.uid > receiverMessage ? `${currentUser.uid + receiverMessage}` : `${receiverMessage + currentUser.uid}`;

        const unSubscribe = onSnapshot(doc(database, 'lastMessage', id), doc => {
            setLastMessage(doc.data());
        });

        return () => unSubscribe();
    }, []);
    
    return (
        <li onClick={onHandleSelectUser} className={`${isSelected ? 'bg-gray-100' : ''} flex justify-between items-center px-[10px] py-[15px] cursor-pointer hover:bg-gray-100 rounded-lg`}>
            <div className='flex items-center'>
               <MyAvatar 
                   isOnline={isOnline}
                   photoURL={photoURL}
                   displayName={displayName}
               />
                <div className={`ml-[10px] ${lastMessage?.unRead && lastMessage?.from === user.uid ? 'font-medium' : null} `}>
                    <p>{displayName}</p>
                    <div className='max-w-[150px] text-[13px] whitespace-nowrap overflow-hidden text-ellipsis'>
                        <span >{lastMessage && lastMessage.from !== user.uid ? 'Me: ' : null}</span>
                        <span >{lastMessage?.message}</span>
                    </div>
                </div>
            </div>
            {lastMessage && <small>
                <Moment fromNow>{lastMessage.createdAt.toDate()}</Moment>
            </small>}
        </li>
    );
};

export default User;