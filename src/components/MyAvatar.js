import React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';

// overwrite style material ui component using material style api
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

const MyAvatar = ({ isOnline, photoURL, displayName }) => {
    return (
        <>
            <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant={`${isOnline ? 'dot' : ''}`}
            >
                <Avatar
                    src={photoURL}
                    alt='avatar'
                    sx={{ width: 50, height: 50 }}
                >
                    {photoURL ? '' : displayName.charAt(0).toUpperCase()}
                </Avatar>
            </StyledBadge>
        </>
    );
};

export default MyAvatar;