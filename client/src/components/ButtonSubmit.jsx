import React from 'react';
export default function ButtonSubmit({ button, isLoading }) {
  return (
    <button
      className='btn btn-neutral btn-sm sm:btn-md sm:text-base w-full text-xs '
      disabled={isLoading}
      type='submit'
    >
      {isLoading ? <span className='loading loading-spinner'></span> : button}
    </button>
  );
}
