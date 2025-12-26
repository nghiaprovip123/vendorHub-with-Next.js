'use client';

import { Stack, Typography } from "@mui/material";
import { LuMessageSquareText } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa6";

import { VendorLogo } from "@/components/common/Logo";
import { DefaultAvatar } from "@/components/images";
import { TEXT_SIZE } from "@/src/constants/text";
import { Divider } from "@/components/common";

const Header = () => {
  return (
    <Stack className="header-container">
      <VendorLogo width={130} height={25} />

      <Stack direction='row' alignItems='center' gap={2} className="h-8">
        <LuMessageSquareText size={20} color="#584700" />
        <FaRegBell size={20} color="#584700" />

        <Divider orientation='vertical' />

        <Stack direction='row' alignItems='center' gap={2}>
          <DefaultAvatar />
          <Typography 
            color="#3F434A"
            fontSize={TEXT_SIZE.SM}
          >
            coolseller
          </Typography>
          <FaCaretDown size={16} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Header;
