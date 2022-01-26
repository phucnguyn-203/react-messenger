/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Avatar, IconButton, Badge, TextField, Button } from '@mui/material';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, getDoc } from 'firebase/firestore';
import { updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import EditIcon from '@mui/icons-material/Edit';


import Loading from '../../components/Loading';
import updateDocument from '../../services/firestore/updateDocument';
import { database, authentication, storage } from '../../config/firebase.config';

const Profile = () => {

    //get user info
    const [user, setUser] = useState();
    const [img, setImg] = useState();
    // state to store info user update 
    const [changeDisplayName, setchangeDisplayName] = useState('');
    const [changeEmail, setChangeEmail] = useState('');
    const [newPassoword, setNewPassword] = useState('');


    //side effect
    useEffect(() => {

        getDoc(doc(database, 'users', authentication.currentUser.uid)).then(docSnap => {
            if (docSnap.exists()) {
                setUser(docSnap.data());
            }
        })

        const upLoadImg = async () => {
            if (img) {
                //create avatar reference
                const avatarRef = ref(storage, `avatars/${new Date().getTime}-${img.name}`);
                try {
                    // upload avatar
                    const snap = await uploadBytes(avatarRef, img);
                    //get download url to update field avatar in firestore
                    const url = await getDownloadURL(ref(storage, snap.ref.fullPath));

                    // update document in firestore 
                    updateDocument('users', user?.uid, {
                        photoURL: url
                    })
                    //update profile in firebase authentication
                    await updateProfile(authentication.currentUser, {
                        photoURL: url,
                    });
                    //set state to re render 
                    setImg('');
                } catch (err) {
                    console.log(err)
                }
            }
        }
        upLoadImg();
    }, [img])


    //handle logic update profile
    const handleUpdateProfile = async () => {
        try {
            // update profile in firebase authentication
            await updateProfile(authentication.currentUser, {
                displayName: changeDisplayName || user?.displayName,
            });

            //update email in firebase authentication
            await updateEmail(authentication.currentUser, changeEmail || user?.email);
            //update data in firestore
            updateDocument('users', user?.uid, {
                displayName: changeDisplayName || user?.displayName,
                email: changeEmail || user?.email
            })

            if (newPassoword) {
                await updatePassword(authentication.currentUser, newPassoword);
            }
            toast.success('Update Successful');
            // reset state
            setChangeEmail('');
            setChangeEmail('');
            setNewPassword('');
        } catch (err) {
            if (err.code === 'auth/email-already-in-use') {
                toast.error('Please Check Your Email. Email Already In Use');
            }
        }
    }


    return user ? (<div className='flex justify-center items-center bg-gray-200 h-screen'>
        <div className='w-[400px] max-h-[550px] bg-white rounded-lg p-[20px]'>
            <div className='flex items-center'>
                <EditIcon />
                <h1 className='inline-block text-[20px] font-medium ml-[10px]'>
                    Edit Profile
                </h1>
            </div>
            <div className='text-center'>
                <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                        <label htmlFor="icon-button-file" className='bg-gray-200 rounded-full'>
                            <input onChange={(event) => setImg(event.target.files[0])} className='hidden' id="icon-button-file" type="file" />
                            <IconButton aria-label="upload picture" component="span">
                                <PhotoCamera />
                            </IconButton>
                        </label>
                    }
                >
                    <Avatar
                        src={user?.photoURL}
                        alt={user?.displayName}
                        sx={{
                            width: '120px',
                            height: '120px',
                            margin: '0 auto',
                            border: '0.1px solid lightgray',
                        }}
                    >
                        {user?.photoURL ? '' : user?.displayName?.charAt(0)?.toUpperCase()}
                    </Avatar>
                </Badge>
            </div>

            <div className='mt-[30px]'>
                <TextField
                    id='name'
                    label='Name'
                    defaultValue={user?.displayName}
                    variant='standard'
                    fullWidth
                    margin="normal"
                    onChange={(event) => setchangeDisplayName(event.target.value)}
                />
                <TextField
                    id='email'
                    label='Email'
                    defaultValue={user?.email}
                    variant='standard'
                    fullWidth
                    margin="normal"
                    onChange={(event) => setChangeEmail(event.target.value)}
                />
                {user?.providerId === 'firebase' && (<TextField
                    id='Change Passoword'
                    label='Change Password'
                    type='password'
                    variant='standard'
                    fullWidth
                    margin="normal"
                    onChange={(event) => setNewPassword(event.target.value)}
                />)}
            </div>
            <div className='text-center mt-[30px]'>
                <Button
                    variant="contained"
                    size='large'
                    onClick={handleUpdateProfile}
                >
                    Update Profile
                </Button>
            </div>
        </div>
    </div>) : <Loading />
};

export default Profile;