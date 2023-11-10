import React from 'react';
export default function ButtonSubmit({ button, isLoading }) {
  return (
    <button
      className='btn btn-neutral btn-sm sm:btn-md w-full text-xs sm:text-base'
      disabled={isLoading}
    >
      {isLoading ? <span className='loading loading-spinner'></span> : button}
    </button>
  );
}
