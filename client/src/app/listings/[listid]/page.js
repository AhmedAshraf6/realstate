import { SingleListSlider } from '@/components';
import { checkForUnauthorizedResponse, domainUrl } from '@/utils/axios';
import React from 'react';
async function getData(listId) {
  const res = await fetch(`${domainUrl}/api/v1/listing/${listId}`);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function page({ params }) {
  const { singleList } = await getData(params.listid);
  return (
    <div>
      <SingleListSlider images={singleList?.imageUrls} />
      {/* Slider */}
      <div className='align-element mt-10 mt:15'></div>
    </div>
  );
}
