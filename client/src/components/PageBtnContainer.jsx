'use client';
import React, { useEffect } from 'react';
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
  useEffect(() => {
    scrollTo(0, 0);
  }, [page]);
  return (
    <div className='mt-4 sm:mt-10 flex items-center justify-start gap-3'>
      <button
        className='btn btn-neutral btn-outline border-none btn-sm sm:btn-md sm:text-base'
        onClick={prevPage}
      >
        السابق
        <HiChevronDoubleLeft />
      </button>
      <div>
        {pages.map((pageNumber) => (
          <span
            className={`py-1 px-3 sm:py-2 sm:px-5 text-center text-xl cursor-pointer rounded-md font-bold ${
              page === pageNumber
                ? 'text-accent-content bg-accent'
                : 'text-neutral bg-base-content'
            }`}
            key={pageNumber}
            onClick={() => dispatch(changePage(pageNumber))}
          >
            {pageNumber}
          </span>
        ))}
      </div>
      <button
        className='btn btn-neutral btn-outline border-none btn-sm sm:btn-md sm:text-base'
        onClick={nextPage}
      >
        <HiChevronDoubleRight />
        التالي
      </button>
    </div>
  );
}
