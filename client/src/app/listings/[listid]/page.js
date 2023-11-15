import { SingleListSlider } from '@/components';
import { domainUrl } from '@/utils/axios';
import React from 'react';

import { IoLocationSharp } from 'react-icons/io5';
import { TbBedFilled } from 'react-icons/tb';
import { FaBath } from 'react-icons/fa6';
import { RiParkingBoxFill } from 'react-icons/ri';
import { MdChair } from 'react-icons/md';

async function getData(listId) {
  const res = await fetch(`${domainUrl}/api/v1/listing/${listId}`, {
    cache: 'no-store',
  });

  return res.json();
}

export default async function page({ params }) {
  const { singleList } = await getData(params.listid);
  return (
    <div>
      <SingleListSlider images={singleList?.imageUrls} />
      {/* Slider */}
      <div className='align-element mt-10 mt:15 flex flex-col gap-3 sm:gap-5'>
        <div className='flex items-center'>
          <div className='text-lg sm:text-2xl font-semibold flex gap-3 items-center'>
            <h1> {singleList?.name}</h1>
            <span>-</span>
            <span className='font-bold'>${singleList?.regularPrice}</span>
          </div>
        </div>
        <p className='flex gap-2 items-center'>
          <IoLocationSharp className='text-accent' />
          <span className='text-gray-500 font-semibold'>
            {singleList?.address}
          </span>
        </p>
        <div className='flex flex-wrap sm:flex-nowrap items-start gap-2 '>
          <div className='badge badge-error '>
            <span className='font-semibold '>
              For {singleList?.type === 'sale' ? 'Sale' : 'Rent'}
            </span>
          </div>
          {singleList?.discountedPrice > 0 && (
            <div className='badge badge-accent'>
              {singleList?.discountedPrice} discount
            </div>
          )}
        </div>
        <div className='flex flex-wrap sm:flex-nowrap gap-2 max-w-2xl '>
          <span className='font-bold'>Description</span>
          <p className=' text-gray-700'>-{singleList?.description}</p>
        </div>
        <div className='flex flex-wrap gap-4 sm:gap-6'>
          <div className='flex items-center text-accent font-semibold'>
            <TbBedFilled className='text-xl' />
            <span>
              {singleList?.bedrooms} Bed
              {singleList?.bedrooms.length > 1 && 's'}
            </span>
          </div>
          <div className='flex items-center text-accent font-semibold'>
            <FaBath className='text-xl' />
            <span>
              {singleList?.bathrooms} Bath
              {singleList?.bathrooms.length > 1 && 's'}
            </span>
          </div>
          <div className='flex items-center text-accent font-semibold'>
            <RiParkingBoxFill className='tex t-xl' />
            {singleList?.parking ? 'Parking spot' : 'No parking'}
          </div>
          <div className='flex items-center text-accent font-semibold'>
            <MdChair className='text-xl' />
            {singleList?.furnished ? 'Furnished' : 'Not furnished'}
          </div>
        </div>
      </div>
    </div>
  );
}
