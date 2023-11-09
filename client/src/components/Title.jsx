import React from 'react';

const Title = ({ title }) => {
  return (
    <h2 className='text-lg sm:text-3xl font-bold text-base-content mb-4 sm:mb-6'>
      {title}
    </h2>
  );
};

export default Title;
