import { domainUrl } from '@/utils/axios';
import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';

export default function HeaderSelectedChat() {
  const { openedUser } = useSelector((store) => store.user);
  return (
    <div className='flex gap-3 items-center border-b-2 border-gray-300 px-2 py-2'>
      <div className='avatar'>
        <div className='w-12 rounded-full '>
          <Image
            src={`${
              openedUser?.avatar?.startsWith('https')
                ? openedUser.avatar
                : domainUrl + openedUser?.avatar
            }`}
            alt='image'
            width={500}
            height={500}
            placeholder='blur'
            blurDataURL='/spinner.svg'
          />
        </div>
      </div>
      <div>
        <h2 className='truncate'>{openedUser?.username}</h2>
      </div>
    </div>
  );
}
