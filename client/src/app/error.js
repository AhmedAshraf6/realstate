'use client'; // Error components must be Client Components

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className='grid place-items-center mt-10 sm:mt-24 align-element'>
      <h2 className='text-lg sm:text-2xl font-semibold'>
        Something went wrong!
      </h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        className='btn btn-neutral btn-xs mt-4'
      >
        Try again
      </button>
    </div>
  );
}
