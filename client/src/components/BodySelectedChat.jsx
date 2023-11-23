'use client';
import {
  setMessage,
  updateLastMessage,
  updateMessages,
} from '@/app/GlobalRedux/Features/user/userSlice';
import { useMainContext } from '@/contexts/MainContext';
import customFetch, {
  checkForUnauthorizedResponse,
  domainUrl,
} from '@/utils/axios';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'timeago.js';
import { Loading } from '.';
import { useRouter } from 'next/navigation';

export default function BodySelectedChat({ chatId }) {
  const [unreadMessages, setUnreadMessages] = useState([]);
  const { socket } = useMainContext();
  const { user, openedUser, messages } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const scrollRef = useRef();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const getMessages = async () => {
    setLoading(true);
    try {
      const { data } = await customFetch(`/message/${chatId}`);
      dispatch(setMessage(data.messages));
      setLoading(false);
    } catch (error) {
      checkForUnauthorizedResponse({ error, dispatch, router });
      setLoading(false);
    }
  };
  const onMessageReceived = (message) => {
    if (message?.chatId !== chatId) {
      setUnreadMessages((prev) => [message, ...prev]);
    } else {
      console.log(message);
      dispatch(
        updateMessages({
          ...message,
          sender: { _id: message.senderId, avatar: openedUser.avatar },
        })
      );
    }
  };

  useEffect(() => {
    getMessages();
  }, []);
  useEffect(() => {
    if (!socket) return;
    socket.emit('addUser', user.userId);
    socket.on('getMessage', onMessageReceived);
    // socket.on('newChat', onNewChat);
    return () => {
      socket.off('getMessage');
      // socket.off('newChat');
    };
  }, [socket]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  if (loading) {
    return <Loading />;
  }
  return (
    <div className='flex-grow bg-base-200 overflow-y-auto '>
      {messages?.map((message) => {
        return (
          <div key={message._id} ref={scrollRef}>
            {message.sender._id === user.userId ? (
              <div className='chat chat-end'>
                <div className='chat-image avatar'>
                  <div className='w-10 rounded-full'>
                    <Image
                      src={`${
                        message.sender.avatar.startsWith('https')
                          ? message.sender.avatar
                          : domainUrl + message.sender.avatar
                      }`}
                      alt='image'
                      width={500}
                      height={500}
                      placeholder='blur'
                      blurDataURL='/spinner.svg'
                    />
                  </div>
                </div>

                <div className='chat-bubble'>
                  {message?.attachments?.length > 0 ? (
                    <div className='flex flex-wrap gap-2 '>
                      {message?.attachments?.map((attach, index) => {
                        return (
                          <Image
                            src={`${domainUrl + attach}`}
                            alt='image'
                            width={500}
                            height={500}
                            placeholder='blur'
                            blurDataURL='/spinner.svg'
                            className='w-24 h-24 object-contain'
                            key={index}
                          />
                        );
                      })}
                    </div>
                  ) : (
                    message.text
                  )}
                </div>
                <div className='chat-footer opacity-50'>
                  {format(message.createdAt)}
                </div>
              </div>
            ) : (
              <div className='chat chat-start'>
                <div className='chat-image avatar'>
                  <div className='w-10 rounded-full'>
                    <Image
                      src={`${
                        message.sender.avatar.startsWith('https')
                          ? message.sender.avatar
                          : domainUrl + message.sender.avatar
                      }`}
                      alt='image'
                      className='w-24 h-24 object-contain'
                      width={500}
                      height={500}
                      placeholder='blur'
                      blurDataURL='/spinner.svg'
                    />
                  </div>
                </div>
                <div className='chat-bubble'>
                  {message?.attachments?.length > 0 ? (
                    <div className='flex flex-wrap gap-2 '>
                      {message?.attachments?.map((attach, index) => {
                        return (
                          <Image
                            src={`${domainUrl + attach}`}
                            alt='image'
                            width={500}
                            height={500}
                            placeholder='blur'
                            blurDataURL='/spinner.svg'
                            className='w-24 h-24 object-contain'
                            key={index}
                          />
                        );
                      })}
                    </div>
                  ) : (
                    message.text
                  )}
                </div>
                <div className='chat-footer opacity-50'>
                  {format(message.createdAt)}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
