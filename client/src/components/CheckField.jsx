import React from 'react';

export default function CheckField({ name, handleChange, checked, label }) {
  return (
    <div className='flex gap-2'>
      <input
        type='checkbox'
        className='checkbox'
        name={name}
        onChange={handleChange}
        checked={checked}
      />
      <span>{label}</span>
    </div>
  );
}
