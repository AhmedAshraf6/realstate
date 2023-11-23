import { domainUrl } from '@/utils/axios';
import Image from 'next/image';
import React from 'react';
import { IoLocationSharp } from 'react-icons/io5';
import { TbBedFilled } from 'react-icons/tb';
import { FaBath } from 'react-icons/fa6';
import Link from 'next/link';
export default function List({ list }) {
  const {
    name,
    description,
    address,
    type,
    parking,
    furnished,
    regularPrice,
    discountedPrice,
    imageUrls,
    offer,
    bedrooms,
    bathrooms,
    _id,
  } = list;
  return (
    <Link
      className='card bg-base-100 shadow-xl'
      href={`listings/${_id}`}
      key={_id}
    >
      <figure>
        <Image
          src={`${domainUrl + imageUrls[0]}`}
          alt='image'
          className='h-52 object-cover'
          width={500}
          height={500}
          placeholder='blur'
          blurDataURL='/spinner.svg'
        />
      </figure>
      <div className='card-body'>
        <h2 className='card-title text-base'>
          {name.length > 15 ? `${name.slice(0, 15)}..` : name}
        </h2>

        <div className='badge badge-accent'>{regularPrice}جنيه</div>

        <p className='text-xs'>
          {description.length > 50
            ? `${description.slice(0, 50)}...`
            : description}
        </p>
        <p className='flex gap-2 items-center'>
          <IoLocationSharp className='text-accent' />
          <span className='text-gray-500 text-xs'>{address}</span>
        </p>
        <div className='flex flex-wrap gap-2 sm:gap-3'>
          <div className='flex items-center text-base-content '>
            <TbBedFilled className='text-xs' />
            <span>
              {bedrooms} Bed
              {bedrooms.length > 1 && 's'}
            </span>
          </div>
          <div className='flex items-center text-base-content '>
            <FaBath className='text-xs' />
            <span>
              {bathrooms} Bath
              {bathrooms.length > 1 && 's'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
