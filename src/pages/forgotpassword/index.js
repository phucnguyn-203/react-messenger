import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import SendPasswordResetEmail from '../../services/authentication/SendPasswordResetEmail';
import TextField from '../../components/form/TextField';

const ForgotPassword = () => {
    const navigate = useNavigate();
    // create validation schema
    const validationSchema = yup.object().shape({
        email: yup.string()
            .email("Email is invalid")
            .required("Email is required")
    })

    //using useForm hook to init react hook form
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(validationSchema)
    });


    // logic handle submit form
    const onSubmit = data => {
        const { email } = data;
        SendPasswordResetEmail(email)
            .then(() => {
                toast.success('Password reset email sent!');
                navigate('/login');
            })
            .catch(err => {
                if (err.code === 'auth/user-not-found') {
                    toast.error('Please check the Email')
                }
            })
    }
    
    return (
        <div className='flex justify-center items-center h-screen bg-gray-200'>
            <div className='w-[400px] h-[300px] bg-white p-[20px] rounded-lg'>
                <h1 className='font-medium text-[25px] text-center'>Forgot Password</h1>
                <p className='text-center mt-[5px]'>Enter your email address</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mt-[20px]'>
                        <TextField
                            label='Email'
                            type='email'
                            name='email'
                            id='email'
                            placeholder='example@gmail.com'
                            register={register}
                            errors={errors}
                        />
                    </div>

                    <div className='mt-[20px]'>
                        <button type='submit' className='w-full py-[10px] shadow-md rounded-lg bg-blue-500 hover:bg-blue-400 text-white'>Send password reset link</button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;