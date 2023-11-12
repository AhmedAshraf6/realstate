import React from 'react';

const Title = ({ title, center }) => {
  return (
    <h2
      className={`text-lg sm:text-3xl font-bold text-base-content mb-4 sm:mb-6 ${center}`}
    >
      {title}
    </h2>
  );
};

export default Title;
