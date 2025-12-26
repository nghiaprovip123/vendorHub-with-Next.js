'use client';

import { Stack, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { RxDashboard } from "react-icons/rx";
import { BsBoxSeam } from "react-icons/bs";

import { FONT_WEIGHT } from "@/src/constants/text";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const sidebarList = [
    {
      title: 'Dashboard',
      route: '/dashboard',
      icon: <RxDashboard size={24} color="#584700" />,
    },
    {
      title: 'Product',
      route: '/product',
      icon: <BsBoxSeam size={24} color="#584700" />,
    },
  ];

  return (
    <Stack className="sidebar-container">
      {sidebarList.map((item, index) => {
        const isActive = pathname.startsWith(item.route);

        return (
          <Stack 
            key={index} 
            className="sidebar-item"
            gap={2}
            style={{
              backgroundColor: isActive
                ? "var(--background-normal)"
                : "transparent",
              transform: isActive ? "translateX(0)" : "translateX(-4px)",
            }}
            onClick={() => router.push(item.route)}
          >
            {item.icon}
            <Typography
              fontWeight={FONT_WEIGHT.BOLD}
              letterSpacing={1}
              color="#584700"
            >
              {item.title}
            </Typography>
          </Stack>
        );
      })}
    </Stack>
  );
};

export default Sidebar;
