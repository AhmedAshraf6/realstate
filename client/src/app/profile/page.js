'use client';

import { useDispatch, useSelector } from 'react-redux';
import { clearStore, loginUser } from '../GlobalRedux/Features/user/userSlice';
import { useRouter } from 'next/navigation';
import { AllListings, ButtonSubmit, InputField, Title } from '@/components';
import { useEffect, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import customFetch, {
  checkForUnauthorizedResponse,
  domainUrl,
} from '@/utils/axios';
import { toast } from 'react-toastify';
import { ConfirmModal } from '@/components/modals';
import Link from 'next/link';

export default function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.user);
  const [file, setFile] = useState('');
  const [mount, setMount] = useState(false);
  const [showListing, setShowListing] = useState(false);
  const [formData, setFormData] = useState({});
  const fileRef = useRef();
  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen((prev) => !prev);
  // dispatch(clearStore());
  // router.push('/signin');

  const {
    isLoading: isLoadingUpdateProfileImage,
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
      checkForUnauthorizedResponse({ error, dispatch, router });
    },
  });
  const { isLoading: isLoadingDeleteAccount, mutate: deleteAccount } =
    useMutation({
      mutationFn: async () => {
        const { data } = await customFetch.delete('/user/deleteUser');
        console.log(data);
        return data;
      },
      onSuccess: () => {
        dispatch(clearStore());
        router.push('/signin');
      },
      onError: (error) => {
        checkForUnauthorizedResponse({ error, dispatch, router });
      },
    });
  const {
    isLoading: isLoadingUpdateUser,
    data: dataUpdatedUser,
    mutate,
  } = useMutation({
    mutationFn: async (dataSend) => {
      const { data } = await customFetch.patch('/user/updateUser', dataSend);
      return data;
    },
    onSuccess: (data) => {
      dispatch(loginUser(data.user));
      toast.success('Updated Success');
    },
    onError: (error) => {
      checkForUnauthorizedResponse({ error, dispatch, router });
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const sendedData = {
      username: formData.username || user.username,
      email: formData.email || user.email,
      avatar: formData.avatar || user.avatar,
    };
    const { username, email, avatar } = sendedData;
    if (!username || !avatar || !email) {
      return toast.error('Please fill all fields');
    }
    mutate(sendedData);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
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

  return (
    <>
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
            src={`${
              formData.avatar
                ? domainUrl + formData.avatar
                : user?.avatar.startsWith('https')
                ? user?.avatar
                : domainUrl + user?.avatar
            }`}
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
              defaultValue={formData.username || user?.username}
              handleChange={handleChange}
            />
            <InputField
              placeHolder='Email'
              type='email'
              name='email'
              defaultValue={formData.email || user?.email}
              handleChange={handleChange}
            />

            <ButtonSubmit button='Update' isLoading={isLoadingUpdateUser} />
            <Link
              className='btn btn-accent btn-sm sm:btn-md w-full text-xs sm:text-base'
              href='profile/create-listing'
            >
              Create Listing
            </Link>
          </form>
          <div className='flex justify-between gap-2 mt-4 sm:mt-6'>
            <span
              className='text-error font-semibold cursor-pointer'
              onClick={handleToggle}
            >
              Delete Account
            </span>
            {/* Open the modal using document.getElementById('ID').showModal() method */}

            <span
              className='text-error font-semibold cursor-pointer'
              onClick={() => {
                dispatch(clearStore());
                router.push('/');
              }}
            >
              Sign Out
            </span>
          </div>
          {/* Show Listing */}
          <div className='mt-4 sm:mt-6'>
            <span
              className='text-accent font-semibold cursor-pointer'
              onClick={() => setShowListing(!showListing)}
            >
              Show listings
            </span>
            {showListing && <AllListings />}
          </div>
        </div>
      </div>
      {open && (
        <ConfirmModal
          open={open}
          handleToggle={handleToggle}
          confirm={deleteAccount}
        />
      )}
    </>
  );
}
