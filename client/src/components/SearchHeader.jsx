'use client';
import { handleChange } from '@/app/GlobalRedux/Features/filters/filterSlice';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

export default function SearchHeader() {
  const { search } = useSelector((store) => store.filters);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('search');
  };
  const handleSearch = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };
  return (
    <form className='relative' onSubmit={handleSubmit}>
      <div className='form-control '>
        <input
          type='text'
          placeholder='بحث'
          className='input input-bordered input-sm sm:input-md w-32 md:w-auto'
          name='search'
          value={search}
          onChange={handleSearch}
        />
      </div>
      <FaSearch
        type='submit'
        className='text-lg text-base-content absolute top-2 sm:top-3 left-5'
      />
    </form>
  );
}
