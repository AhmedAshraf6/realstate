'use client';

import { useDispatch } from 'react-redux';
import { clearStore } from '../GlobalRedux/Features/user/userSlice';
import { useRouter } from 'next/navigation';
import { ButtonSubmit, InputField, Title } from '@/components';

export default function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();
  // dispatch(clearStore());
  // router.push('/signin');
  const handleSubmit = () => {
    return;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className='align-element mt-10 sm:mt-24'>
      <div className='max-w-lg mx-auto text-center'>
        <Title title='Profile' />
        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-y-4 sm:gap-6'
        >
          <InputField
            placeHolder='Username'
            type='text'
            name='username'
            handleChange={handleChange}
          />
          <InputField
            placeHolder='Email'
            type='email'
            name='email'
            handleChange={handleChange}
          />
          <InputField
            placeHolder='Password'
            type='password'
            name='password'
            handleChange={handleChange}
          />
          <ButtonSubmit button='Update' />
          <button
            className='btn btn-accent btn-sm sm:btn-md w-full text-xs sm:text-base'
            type='button'
          >
            Create Listing
          </button>
        </form>
        <div className='flex justify-between gap-2 mt-4 sm:mt-6'>
          <span className='text-error font-semibold cursor-pointer'>
            Delete Account
          </span>
          <span className='text-error font-semibold cursor-pointer'>
            Sign Out
          </span>
        </div>
      </div>
    </div>
  );
}
