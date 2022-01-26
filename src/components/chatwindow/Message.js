import React, { forwardRef } from 'react';
import Moment from 'react-moment';
import Avatar from '@mui/material/Avatar';


const Message = ({ messageItem, myMessage }, ref) => {

    const { displayName, photoURL, message, imgMessage, createdAt } = messageItem;


    return (
        <li ref={ref} className={`mb-[30px] flex items-center ${myMessage ? 'flex-row-reverse' : ''}`}>
            <Avatar
                src={photoURL}
                alt='avatar'
                sx={{ width: 30, height: 30 }}
            >
                {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
            </Avatar>

            <div className='mx-[10px]'>
                {imgMessage && <div className='mb-[20px] shadow rounded-xl overflow-hidden'>
                    <img className='w-full h-full object-cover' src={imgMessage} alt='image_message' />
                </div>}

                {message && <div className={`text-sm ${myMessage ? 'bg-[#0084ff]' : 'bg-[#e4e6eb]'} ${myMessage ? 'text-white' : 'text-black'} py-2 px-4 shadow rounded-xl`}>
                    <p>{message}</p>
                </div>}
                <small className='block text-center'>
                    <Moment format="hh:mm">
                        {createdAt.toDate()}
                    </Moment>
                </small>
            </div>
        </li>
    );
};

export default forwardRef(Message);