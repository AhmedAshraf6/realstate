'use client';
import React from 'react';
import { BodySelectedChat, HeaderSelectedChat, InputSelectedChat } from '.';

export default function SelectedChat({ messages, chatId }) {
  return (
    <div className='sm:col-span-2 rounded-lg border-2  flex flex-col h-full'>
      <HeaderSelectedChat />
      <BodySelectedChat messages={messages} />
      <InputSelectedChat chatId={chatId} />
    </div>
  );
}
