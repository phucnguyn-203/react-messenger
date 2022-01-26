/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import { collection, query, onSnapshot, getDoc, updateDoc, doc, Timestamp, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import Header from '../../components/header';
import SideBar from '../../components/sidebar';
import ChatWindow from '../../components/chatwindow';
import { AuthContext } from '../../context/AuthProvider';
import { database, storage } from '../../config/firebase.config';
import addDocument from '../../services/firestore/addDocument';
import setDocument from '../../services/firestore/setDocument';
import updateDocument from '../../services/firestore/updateDocument';


const HomePage = () => {
    // get current user info from context api
    const currentUser = useContext(AuthContext);

    //state for user is selected from sideber
    const [selectedUser, setSelectedUser] = useState(null);
    //state to store message get from to text input in MessageForm component
    const [textMessage, setTextMessage] = useState('');
    const [imgMessage, setImgMessage] = useState('');
    const [messages, setMessages] = useState([]);


    useEffect(() => {
        const handleLoginUserAccess = () => {
            updateDocument('users', currentUser.uid, {
                isOnline: true,
            })
        }
        if (document.readyState === 'complete') {
            handleLoginUserAccess();
        } else {
            window.addEventListener('load', handleLoginUserAccess);
        }

        return () => window.removeEventListener('load', handleLoginUserAccess);
    }, []);

  
    //side effect
    useEffect(() => {
        // handle logic
        const handleClickCloseTab = () => {
            updateDocument('users', currentUser.uid, {
                isOnline: false,
            })
        }
        // add event listiener
        window.addEventListener('unload', handleClickCloseTab);

        return () => window.removeEventListener('unload', handleClickCloseTab);
    }, []);

    //handle seclect user and get message
    const handleSelectUser = async (user) => {
        setSelectedUser(user);
        const receiverMessage = user.uid; // get uid recevier message
        //create unique id for document in message collection
        const id = currentUser.uid > receiverMessage ? `${currentUser.uid + receiverMessage}` : `${receiverMessage + currentUser.uid}`;
        // create message reference
        const messageRef = collection(database, 'messages', id, 'chat');
        //excute query
        const q = query(messageRef, orderBy('createdAt', 'asc'));

        onSnapshot(q, querySnapshot => {
            const messages = [];
            querySnapshot.forEach(doc => {
                messages.push(doc.data());
            });
            setMessages(messages);
        });

        //get last message between login user and select user and update unRead field
        const lastMessageRef = doc(database, 'lastMessage', id);
        const docSnap = await getDoc(lastMessageRef);
        // if last message exist and it is from selected user
        if (docSnap.exists() && docSnap.data().from === receiverMessage) {
            //update unRead field
            await updateDoc(lastMessageRef, {
                unRead: false,
            })
        }
    }

    //logic handle send message
    const handleSubmitMessage = async () => {
        //if imgMessage is true or textMessage is true and textMessage length after remove the leading and trailing white space is > 0
        if (imgMessage || (textMessage && textMessage.trim().length > 0)) {
            const receiverMessage = selectedUser.uid; // get uid recevier message
            //create unique id for document in message collection
            const id = currentUser.uid > receiverMessage ? `${currentUser.uid + receiverMessage}` : `${receiverMessage + currentUser.uid}`;
            //save url when user send image message
            let imageURL;
            if (imgMessage) {
                //create images reference
                const imagesRef = ref(storage, `images/${new Date().getTime()}-${imgMessage.name}`);
                try {
                    const snap = await uploadBytes(imagesRef, imgMessage);
                    imageURL = await getDownloadURL(ref(storage, snap.ref.fullPath));
                } catch (err) {
                    console.log(err);
                }
            }

            // save message in message collection => document id identify => chat subcollection 
            addDocument('messages', id, 'chat', {
                message: textMessage || '',
                imgMessage: imageURL || '',
                from: currentUser.uid,
                photoURL: currentUser.photoURL,
                to: receiverMessage,
            });

            // save new message to last message collection
            // setDoc will create a document in a collection if it doesn't exist
            // if it exist, it will overwritten with new data
            setDocument('lastMessage', id, {
                message: textMessage || '',
                imgMessage: imageURL || '',
                from: currentUser.uid,
                photoURL: currentUser.photoURL,
                to: receiverMessage,
                createdAt: Timestamp.fromDate(new Date()),
                unRead: true
            });

            setTextMessage('');
            setImgMessage('');
        } else {
            return;
        }
    }

    return (
        <>
            <Header />
            <SideBar
                onHandleSelectUser={handleSelectUser}
                selectedUser={selectedUser}
            />
            <ChatWindow
                messages={messages}
                textMessage={textMessage}
                onSetTextMessage={setTextMessage}
                onSetImgMessage={setImgMessage}
                onHandleSubmitMessage={handleSubmitMessage}
                selectedUser={selectedUser} />
        </>
    );
};

export default HomePage; 