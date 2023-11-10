'use client';
import {
  ButtonSubmit,
  InputField,
  SignUpWithGoogle,
  Title,
} from '@/components';
import customFetch from '@/utils/axios';
import { addUserToLocalStorage } from '@/utils/localStorage';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { loginUser } from '../GlobalRedux/Features/user/userSlice';

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const { isLoading, data, mutate } = useMutation({
    mutationFn: async (dataSend) => {
      const { data } = await customFetch.post('/auth/signup', dataSend);
      return data;
    },
    onSuccess: (data) => {
      Cookies.set('token', data.token, {
        expires: 1,
        secure: true,
      });
      dispatch(loginUser(data.user));
      router.push('/');
    },
    onError: (error) => {
      checkForUnauthorizedResponse(error, dispatch);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, username } = formData;
    if (!email || !password || !username) {
      return toast.error('Please fill all fields');
    }
    mutate(formData);
  };

  return (
    <div className='align-element mt-10 sm:mt-15'>
      <div className='max-w-lg mx-auto text-center'>
        <Title title='Sign Up' />
        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-y-4 sm:gap-6'
        >
          <InputField
            placeHolder='Email'
            type='email'
            name='email'
            handleChange={handleChange}
          />
          <InputField
            placeHolder='Username'
            type='text'
            name='username'
            handleChange={handleChange}
          />
          <InputField
            placeHolder='Password'
            type='password'
            name='password'
            handleChange={handleChange}
          />
          <ButtonSubmit button='Sign Up' isLoading={isLoading} />
        </form>
        <SignUpWithGoogle />
        <div className='mt-4 sm:mt-6'>
          <span>have account already ?</span>
          <Link href='/signin' className='text-primary mx-2 whitespace-nowrap'>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
