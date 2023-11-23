import { List, Title } from '@/components';
import { domainUrl } from '@/utils/axios';
import Link from 'next/link';
import React from 'react';
async function getOffers() {
  const res = await fetch(`${domainUrl}/api/v1/listing?offer=true&limit=5`, {
    next: {
      revalidate: 10,
    },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
}
async function getRents() {
  const res = await fetch(`${domainUrl}/api/v1/listing?type=rent&limit=5`, {
    next: {
      revalidate: 10,
    },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
}
async function getSales() {
  const res = await fetch(`${domainUrl}/api/v1/listing?type=sale&limit=5`, {
    next: {
      revalidate: 10,
    },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
}
export default async function page() {
  // const [offers, rents, sales] = await Promise.all([
  //   getOffers(),
  //   getRents(),
  //   getSales(),
  // ]);
  const offers = await getOffers();
  const rents = await getRents();
  const sales = await getSales();
  return (
    <div className='align-element mt-10 sm:mt-24'>
      <div className='max-w-2xl'>
        <Title title='We provide you with the most important statistics and investment ratios in a simplified manner ' />
        <p className='paragraph'>
          Ahmed Estate will help you find your home fast, easy and comfortable.
          Our expert support are always available.
        </p>
      </div>
      <div className='mt-4 sm:mt-6'>
        <h3 className='text-lg sm:text-xl text-neutral font-bold'>
          Recent Offers
        </h3>
        <div className='flex items-center gap-2'>
          <span className='text-lg'>for more offers:</span>
          <Link href={'search?offer=true'} className='btn btn-neutral btn-xs'>
            View More
          </Link>
        </div>
        <div className='mt-3 grid sm:grid-cols-3 gap-3'>
          {offers?.listings?.map((list) => (
            <List key={list._id} list={list} />
          ))}
        </div>
      </div>
      <div className='mt-4 sm:mt-6'>
        <h3 className='text-lg sm:text-xl text-neutral font-bold'>
          Recent places for rents
        </h3>
        <div className='flex items-center gap-2'>
          <span className='text-lg'>show more places for rent:</span>
          <Link href={'search?type=rent'} className='btn btn-neutral btn-xs'>
            View More
          </Link>
        </div>
        <div className='mt-3 grid sm:grid-cols-3 gap-3'>
          {rents?.listings?.map((list) => (
            <List key={list._id} list={list} />
          ))}
        </div>
      </div>
      <div className='mt-4 sm:mt-6'>
        <h3 className='text-lg sm:text-xl text-neutral font-bold'>
          Sales places for rents
        </h3>
        <div className='flex items-center gap-2'>
          <span className='text-lg'>show more places for sale:</span>
          <Link href={'search?type=rent'} className='btn btn-neutral btn-xs'>
            View More
          </Link>
        </div>
        <div className='mt-3 grid sm:grid-cols-3 gap-3'>
          {sales?.listings?.map((list) => (
            <List key={list._id} list={list} />
          ))}
        </div>
      </div>
    </div>
  );
}
