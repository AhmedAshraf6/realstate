// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'estate-ahmedashraf.firebaseapp.com',
  projectId: 'estate-ahmedashraf',
  storageBucket: 'estate-ahmedashraf.appspot.com',
  messagingSenderId: '97312328928',
  appId: '1:97312328928:web:09a371f0b43399f47d9485',
  // apiKey: process.env.FIREBASE_API_KEY,
  // authDomain: process.env.AUTH_DOMAIN,
  // projectId: process.env.PROJECT_ID,
  // storageBucket: process.env.STORAGE_BUCKET,
  // messagingSenderId: process.env.MESSAGING_SENDER_ID,
  // appId: process.env.APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
