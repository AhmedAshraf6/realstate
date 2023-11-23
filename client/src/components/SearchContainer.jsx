'use client';
import React from 'react';
import { InputField, SelectField } from '.';
import { useDispatch, useSelector } from 'react-redux';
import { handleChange } from '@/app/GlobalRedux/Features/filters/filterSlice';
import CheckField from './CheckField';

const SearchContainer = () => {
  const { search, type, offer, furnished, parking, sort, sortOptions } =
    useSelector((store) => store.filters);
  const dispatch = useDispatch();
  const handleSearch = (e) => {
    const { name, value, checked, type } = e.target;
    if (name === 'sale' || name === 'rent' || name === 'all') {
      dispatch(handleChange({ name: 'type', value: name }));
      return;
    }
    if (name === 'furnished' || name === 'parking' || name === 'offer') {
      dispatch(handleChange({ name, value: checked }));
      return;
    }
    dispatch(handleChange({ name, value }));
  };
  return (
    <form className='col-span-1 flex flex-col gap-3 mt-4 p-6'>
      <InputField
        placeHolder='ابحث...'
        type='text'
        name='search'
        value={search}
        handleChange={handleSearch}
      />
      <span className='font-bold'> النوع:</span>
      <div className='flex flex-wrap gap-3'>
        <CheckField
          name='all'
          handleChange={handleSearch}
          checked={type === 'all'}
          label='ايجار&بيع'
        />
        <CheckField
          name='rent'
          handleChange={handleSearch}
          checked={type === 'rent'}
          label='ايجار'
        />
        <CheckField
          name='sale'
          handleChange={handleSearch}
          checked={type === 'sale'}
          label='بيع'
        />
      </div>
      <span className='font-bold'> خيارات اضافية:</span>
      <div className='flex flex-wrap gap-3'>
        <CheckField
          name='offer'
          handleChange={handleSearch}
          checked={offer}
          label='عرض'
        />
        <CheckField
          name='furnished'
          handleChange={handleSearch}
          checked={furnished}
          label='مفروشة'
        />
        <CheckField
          name='parking'
          handleChange={handleSearch}
          checked={parking}
          label='ركن للعربية'
        />
      </div>
      <span className='font-bold'> ترتيب:</span>
      <div className='flex flex-wrap gap-3'>
        <SelectField
          name='sort'
          value={sort}
          handleChange={handleSearch}
          options={sortOptions}
        />
      </div>
    </form>
  );
};

export default SearchContainer;
