import Link from 'next/link';
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { ChatIcon, NavbarSign } from '.';
export default function Header() {
  return (
    <nav className='bg-base-300 shadow-md'>
      <div className=' align-element flex justify-between items-center py-2 gap-x-3'>
        <Link
          className='font-bold text-sm sm:text-lg text-base-content flex flex-wrap gap-x-1'
          href='/'
        >
          <span>ahmed</span>
          <span>Estate</span>
        </Link>
        <form className='relative'>
          <div className='form-control '>
            <input
              type='text'
              placeholder='Search'
              className='input input-bordered input-sm sm:input-md w-32 md:w-auto'
            />
          </div>
          <FaSearch className='text-lg text-base-content absolute top-2 sm:top-3 right-5' />
        </form>
        <ul className='flex gap-4'>
          <li className='hidden sm:inline text-base-content hover:underline'>
            <Link href='/'>Home</Link>
          </li>

          <li className='hidden sm:inline text-base-content hover:underline'>
            <Link href='/about'>About</Link>
          </li>
          <ChatIcon />
          <NavbarSign />
        </ul>
      </div>
    </nav>
  );
}
