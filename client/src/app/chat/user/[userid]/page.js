'use client';
import { SelectedChat, UserChats } from '@/components';
import customFetch from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Chat({ params }) {
  const { user } = useSelector((store) => store.user);
  const { isLoading, data } = useQuery({
    queryKey: ['allChats', params.userid],
    queryFn: async () => {
      const { data } = await customFetch(`/message/${params.userid}`);
      return data.messages;
    },
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
  });
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
      <SelectedChat messages={data} chatId={params.userid} />
    </div>
  );
}
