import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import * as yup from 'yup';

import CreateUserWithEmailAndPassword from '../../services/authentication/CreateUserWithEmailAndPassword';
import SignInWithProvider from '../../services/authentication/SignInWithProvider';
import google from '../../assets/img/google.svg';
import facebook from '../../assets/img/facebook.svg'
import TextField from '../../components/form/TextField';


const Register = () => {

    const navigate = useNavigate();
    // create register vadilation schema
    const vadilationSchema = yup.object().shape({
        name: yup.string()
            .required('Name is require')
            .max(15, 'Maximum 15 characters'),
        email: yup.string()
            .email('Email is invalid')
            .required('Email is require'),
        password: yup.string()
            .required('Password is require')
            .min(8, 'Password must have at least 8 characters')
            .matches(/(?=.*[0-9])/, 'Password must have at least a number')
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(vadilationSchema)
    })

    // handle logic register user with email and password
    const onSubmit = data => {
        const { name, email, password } = data;
        CreateUserWithEmailAndPassword(name, email, password)
            .then(() => navigate('/'))
            .catch(err => {
                if (err.code === 'auth/email-already-in-use') {
                    toast.error('Email Already in Use');
                }
            })
    }

    // handle logic user register with Google
    const handleGoogleSignUp = () => {
        const googleProvider = new GoogleAuthProvider();
        SignInWithProvider(googleProvider)
            .then(() => navigate('/'))
            .catch(err => console.log(err))
    }

    // handle logic user register with FaceBook
    const handleFacebookSignUp = () => {
        const facebookProvider = new FacebookAuthProvider();
        SignInWithProvider(facebookProvider)
            .then(() => navigate('/'))
            .catch(err => console.log(err))
    }

    return (

        <div className='flex justify-center items-center h-screen bg-gray-200'>
            <div className='w-[350px] min-h-[550px] bg-white p-[20px] rounded-lg'>

                <h1 className='font-medium text-[25px] text-center'>Sign Up</h1>

                <div className='text-center border-b border-gray-300 pb-[30px]'>
                    <button onClick={handleGoogleSignUp} className='flex justify-center items-center mt-[15px] py-[5px] border-[1px] rounded-md w-full shadow-sm'>
                        <img src={google} alt='google' className='mr-[10px]' />
                        Sign up with Google
                    </button>

                    <button onClick={handleFacebookSignUp} className='flex justify-center items-center mt-[15px] py-[5px] border-[1px] rounded-md w-full shadow-sm text-white bg-[#356bc4]'>
                        <img src={facebook} alt='facebook' className='mr-[10px]' />
                        Sign up with FaceBook
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mt-[20px]'>
                        <TextField
                            label='Name'
                            type='text'
                            name='name'
                            id='name'
                            placeholder='Name'
                            register={register}
                            errors={errors}
                        />
                    </div>

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
                            placeholder='at least 8 characters'
                            register={register}
                            errors={errors}
                        />
                    </div>

                    <div className='mt-[20px]'>
                        <button type='submit' className='w-full py-[10px] shadow-md rounded-lg bg-blue-500 hover:bg-blue-400 text-white'>Sign up</button>
                    </div>

                </form>

                <div className='border-t text-center pt-4 mt-5'>
                    <p className='text-gray-700'>Already have an account?</p>
                    <Link to='/login' className='text-blue-500'>Sign in</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;