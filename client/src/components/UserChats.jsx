'use client';
import { setOpenedUser } from '@/app/GlobalRedux/Features/user/userSlice';
import customFetch, { domainUrl } from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function UserChats() {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const { isLoading, data } = useQuery({
    queryKey: ['allChats'],
    queryFn: async () => {
      const { data } = await customFetch('/chat');
      console.log(data);
      return data;
    },
  });
  return (
    <div className='col-span-1 rounded-lg border-2 h-[calc(100vh-64px)]  overflow-y-auto'>
      <h3 className='font-semibold bg-base-300 px-2 py-4 border-b-2 border-gray-300'>
        Inbox
      </h3>
      <div className='flex flex-col gap-3  overflow-y-auto'>
        {/* User */}
        {data?.chats?.map((chat) => {
          const rightUser = chat.members.find(
            (member) => member._id !== user.userId
          );

          return (
            <Link
              className='flex gap-3 items-start border-b-2 border-gray-300 p-2'
              key={chat._id}
              href={`/chat/user/${chat._id}`}
              onClick={() => dispatch(setOpenedUser(rightUser))}
            >
              <div className='rounded-full'>
                <Image
                  src={`${domainUrl + rightUser.avatar}`}
                  alt='image'
                  className='w-12 h-12 rounded-full'
                  width={500}
                  height={500}
                  placeholder='blur'
                  blurDataURL='/spinner.svg'
                />
              </div>
              <div>
                <h2 className='truncate'>{rightUser.username}</h2>
                <span className='text-gray-300'>last message</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
