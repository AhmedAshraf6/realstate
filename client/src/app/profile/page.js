'use client';

import { useDispatch } from 'react-redux';
import { clearStore } from '../GlobalRedux/Features/user/userSlice';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div
      onClick={() => {
        dispatch(clearStore());
        router.push('/signin');
      }}
    >
      logout
    </div>
  );
}
