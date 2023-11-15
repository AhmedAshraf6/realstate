import React from 'react';

export default function SelectField({ name, handleChange, value, options }) {
  return (
    <select
      name={name}
      onChange={handleChange}
      value={value}
      className='select select-bordered w-full max-w-xs'
    >
      {options.map((option, index) => (
        <option key={index}>{option}</option>
      ))}
    </select>
  );
}
