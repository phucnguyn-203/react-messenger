import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import * as yup from 'yup';

import SignInWithEmailAndPassword from '../../services/authentication/SignInWithEmailAndPassword';
import SignInWithProvider from '../../services/authentication/SignInWithProvider';
import google from '../../assets/img/google.svg';
import facebook from '../../assets/img/facebook.svg'
import TextField from '../../components/form/TextField';


const Login = () => {
    const navigate = useNavigate();

    // create validation schema
    const validationSchema = yup.object().shape({
        email: yup.string()
            .email("Email is invalid")
            .required("Email is required"),
        password: yup.string()
            .required("Password is require")
    })

    //using useForm hook to init react hook form
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(validationSchema)
    });


    // handle logic user login
    const onSubmit = data => {
        const { email, password } = data;
        SignInWithEmailAndPassword(email, password)
            .then(() => navigate('/'))
            .catch(err => {
                if (err.code === 'auth/wrong-password') {
                    toast.error('Please check the Password');
                }
                if (err.code === 'auth/user-not-found') {
                    toast.error('Please check the Email');
                }
            });
    }

    //handle google login
    const handleGoogleLogin = () => {
        const googleProvider = new GoogleAuthProvider();
        SignInWithProvider(googleProvider)
            .then(() => navigate('/'))
            .catch(err => console.log(err))
    }

    //handle facebook login 
    const handleFacebookLogin = () => {
        const facebookProvider = new FacebookAuthProvider();
        SignInWithProvider(facebookProvider)
            .then(() => navigate('/'))
            .catch(err => console.log(err))
    }

    return (
        <div className='flex justify-center items-center h-screen bg-gray-200'>
            <div className='w-[350px] min-h-[550px] bg-white p-[20px] rounded-lg'>

                <h1 className='font-medium text-[25px] text-center'>Sign In</h1>

                <div className='text-center border-b border-gray-300 pb-[30px]'>
                    <button onClick={handleGoogleLogin} className='flex justify-center items-center mt-[15px] py-[5px] border-[1px] rounded-md w-full shadow-sm'>
                        <img src={google} alt='google' className='mr-[10px]' />
                        Sign in with Google
                    </button>

                    <button onClick={handleFacebookLogin} className='flex justify-center items-center mt-[15px] py-[5px] border-[1px] rounded-md w-full shadow-sm text-white bg-[#356bc4]'>
                        <img src={facebook} alt='facebook' className='mr-[10px]' />
                        Sign in with FaceBook
                    </button>
                </div>

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
                        <TextField
                            label='Password'
                            type='password'
                            name='password'
                            id='password'
                            placeholder='Password'
                            register={register}
                            errors={errors}
                        />
                    </div>
                    <div className='mt-[20px]'>
                        <button type='submit' className='w-full py-[10px] shadow-md rounded-lg bg-blue-500 hover:bg-blue-400 text-white'>Sign in</button>
                    </div>

                </form>
                <Link to='/forgotpassword' className='block text-center my-4 text-blue-500'>Forgot Password?</Link>

                <div className='border-t text-center pt-4'>
                    <p className='text-gray-700'>Don't have an account?</p>
                    <Link to='/register' className='text-blue-500'>Sign up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;