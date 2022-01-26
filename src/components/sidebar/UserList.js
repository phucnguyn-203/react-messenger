import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

import { authentication, database } from '../../config/firebase.config';
import User from './User';


const UserList = ({ onHandleSelectUser, selectedUser }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        //create user reference
        const usersRef = collection(database, 'users');
        //excute query
        const q = query(usersRef, where('uid', 'not-in', [authentication.currentUser.uid]));
        // listen for realtime update users collections
        const unSubscribe = onSnapshot(q, querySnapshot => {
            const users = [];
            querySnapshot.forEach(doc => {
                users.push(doc.data());
            })
            setUsers(users);
        });

        //clean up function
        return () => unSubscribe();
    }, []);

    return (
        <ul className='px-[5px] py-[10px] overflow-y-auto max-h-[90%] scrollbar-hide'>
            {users.map(user => (
                <User
                    key={user.uid}
                    user={user}
                    onHandleSelectUser={() => onHandleSelectUser(user)}
                    isSelected={user.uid === selectedUser?.uid}
                />
            ))}
        </ul>
    );
};

export default UserList;