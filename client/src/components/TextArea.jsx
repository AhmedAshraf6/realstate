import React from 'react';

export default function TextArea({
  placeHolder,
  required,
  name,
  defaultValue,
  handleChange,
  value,
}) {
  return (
    <div className='form-control w-full'>
      <textarea
        placeholder={placeHolder}
        className='textarea textarea-bordered'
        name={name}
        defaultValue={defaultValue}
        onChange={handleChange}
        required={required}
        value={value}
      />
    </div>
  );
}
