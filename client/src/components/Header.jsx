import Link from 'next/link';
import React from 'react';
import { ChatIcon, NavbarSign, SearchHeader, ToggleTheme } from '.';
export default function Header() {
  return (
    <nav className='bg-base-300 shadow-md'>
      <div className=' align-element flex justify-between items-center py-2 gap-x-3'>
        <Link
          className='font-bold text-sm sm:text-lg text-base-content flex flex-wrap gap-x-1'
          href='/'
        >
          <span>عقارات</span>
          <span>أحمد</span>
        </Link>
        <SearchHeader />
        <ul className='flex gap-4'>
          <li className='hidden sm:inline text-base-content hover:underline'>
            <Link href='/'>الرئيسية</Link>
          </li>

          <li className='hidden sm:inline text-base-content hover:underline'>
            <Link href='/about'>من نحن</Link>
          </li>
          <ChatIcon />
          <ToggleTheme />
          <NavbarSign />
        </ul>
      </div>
    </nav>
  );
}
