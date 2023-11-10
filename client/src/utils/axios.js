import { clearStore } from '@/app/GlobalRedux/Features/user/userSlice';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
const customFetch = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
});

// customFetch.interceptors.request.use((config) => {
//   const user = getUserFromLocalStorage();
//   if (user) {
//     config.headers['Authorization'] = `Bearer ${user.token}`;
//   }
//   return config;
// });
export const checkForUnauthorizedResponse = ({ error, dispatch }) => {
  if (error?.response?.status === 401) {
    dispatch(clearStore());
    return toast.error('Unauthorized! Logging Out...');
  }
  return toast.error(error?.message || error?.response?.data);
};
export const removeCookies = () => {
  return Cookies.remove('token');
};
export default customFetch;