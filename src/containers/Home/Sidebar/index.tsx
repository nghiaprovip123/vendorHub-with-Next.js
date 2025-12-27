'use client';

import { Stack, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { RxDashboard } from "react-icons/rx";
import { BsBoxSeam } from "react-icons/bs";
import { useState } from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

import { FONT_WEIGHT } from "@/src/constants/text";
import { useSidebar } from "@/components/hooks";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  // const { isCollapsed, toggleSidebar } = useSidebar();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

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
    <Stack style={{
      display: 'flex',
      position: 'relative',
    }}>
      <Stack 
        className="sidebar-container"
        style={{
          width: isCollapsed ? '80px' : '200px',
        }}
      >
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
              {!isCollapsed &&  (
                <Typography
                  fontWeight={FONT_WEIGHT.BOLD}
                  letterSpacing={1}
                  color="#584700"
                >
                  {item.title}
                </Typography>
              )}
            </Stack>
          );
        })}
      </Stack>

      <Stack
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="collapse-button"
      >
        {isCollapsed ? <FaCaretRight size={20} /> : <FaCaretLeft size={20} />}
      </Stack>
    </Stack>
  );
};

export default Sidebar;
