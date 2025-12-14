'use client';

import { Stack, Typography } from "@mui/material";

import VendorLogo from "@/components/common/Logo";
import { RocketEmoji } from "@/components/common/Emoji";

const LogoWithSlogan = () => {
  return (
    <Stack direction='column' alignItems='center' gap={2}>
      <VendorLogo width={600} height={120} />
      <Typography variant='inherit' className="slogan">YOUR SHOP, YOUR RULES</Typography>
      <Stack direction='row' alignItems='center' gap={1}>
        <Typography className='caption'>
          Join 10,000+ Gen Z sellers making bank online. No cap fr fr
        </Typography>
        <RocketEmoji />
      </Stack>
    </Stack>
  );
};

export default LogoWithSlogan;
