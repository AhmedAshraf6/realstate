'use client';
import {
  newChat,
  setOpenedUser,
  updateChats,
  updateLastMessage,
} from '@/app/GlobalRedux/Features/user/userSlice';
import { useMainContext } from '@/contexts/MainContext';
import customFetch, {
  checkForUnauthorizedResponse,
  domainUrl,
} from '@/utils/axios';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function UserChats() {
  const { socket } = useMainContext();

  const { user, chats } = useSelector((store) => store.user);
  // const [chats, setChats] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const onMessageReceived = (message) => {
    if (message?.attachments?.length > 0) {
      console.log(message);
      dispatch(
        updateLastMessage({
          chatToUpdateId: message.chatId,
          message: message.attachments,
          keyMsg: 'attachments',
        })
      );
    } else {
      dispatch(
        updateLastMessage({
          chatToUpdateId: message.chatId,
          message: message.text,
          keyMsg: 'text',
        })
      );
    }
  };

  const onNewChat = (chat) => {
    dispatch(newChat(chat));
    console.log(chat);
  };

  const getChats = async () => {
    try {
      const { data } = await customFetch('/chat');
      dispatch(updateChats(data.chats));
    } catch (error) {
      checkForUnauthorizedResponse({ error, dispatch, router });
    }
  };
  useEffect(() => {
    getChats();
  }, []);
  useEffect(() => {
    if (!socket) return;
    socket.emit('addUser', user.userId);
    socket.on('getMessage', onMessageReceived);
    socket.on('newChat', onNewChat);
    return () => {
      socket.off('getMessage');
      socket.off('newChat');
    };
  }, [socket]);

  return (
    <div className='col-span-1 rounded-lg border-2 h-[calc(100vh-64px)]  overflow-y-auto'>
      <h3 className='font-semibold bg-base-300 px-2 py-5 border-b-2 border-gray-300'>
        Inbox
      </h3>
      <div className='flex flex-col gap-3  overflow-y-auto'>
        {chats.map((chat) => {
          const rightUser = chat.members.find(
            (member) => member._id !== user.userId
          );

          return (
            <div key={chat._id}>
              {(chat?.lastMessage?.text ||
                chat?.lastMessage?.attachments?.length > 0) && (
                <Link
                  className='flex gap-3 items-start border-b-2 border-gray-300 p-2'
                  key={chat._id}
                  href={`/chat/user/${chat._id}`}
                  onClick={() => dispatch(setOpenedUser(rightUser))}
                >
                  <div className='avatar'>
                    <div className='w-12 rounded-full '>
                      <Image
                        src={`${
                          rightUser.avatar.startsWith('https')
                            ? rightUser.avatar
                            : domainUrl + rightUser.avatar
                        }`}
                        alt='image'
                        width={500}
                        height={500}
                        placeholder='blur'
                        blurDataURL='/spinner.svg'
                      />
                    </div>
                  </div>

                  <div className='truncate'>
                    <h2>{rightUser.username}</h2>
                    <span className='text-gray-300 '>
                      {chat?.lastMessage?.attachments?.length > 0
                        ? 'صورة'
                        : chat?.lastMessage?.text}
                    </span>
                  </div>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
