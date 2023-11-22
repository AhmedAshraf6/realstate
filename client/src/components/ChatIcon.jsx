// 'use client';
// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
// import Link from 'next/link';

// import { FaCircle } from 'react-icons/fa';

// import { useMainContext } from '@/contexts/MainContext';
// import { usePathname } from 'next/navigation';

// export default function ChatIcon() {
//   const { user } = useSelector((state) => state.user);
//   const { socket } = useMainContext();
//   const [mount, setMount] = useState(false);
//   const [message, setMessage] = useState(false);
//   const pathname = usePathname();

//   const changeMessage = (msg) => {
//     if (!window.location.pathname.startsWith('/chat')) {
//       setMessage(true);
//       new Audio('/sound.wav').play();
//     }
//   };

//   useEffect(() => {
//     if (window.location.pathname.startsWith('/chat')) {
//       setMessage(false);
//     }
//   }, [pathname]);

//   useEffect(() => {
//     if (!socket) return;
//     socket.emit('addUser', user?.userId);
//     socket.on('getNotification', changeMessage);
//     return () => {
//       socket.off('getNotification');
//     };
//   }, [socket]);
//   useEffect(() => {
//     setMount(true);
//   }, []);
//   if (!mount) {
//     return;
//   }
//   return (
//     <li>
//       {user?.username ? (
//         <Link href='/chat' className='relative'>
//           <IoChatbubbleEllipsesOutline className='w-6 h-6 ' />
//           {message && (
//             <FaCircle className='text-red-700 absolute top-[2px] left-4 text-xs' />
//           )}
//         </Link>
//       ) : (
//         ''
//       )}
//     </li>
//   );
// }
import React from 'react';

export default function ChatIcon() {
  return <div>ChatIcon</div>;
}
