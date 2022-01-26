import React, { useState, useEffect, useRef } from 'react';
import { IconButton, TextareaAutosize, Button, ClickAwayListener } from '@mui/material';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SendIcon from '@mui/icons-material/Send';
import ImageIcon from '@mui/icons-material/Image';
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";


const MessageForm = ({ textMessage, onHandleSubmitMessage, onSetTextMessage, onSetImgMessage }) => {

    // state to show emoji picker
    const [isShowEmojiPicker, setIsShowEmojiPicker] = useState(false);
    const inputMessageRef = useRef();

    useEffect(() => {
        inputMessageRef?.current?.focus();
    }, [textMessage]);


    return (
        <div className='absolute flex items-center bottom-4 left-[50%] translate-x-[-50%] w-[100%] px-[10px] z-50'>
            <label htmlFor="icon-button-file">
                <input
                    className='hidden'
                    id="icon-button-file"
                    type="file"
                    onChange={(event) => onSetImgMessage(event.target.files[0])}
                />
                <IconButton color='primary' aria-label="send-image" component="span">
                    <ImageIcon />
                </IconButton>
            </label>

            <ClickAwayListener onClickAway={() => setIsShowEmojiPicker(false)}>
                <div>
                    <IconButton
                        color='primary'
                        onClick={() => setIsShowEmojiPicker(!isShowEmojiPicker)}
                    >
                        <EmojiEmotionsIcon />
                    </IconButton>

                    {/*condition to show emoji picker*/}
                    {isShowEmojiPicker && <Picker
                        set='facebook'
                        title='Pick your emoji'
                        style={{
                            position: 'absolute',
                            bottom: '50px'
                        }}
                        onSelect={emoji => {
                            onSetTextMessage(prevState => (
                                prevState + emoji.native
                            ))
                        }}
                    />
                    }
                </div>
            </ClickAwayListener>
            <TextareaAutosize
                ref={inputMessageRef}
                maxRows={2}
                aria-label="empty textarea"
                value={textMessage}
                placeholder='Aa'
                className='outline-none flex-1 border rounded-2xl mr-[20px] px-[10px] py-[7px] bg-gray-200 placeholder:text-gray-500'
                onChange={event => onSetTextMessage(event.target.value)}
            />
            <Button
                onClick={() => {
                    onHandleSubmitMessage()
                    setIsShowEmojiPicker(false);
                }}
                variant='contained'
                endIcon={<SendIcon />}
                sx={{ borderRadius: '10px' }}
            >
                Send
            </Button>
        </div>
    );
};

export default MessageForm;