'use client';
import React, { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';

export default function SignUpWithGoogle() {
  return (
    <button className='btn btn-error text-error-content text-xs sm:text-base h-full btn-sm sm:btn-md   mt-4 sm:mt-6 capitalize font-bold w-full flex flex-wrap'>
      <FcGoogle />
      <span> continue with google</span>
    </button>
  );
}
