import { DM_Sans } from "next/font/google";

import { 
  DialogProvider, 
  QueryProvider,
  ToastProvider,
  SidebarProvider,
} from "@/components/providers";

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
        <QueryProvider>
          <DialogProvider>
            <SidebarProvider>
              {children}
              <ToastProvider />
            </SidebarProvider>
          </DialogProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

export default RootLayout;
