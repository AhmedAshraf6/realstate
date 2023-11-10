'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function NavbarSign() {
  const { user } = useSelector((state) => state.user);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  });
  if (!mount) {
    return;
  }
  return (
    <Link href={user?.username ? '/profile' : '/signin'}>
      <li className='hidden sm:inline text-base-content hover:underline'>
        {user?.username ? user?.username : 'Sign in'}
      </li>
    </Link>
  );
}
