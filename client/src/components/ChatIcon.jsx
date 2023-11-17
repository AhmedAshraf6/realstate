'use client';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import Link from 'next/link';
export default function ChatIcon() {
  const { user } = useSelector((state) => state.user);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);
  if (!mount) {
    return;
  }
  return (
    <div>
      {mount && user?.username ? (
        <Link href='/chat'>
          <IoChatbubbleEllipsesOutline className='w-6 h-6 ' />
        </Link>
      ) : (
        ''
      )}
    </div>
  );
}
