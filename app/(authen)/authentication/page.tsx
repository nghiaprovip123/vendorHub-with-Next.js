'use client';

import { useState } from "react";
import { Stack } from "@mui/material";

import { Tabs } from "@/components/common";
import { LoginPage, SignUpPage } from "@/src/containers/Authen";

import '../styles.scss';

const tabs = [
  { label: 'LOGIN', value: 'login' },
  { label: 'SIGN UP', value: 'signup' },
];

const X = () => {
  const [currentTab, setCurrentTab] = useState<string>(tabs[0].value);

  const renderTab = () => {
    switch (currentTab) {
      case 'login':
        return <LoginPage />;
      case 'signup':
        return <SignUpPage />;
      default: return <></>;
    };
  };

  return (
    <Stack className="authen-page" gap={2}>
      <Tabs 
        tabsList={tabs}
        currentTab={currentTab}
        onChange={setCurrentTab}
      />
      {renderTab()}
    </Stack>
  );
};

export default X;
