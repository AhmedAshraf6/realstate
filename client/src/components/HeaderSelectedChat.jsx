import { domainUrl } from '@/utils/axios';
import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';

export default function HeaderSelectedChat() {
  const { openedUser } = useSelector((store) => store.user);
  return (
    <div className='flex gap-3 items-center border-b-2 border-gray-300 px-2 y-4'>
      <div className='rounded-full'>
        <Image
          src={`${domainUrl + openedUser.avatar}`}
          alt='image'
          className='w-12 h-12 rounded-full'
          width={500}
          height={500}
          placeholder='blur'
          blurDataURL='/spinner.svg'
        />
      </div>
      <div>
        <h2 className='truncate'>{openedUser?.username}</h2>
      </div>
    </div>
  );
}
