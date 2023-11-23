'use client';
import React from 'react';
import customFetch from '@/utils/axios';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import {
  newChat,
  setOpenedUser,
} from '@/app/GlobalRedux/Features/user/userSlice';
import { useMainContext } from '@/contexts/MainContext';

export default function ButtonContactWithSeller({ sellerId }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const { socket } = useMainContext();
  const { mutate } = useMutation({
    mutationFn: async (id) => {
      const { data } = await customFetch.post('/chat', {
        receiverId: id,
      });
      return data.chat;
    },
    onSuccess: (data) => {
      const openedUser = data.members.find(
        (member) => member._id !== user.userId
      );
      dispatch(setOpenedUser(openedUser));
      socket.emit('addUser', user.userId);
      socket.emit('addChat', {
        sender: {
          username: user.username,
          avatar: user.avatar,
          _id: user.userId,
        },
        _id: data._id,
        receiverId: openedUser._id,
      });
      // dispatch(
      //   newChat({
      //     _id: data._id,
      //     members: [openedUser],
      //     lastMessage: {
      //       test: '',
      //     },
      //   })
      // );

      router.push(`/chat/user/${data._id}`);
    },
  });
  return (
    <button
      className='btn btn-neutral  self-start'
      onClick={() => mutate(sellerId)}
    >
      تواصل مع البائع
    </button>
  );
}
