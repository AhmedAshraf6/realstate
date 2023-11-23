'use client';
import React, { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '@/app/firebase';
import { useMutation } from '@tanstack/react-query';
import customFetch, { checkForUnauthorizedResponse } from '@/utils/axios';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { loginUser } from '@/app/GlobalRedux/Features/user/userSlice';
import { useRouter } from 'next/navigation';
export default function SignUpWithGoogle() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoading, mutate } = useMutation({
    mutationFn: async ({ displayName, email, photoURL }) => {
      const { data } = await customFetch.post('/auth/google', {
        displayName,
        email,
        photoURL,
      });
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
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const { displayName, email, photoURL } = result.user;
      mutate({ displayName, email, photoURL });
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <button
      type='button'
      onClick={handleGoogleClick}
      className='btn btn-error text-error-content text-xs sm:text-base h-full btn-sm sm:btn-md mt-4 sm:mt-6 capitalize font-bold w-full flex flex-wrap'
    >
      <span> متابعة باستخدام جوجل</span>
      <FcGoogle />
    </button>
  );
}
