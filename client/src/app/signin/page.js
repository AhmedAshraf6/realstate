'use client';
import {
  ButtonSubmit,
  InputField,
  SignUpWithGoogle,
  Title,
} from '@/components';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function SignIn() {
  return (
    <div className='align-element mt-10 sm:mt-15'>
      <div className='max-w-lg mx-auto text-center'>
        <Title title='Sign In' />
        <form className='flex flex-col gap-y-4 sm:gap-6'>
          <InputField placeHolder='Email' type='email' name='email' />
          <InputField placeHolder='Password' type='password' name='password' />
          <ButtonSubmit button='Sign Up' />
        </form>
        <SignUpWithGoogle />
        <div className='mt-4 sm:mt-6'>
          <span>have account already ?</span>
          <Link href='/signup' className='text-primary mx-2 whitespace-nowrap'>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
