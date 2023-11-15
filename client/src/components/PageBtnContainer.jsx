import React from 'react';
import { changePage } from '@/app/GlobalRedux/Features/filters/filterSlice';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import { useSelector, useDispatch } from 'react-redux';
export default function PageBtnContainer({ numOfPages }) {
  const { page } = useSelector((store) => store.filters);
  const dispatch = useDispatch();
  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) {
      newPage = 1;
    }
    dispatch(changePage(newPage));
  };
  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = numOfPages;
    }
    dispatch(changePage(newPage));
  };
  return (
    <div className='mt-4 sm:mt-10 flex items-center justify-end gap-3'>
      <button
        className='btn btn-neutral btn-outline border-none'
        onClick={prevPage}
      >
        <HiChevronDoubleLeft />
        Prev
      </button>
      <div>
        {pages.map((pageNumber) => (
          <span
            className={`py-2 px-5 text-center text-xl cursor-pointer rounded-md font-bold ${
              page === pageNumber
                ? 'text-neutral-content bg-neutral'
                : 'text-neutral bg-slate-200'
            }`}
            key={pageNumber}
            onClick={() => dispatch(changePage(pageNumber))}
          >
            {pageNumber}
          </span>
        ))}
      </div>
      <button
        className='btn btn-neutral btn-outline border-none'
        onClick={nextPage}
      >
        Next
        <HiChevronDoubleRight />
      </button>
    </div>
  );
}
