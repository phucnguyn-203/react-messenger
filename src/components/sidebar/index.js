import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

import UserList from './UserList';


const SideBar = ({ onHandleSelectUser, selectedUser }) => {
    return (
        <div className='w-[25%] absolute top-[50px] left-0 bottom-0 border-r'>
            <div className='border-b p-[15px]'>
                <p className='text-[24px] font-medium'>Chat</p>
                <div className='w-full h-[36px] my-[20px] px-[10px] flex items-center bg-[#f0f2f5] rounded-full overflow-hidden'>
                    <SearchIcon />
                    <input
                        type='text'
                        placeholder='Search on Messenger'
                        className='w-full h-full ml-[5px] outline-none bg-[#f0f2f5] placeholder:text-gray-500'
                    />
                </div>
            </div>

            {/*render user list*/}
            <UserList
                onHandleSelectUser={onHandleSelectUser}
                selectedUser={selectedUser}
            />
        </div>
    );
};

export default SideBar;