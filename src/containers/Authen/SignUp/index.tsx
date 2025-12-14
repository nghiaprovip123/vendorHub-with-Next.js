'use client';

import { Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { StarBlingEmoji, RocketEmoji } from "@/components/common/Emoji";
import { Button } from "@/components/ui";
import { GoogleLogo } from "@/components/common/Logo";
import { FONT_WEIGHT } from "@/src/constants/text";
import { COLOR_CODES } from "@/src/constants/color";
import { Divider } from "@/components/common";

const SignUpPage = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLoginWithGoogle = () => {
    startTransition(() => {
      router.push('/api/auth/google');
    });
  };
  
  return (
    <Stack>
      <Stack direction='row' alignItems='center' gap={2} justifyContent='center'>
        <Typography className="semi-2xl">
          START SELLING!
        </Typography>
        <RocketEmoji width={20} height={20} />
      </Stack>

      <Stack direction='row' alignItems='center' gap={1} justifyContent='center'>
        <Typography className="semi-2xl" letterSpacing={1}>
          Your online empire starts here
        </Typography>
        <StarBlingEmoji width={20} height={20} />
      </Stack>

      <Button 
        variant='default'
        label="CONTINUE WITH GOOGLE"
        startIcon={<GoogleLogo />}
        weight={FONT_WEIGHT.SEMIBOLD}
        style={{
          backgroundColor: COLOR_CODES.SECONDARY_BG,
          cursor: 'pointer',
          marginTop: '20px',
          marginBottom: '28px'
        }}
        onClick={handleLoginWithGoogle}
        disabled={isPending}
      />

      <Divider text="OR" />

    </Stack>
  );
};

export default SignUpPage;
