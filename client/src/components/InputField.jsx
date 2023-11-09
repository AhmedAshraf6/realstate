import React from 'react';

export default function InputField({
  placeHolder,
  type,
  name,
  value,
  handleChange,
}) {
  return (
    <div className='form-control w-full'>
      <input
        placeholder={placeHolder}
        className='input input-bordered input-sm sm:input-md w-full'
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
