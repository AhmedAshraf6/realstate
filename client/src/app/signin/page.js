'use client';
import {
  ButtonSubmit,
  InputField,
  SignUpWithGoogle,
  Title,
} from '@/components';
import customFetch, { checkForUnauthorizedResponse } from '@/utils/axios';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { loginUser } from '../GlobalRedux/Features/user/userSlice';
import { useMainContext } from '@/contexts/MainContext';

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const { socket } = useMainContext();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const { isLoading, data, mutate } = useMutation({
    mutationFn: async (dataSend) => {
      const { data } = await customFetch.post('/auth/signin', dataSend);
      return data;
    },
    onSuccess: (data) => {
      Cookies.set('token', data.token, {
        expires: 1,
        secure: true,
      });
      dispatch(loginUser(data.user));
      socket.emit('addUser', data.user.userId);
      router.push('/');
    },
    onError: (error) => {
      console.log(error);
      checkForUnauthorizedResponse({ error, dispatch, router });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      return toast.error('Please fill all fields');
    }
    mutate(formData);
  };

  return (
    <div className='align-element mt-10 sm:mt-15'>
      <div className='max-w-lg mx-auto text-center'>
        <Title title='تسجيل دخول' />
        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-y-4 sm:gap-6'
        >
          <InputField
            placeHolder='البريد الالكتروني'
            type='email'
            name='email'
            handleChange={handleChange}
          />
          <InputField
            placeHolder='كلمة السر'
            type='password'
            name='password'
            handleChange={handleChange}
          />
          <ButtonSubmit button='تسجيل دخول' isLoading={isLoading} />
        </form>
        <SignUpWithGoogle />
        <div className='mt-4 sm:mt-6'>
          <span>ليس لديك حساب؟</span>
          <Link href='/signup' className='text-primary mx-2 whitespace-nowrap'>
            تسجيل حساب
          </Link>
        </div>
      </div>
    </div>
  );
}
