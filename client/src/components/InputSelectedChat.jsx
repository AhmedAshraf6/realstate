'use client';
import React, { useEffect, useRef, useState } from 'react';
import { MdAttachFile } from 'react-icons/md';
import { LuSendHorizonal } from 'react-icons/lu';
import customFetch, { checkForUnauthorizedResponse } from '@/utils/axios';
import { useDispatch, useSelector } from 'react-redux';
import { useMainContext } from '@/contexts/MainContext';
import {
  updateLastMessage,
  updateMessages,
} from '@/app/GlobalRedux/Features/user/userSlice';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function InputSelectedChat({ chatId }) {
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState({});
  const fileRef = useRef();
  const { user, openedUser } = useSelector((store) => store.user);
  const { socket } = useMainContext();
  const dispatch = useDispatch();
  const router = useRouter();
  // handle submit
  const hadnleSubmit = async (e) => {
    e.preventDefault();
    if (!message) {
      return;
    }
    try {
      socket.emit('sendMessage', {
        senderId: user.userId,
        receiverId: openedUser._id,
        text: message,
        chatId,
      });
      dispatch(
        updateMessages({
          _id: Date.now().toString(),
          text: message,
          createdAt: Date.now(),
          sender: { _id: user.userId, avatar: user.avatar },
        })
      );
      dispatch(
        updateLastMessage({ chatToUpdateId: chatId, keyMsg: 'text', message })
      );
      setMessage('');
      const data = await customFetch.post(`/message/${chatId}`, {
        text: message,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleUploadImages = (e) => {
    if (Object.keys(files).length > 0 && Object.keys(files).length < 7) {
      const data = new FormData();
      [...files].forEach((file, i) => {
        data.append(`file-${i}`, file, file.name);
      });
      uploadImages(data);
    } else {
      toast.error('images must be less than 7 images');
    }
  };
  const {
    isLoading: isLoadingUploadImages,
    data,
    mutate: uploadImages,
  } = useMutation({
    mutationFn: async (tempImages) => {
      const { data } = await customFetch.post(
        '/listing/uploadListingImages',
        tempImages
      );
      return data;
    },
    onSuccess: (data) => {
      socket.emit('sendMessage', {
        senderId: user.userId,
        receiverId: openedUser._id,
        images: data.images,
        chatId,
      });
      dispatch(
        updateMessages({
          _id: Date.now().toString(),
          attachments: data.images,
          createdAt: Date.now(),
          sender: { _id: user.userId, avatar: user.avatar },
        })
      );
      dispatch(
        updateLastMessage({
          chatToUpdateId: chatId,
          message: data.images,
          keyMsg: 'attachments',
        })
      );
      handleSubmitImages(data.images);
    },
    onError: (error) => {
      checkForUnauthorizedResponse({ error, dispatch, router });
    },
  });
  const {
    isLoading: isLoadingSubmitImages,
    data: dataSubmitImages,
    mutate: handleSubmitImages,
  } = useMutation({
    mutationFn: async (images) => {
      console.log(images);
      console.log(images);
      const { data } = await customFetch.post(`/message/${chatId}`, {
        attachments: images,
      });
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      checkForUnauthorizedResponse({ error, dispatch, router });
    },
  });
  useEffect(() => {
    Object.keys(files).length > 0 && handleUploadImages();
  }, [files]);
  return (
    <form className='flex'>
      <input
        onChange={(e) => setFiles(e.target.files)}
        type='file'
        ref={fileRef}
        hidden
        accept='image/*'
        multiple
      />
      <MdAttachFile
        className=' relative right-2  top-1/2 -translate-y-[50%] cursor-pointer text-xl'
        onClick={() => fileRef.current.click()}
      />
      <div className='form-control focus:border-none  flex-grow'>
        <input
          placeholder='اكتب رسالة ...'
          className='input  input-sm sm:input-md w-full focus:outline-none'
          type='text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button
        type='submit'
        onClick={hadnleSubmit}
        className='relative left-2  top-1/2 -translate-y-[50%]'
      >
        <LuSendHorizonal className=' cursor-pointer text-xl' />
      </button>
    </form>
  );
}
