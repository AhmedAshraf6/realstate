'use client';
import { SelectedChat, UserChats } from '@/components';
import React, { useEffect, useState } from 'react';

export default function Chat() {
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
      <h3>select chat</h3>
    </div>
  );
}
