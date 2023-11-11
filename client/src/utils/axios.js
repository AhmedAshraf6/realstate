import { clearStore } from '@/app/GlobalRedux/Features/user/userSlice';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
const customFetch = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
});
export const domainUrl = 'http://localhost:5000';
customFetch.interceptors.request.use((config) => {
  const token = Cookies.get('token');

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const checkForUnauthorizedResponse = ({ error, dispatch, router }) => {
  if (error.response.status === 401) {
    dispatch(clearStore());
    router.push('/signin');
    toast.error('Unauthorized! ');
    return;
  }
  return toast.error(error.message || error?.response?.data);
};
export const removeCookies = () => {
  return Cookies.remove('token');
};
export default customFetch;
