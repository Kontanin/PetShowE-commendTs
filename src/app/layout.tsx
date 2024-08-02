
import type { Metadata } from 'next';

import './globals.css';
import NavbarMain from '../components/Navbar/navbar';

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
        <link rel="font/woff2" sizes="180x180" href="favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="favicon.ico" />
      </Head>
      <body >
       
      <NavbarMain/>

        <div className="flex justify-center">
  
          <div className="w-3/4">{children}</div>
        </div>

        <Footer/>
      </body>
    </html>
  );
}
