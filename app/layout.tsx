'use client';

import { DM_Sans } from "next/font/google";

import '@/src/constants/styles/globals.css';

type Props = {
 children: React.ReactNode;
};

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "700"],
});

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="en" className={dmSans.variable}>
      <body>
        {/* <div className='root-header'>THIS IS HEADER</div> */}
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
