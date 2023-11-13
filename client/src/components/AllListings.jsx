'use client';
import customFetch, {
  checkForUnauthorizedResponse,
  domainUrl,
} from '@/utils/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react';
import { Loading } from '.';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AllListings() {
  const dispatch = useDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();

  // Show Listing
  const {
    data: listings,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['allListings'],
    queryFn: async () => {
      const { data } = await customFetch('/listing/getUserLists');
      return data.listings;
    },
  });
  // Delete Listing
  const { isLoading: isLoadingDeleteListing, mutate: deleteList } = useMutation(
    {
      mutationFn: async (listId) => {
        const { data } = await customFetch.delete(`/listing/${listId}`);
        return data;
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ['allListings'],
        });
        toast.success('Deleted Successfully');
      },
      onError: (error) => {
        checkForUnauthorizedResponse({ error, dispatch, router });
      },
    }
  );
  if (isLoading || isLoadingDeleteListing) {
    return <Loading />;
  }
  if (isError) {
    return checkForUnauthorizedResponse({ error, dispatch, router });
  }
  // console.log(listings);
  // return;
  return (
    <div className='mt-4 sm:mt-6'>
      <h1 className='text-lg sm:text-2xl font-semibold  '>Your Listings</h1>
      <div className='text-start flex flex-col gap-y-4 sm:gap-y-6 mt-2 sm:mt-4'>
        {listings?.length === 0 ? (
          <div className='flex justify-between items-center my-3 sm:my-5'>
            <h1 className='text-lg sm:text-2xl font-semibold  '>No Listings</h1>
            <Link
              href='profile/create-listing'
              className='btn btn-accent btn-xs add List'
            >
              Add List
            </Link>
          </div>
        ) : (
          listings?.map((list) => (
            <div
              className='flex justify-between items-center flex-wrap sm:flex-nowrap gap-3 border-2 border-base-300 p-3'
              key={list._id}
            >
              <Link
                className='flex gap-2 items-center flex-wrap truncate'
                href={`listings/${list._id}`}
              >
                <Image
                  src={`${domainUrl + list.imageUrls[0]}`}
                  alt='image'
                  className='w-20 h-20 object-contain'
                  width={500}
                  height={500}
                  placeholder='blur'
                  blurDataURL='/spinner.svg'
                />

                <span className='truncate font-semibold cursor-pointer'>
                  {list.name}
                </span>
              </Link>
              <div className='flex sm:flex-col gap-2'>
                <span
                  className='text-error font-bold cursor-pointer'
                  onClick={() => deleteList(list._id)}
                >
                  Delete
                </span>
                <Link
                  className='text-accent font-bold cursor-pointer'
                  href={`edit-listing/${list._id}`}
                >
                  Edit
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
