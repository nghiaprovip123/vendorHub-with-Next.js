import { DM_Sans } from "next/font/google";
import NavBar from "./navbar"
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} antialiased font-size: 1rem`}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
