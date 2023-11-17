import React from 'react';
import { InputField } from '.';
import { MdAttachFile } from 'react-icons/md';
import { LuSendHorizonal } from 'react-icons/lu';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import customFetch from '@/utils/axios';

export default function InputSelectedChat({ chatId }) {
  const [message, setMessage] = React.useState('');
  const { mutate } = useMutation({
    mutationFn: async (chatid) => {
      const data = await customFetch.post(`/message/${chatid}`, {
        text: message,
      });
    },
    onSuccess: () => {
      setMessage('');
    },
  });
  const hadnleSubmit = (e) => {
    e.preventDefault();
    if (!message) {
      return;
    }
    mutate(chatId);
  };
  return (
    <form className='flex'>
      <MdAttachFile className=' relative left-2  top-1/2 -translate-y-[50%] cursor-pointer text-xl' />
      <div className='form-control focus:border-none  flex-grow'>
        <input
          placeholder='Type a message'
          className='input  input-sm sm:input-md w-full focus:outline-none'
          type='text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button type='submit' onClick={hadnleSubmit}>
        <LuSendHorizonal className='relative right-2  top-1/2 -translate-y-[50%] cursor-pointer text-xl' />
      </button>
    </form>
  );
}
