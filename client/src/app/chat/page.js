'use client';
import { UserChats } from '@/components';
import { useMainContext } from '@/contexts/MainContext';
import customFetch from '@/utils/axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
      <h3>اختر محادثة لعرضها</h3>
    </div>
  );
}
