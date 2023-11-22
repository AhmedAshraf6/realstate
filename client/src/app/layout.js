import { Inter } from 'next/font/google';
import './index.css';
import { Footer, Header } from '@/components';
import ReactQueryProvider from '@/utils/ReactQueryProvider';
import { ReduxProvider } from './GlobalRedux/ReduxProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainProvider from '@/contexts/MainContext';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Real State',
  description: 'Real State',
};
export default function RootLayout({ children }) {
  return (
    <html lang='en' data-theme='light'>
      <body className={inter.className}>
        <ReactQueryProvider>
          <ReduxProvider>
            <MainProvider>
              <Header />
              {children}
              {/* <Footer /> */}
            </MainProvider>
          </ReduxProvider>
          <ToastContainer position='top-center' />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
