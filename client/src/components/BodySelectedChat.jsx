'use client';
import { domainUrl } from '@/utils/axios';
import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';

export default function BodySelectedChat({ messages }) {
  const { user } = useSelector((store) => store.user);
  return (
    <div className='flex-grow flex flex-col justify-end bg-base-20'>
      {messages?.map((message) => {
        console.log(message);
        return (
          <div key={message._id}>
            {message.sender._id === user.userId ? (
              <div className='chat chat-end'>
                <div className='chat-image avatar'>
                  <div className='w-10 rounded-full'>
                    <Image
                      src={`${domainUrl + message.sender.avatar}`}
                      alt='image'
                      width={500}
                      height={500}
                      placeholder='blur'
                      blurDataURL='/spinner.svg'
                    />
                  </div>
                </div>

                <div className='chat-bubble'>{message.text}</div>
                <div className='chat-footer opacity-50'>Seen at 12:46</div>
              </div>
            ) : (
              <div className='chat chat-start'>
                <div className='chat-image avatar'>
                  <div className='w-10 rounded-full'>
                    <Image
                      src={`${domainUrl + message.sender.avatar}`}
                      alt='image'
                      width={500}
                      height={500}
                      placeholder='blur'
                      blurDataURL='/spinner.svg'
                    />
                  </div>
                </div>
                <div className='chat-bubble'>{message.text}</div>
                <div className='chat-footer opacity-50'>Delivered</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
