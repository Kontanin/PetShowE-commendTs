
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import NavbarMain from '../components/Navbar/navbar';
const inter = Inter({ subsets: ['latin'] });
import Footer from '../components/Footer/footer';
import Head from 'next/head';

export const metadata: Metadata = {
  title: 'Pet Shop',
  description: 'We care  evry  detail  for pet',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={inter.className}>
        <NavbarMain></NavbarMain>

        <div className="flex justify-center">
          <div className="w-3/4">{children}</div>
        </div>

        <Footer></Footer>
      </body>
    </html>
  );
}
