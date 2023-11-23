'use client';

import {
  BodySelectedChat,
  HeaderSelectedChat,
  InputSelectedChat,
  UserChats,
} from '@/components';

import React, { useEffect, useState } from 'react';

export default function User({ params }) {
  const [mount, setMount] = useState(false);
  useEffect(() => {
    setMount(true);
  }, []);
  if (!mount) {
    return;
  }
  return (
    <div className='align-element grid grid-cols-3 h-[calc(100vh-64px)]'>
      <UserChats />
      <div className='sm:col-span-2 rounded-lg border-2  flex flex-col h-[calc(100vh-64px)]'>
        <HeaderSelectedChat />
        <BodySelectedChat chatId={params.chatid} />
        <InputSelectedChat chatId={params.chatid} />
      </div>
    </div>
  );
}
