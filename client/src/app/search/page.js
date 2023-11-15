import React from 'react';
import { ListingContainer, SearchContainer } from '@/components';

export default function page() {
  return (
    <div className='align-element grid sm:grid-cols-3'>
      <SearchContainer />
      <ListingContainer />
    </div>
  );
}
