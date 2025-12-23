/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

import { Tabs } from "@/components/common";
import { LoginPage, SignUpPage } from "@/src/containers/Authen";

import '../styles.scss';

const tabs = [
  { label: 'LOGIN', value: 'login' },
  { label: 'SIGN UP', value: 'signup' },
];

const X = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const typeFromUrl = searchParams.get("type") as "login" | "signup";

  const [currentTab, setCurrentTab] = useState<string>(
    typeFromUrl ?? tabs[0].value
  );

  const handleChangeTab = (tab: string) => {
    setCurrentTab(tab);
    router.push(`?type=${tab}`, { scroll: false });
  };

  const renderTab = () => {
    switch (currentTab) {
      case 'login':
        return <LoginPage />;
      case 'signup':
        return <SignUpPage />;
      default: return <></>;
    };
  };

  useEffect(() => {
    setCurrentTab(typeFromUrl ?? tabs[0].value);
  }, [typeFromUrl])

  return (
    <Stack className="authen-page" gap={2}>
      <Tabs 
        tabsList={tabs}
        currentTab={currentTab}
        onChange={handleChangeTab}
      />
      {renderTab()}
    </Stack>
  );
};

export default X;
