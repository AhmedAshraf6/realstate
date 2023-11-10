'use client';

import { useDispatch, useSelector } from 'react-redux';
import { clearStore } from '../GlobalRedux/Features/user/userSlice';
import { useRouter } from 'next/navigation';
import { ButtonSubmit, InputField, Title } from '@/components';
import { useEffect, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import customFetch from '@/utils/axios';

export default function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.user);
  const [file, setFile] = useState('');
  const [mount, setMount] = useState(false);
  const [formData, setFormData] = useState({});
  const fileRef = useRef();
  // dispatch(clearStore());
  // router.push('/signin');
  const handleSubmit = () => {
    return;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const {
    isLoading,
    data,
    mutate: uploadProfileImage,
  } = useMutation({
    mutationFn: async () => {
      const imageUpload = new FormData();
      imageUpload.append('image', file);
      const { data } = await customFetch.post(
        '/user/uploadProfileImage',
        imageUpload
      );
      console.log(data);
      return data;
    },
    onSuccess: (data) => {
      setFormData({ ...formData, avatar: data.image.src });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  useEffect(() => {
    if (file) {
      uploadProfileImage(file);
    }
  }, [file]);
  useEffect(() => {
    setMount(true);
  }, []);
  if (!mount) {
    return;
  }
  console.log(formData);
  return (
    <div className='align-element mt-10 sm:mt-24'>
      <div className='max-w-lg mx-auto text-center'>
        <Title title='Profile' />
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
        />
        <img
          src={
            formData.avatar
              ? `http://localhost:5000${formData.avatar}`
              : user.avatar
          }
          onClick={() => fileRef.current.click()}
          alt='profile'
          className='rounded-full w-24 h-24 object-cover cursor-pointer my-4 sm:my-6 mx-auto'
        />

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
