import React, { useState, useContext } from 'react';
import { Avatar, Tooltip, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import updateDocument from '../../services/firestore/updateDocument';
import { authentication } from '../../config/firebase.config';
import { AuthContext } from '../../context/AuthProvider';


const Header = () => {

    const navigate = useNavigate();
    // get user information from context api
    const user = useContext(AuthContext);
    // create a state to check should show or hidden option when user click on avatar
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    //handle logic show option when user click on avatar
    const handleShowOption = (event) => {
        setAnchorEl(event.currentTarget)
    }

    //handle close option
    const handleClose = () => {
        setAnchorEl(null);
    };

    // handle logic logout 
    const handleLogout = async () => {
        try {
            await signOut(authentication);
            updateDocument('users', user.uid, {
                isOnline: false
            })
            navigate('/login');
        } catch (err) {
            console.log(err);
        }
    }


    return (

        <div className='fixed top-0 left-0 right-0 flex justify-between items-center px-5 h-[50px] bg-[#464775] z-10 '>
            <h1 className='font-medium text-[20px] text-white'>React-Messenger</h1>

            <Tooltip title="Account settings">
                <IconButton
                    onClick={handleShowOption}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar
                        src={user.photoURL}
                        alt='avatar'
                        sx={{ width: 35, height: 35 }}
                    >
                        {user.photoURL ? '' : user?.displayName?.charAt(0).toUpperCase()}
                    </Avatar>
                    <p className='ml-[5px] text-white'>{user.displayName}</p>
                </IconButton>
            </Tooltip>


            {/*Menu section*/}
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 0.5,
                        width: '150px',
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            left: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => navigate('/profile')}>
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    Profile
                </MenuItem>

                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </div>

    );
};

export default Header;