'use client';
import { domainUrl } from '@/utils/axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function NavbarSign() {
  const { user } = useSelector((state) => state.user);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);
  if (!mount) {
    return;
  }
  return (
    <Link href={user?.username ? '/profile' : '/signin'}>
      {user?.username ? (
        <img
          src={`${
            user.avatar.startsWith('https')
              ? user.avatar
              : domainUrl + user.avatar
          }`}
          alt='profile'
          className='w-7 h-7 rounded-full object-cover'
        />
      ) : (
        <li className='hidden sm:inline text-base-content hover:underline'>
          Sign In
        </li>
      )}
    </Link>
  );
}
