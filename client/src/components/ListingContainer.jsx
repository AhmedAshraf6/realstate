'use client';
import { customFetchNoAuth, domainUrl } from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { List, Loading, PageBtnContainer, Title } from '.';

export default function ListingContainer() {
  const { search, page, type, offer, parking, furnished, sort } = useSelector(
    (store) => store.filters
  );
  const { data, isLoading } = useQuery({
    queryKey: [
      'filters/listing',
      search,
      type,
      offer,
      furnished,
      parking,
      sort,
      page,
    ],
    queryFn: async () => {
      let url = `/listing?type=${type}&offer=${offer}&furnished=${furnished}&parking=${parking}&sort=${sort}&page=${page}`;
      if (search) {
        url = url + `&search=${search}`;
      }
      const { data } = await customFetchNoAuth(`${url}`);
      return data;
    },
  });
  if (isLoading) {
    return (
      <div className='flex mx-auto w-full'>
        <Loading />;
      </div>
    );
  }

  return (
    <div className='sm:col-span-2 py-6'>
      <div className='flex items-start gap-2'>
        <Title title='total Results' />
        <Title title=':' />
        <Title title={data.totalListings} />
        {/* <span className='text-gray-500 text-2xl'>:{data.totalListings}</span> */}
      </div>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-3'>
        {data?.listings.map((list) => (
          <List list={list} />
        ))}
      </div>
      {data?.numOfPages > 1 && (
        <PageBtnContainer numOfPages={data?.numOfPages} />
      )}
    </div>
  );
}
