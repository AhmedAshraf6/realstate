import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'estate-ahmedashraf.firebaseapp.com',
  projectId: 'estate-ahmedashraf',
  storageBucket: 'estate-ahmedashraf.appspot.com',
  messagingSenderId: '97312328928',
  appId: '1:97312328928:web:09a371f0b43399f47d9485',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
