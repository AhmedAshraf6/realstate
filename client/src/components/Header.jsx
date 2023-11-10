import Link from 'next/link';
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { NavbarSign } from '.';
export default function Header() {
  return (
    <nav className='bg-base-300 shadow-md'>
      <div className=' align-element flex justify-between items-center py-2 gap-x-3'>
        <h1 className='font-bold text-sm sm:text-lg text-base-content flex flex-wrap gap-x-1'>
          <span>ahmed</span>
          <span>Estate</span>
        </h1>
        <form className='relative'>
          <div className='form-control '>
            <input
              type='text'
              placeholder='Search'
              className='input input-bordered  w-32 md:w-auto'
            />
          </div>
          <FaSearch className='text-lg text-base-content absolute top-3 right-5' />
        </form>
        <ul className='flex gap-4'>
          <Link href='/'>
            <li className='hidden sm:inline text-base-content hover:underline'>
              Home
            </li>
          </Link>
          <Link href='/about'>
            <li className='hidden sm:inline text-base-content hover:underline'>
              About
            </li>
          </Link>
          <NavbarSign />
        </ul>
      </div>
    </nav>
  );
}
