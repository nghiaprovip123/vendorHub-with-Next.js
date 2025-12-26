import { Stack } from "@mui/material";

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
        {children}
      </Stack>
    </Stack>
  );
};

export default HomeLayout;
