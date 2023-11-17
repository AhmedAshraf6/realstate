'use client';
import React from 'react';
import customFetch from '@/utils/axios';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenedUser } from '@/app/GlobalRedux/Features/user/userSlice';

export default function ButtonContactWithSeller({ sellerId }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
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
      router.push(`/chat/user/${data._id}`);
    },
  });
  return (
    <button
      className='btn btn-neutral  self-start'
      onClick={() => mutate(sellerId)}
    >
      Contact with seller
    </button>
  );
}
