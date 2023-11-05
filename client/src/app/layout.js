import { Inter } from 'next/font/google';
import './index.css';
import { Footer, Header } from '@/components';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Real State',
  description: 'Real State',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' data-theme='light'>
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
