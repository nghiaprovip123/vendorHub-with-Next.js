import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "../globals.css";
import {Button} from "@/components/ui/button";

const dmSans = DM_Sans(
  {
    subsets:['latin']
  }
);

export const metadata: Metadata = {
  title: "vendorHub",
  description: "this is a world-class E-commerce system that you've ever seen in your life",
}

export default function RootLayout(
  {
  children,
}: 
Readonly<{children: React.ReactNode}>
) {
  return (
        <html lang="en">
      <body
        className={`${dmSans.className} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
