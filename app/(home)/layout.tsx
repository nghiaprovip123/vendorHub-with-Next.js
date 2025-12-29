'use client';

import { Stack } from "@mui/material";
import { Suspense } from "react";

import { Header, Sidebar } from "@/src/containers/Home";

import './styles.scss';

type Props = {
 children: React.ReactNode;
};

const HomeLayout = ({ children }: Props) => {
  return (
    <Stack>
      <Header />
      <Stack className="home-body" gap={4}>
        <Sidebar />
        <Stack width='100%'>
          <Suspense fallback={null}>
            {children}
          </Suspense>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default HomeLayout;
