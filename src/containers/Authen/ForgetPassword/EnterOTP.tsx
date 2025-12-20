/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { LuArrowRightFromLine } from "react-icons/lu";
import { Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook"

import { FormOTPInput } from "@/components/common";
import { Button } from "@/components/ui";
import { COLOR_CODES } from "@/src/constants/color";
import { SYSTEM_PATHS } from "@/src/constants/path";

const EnterOTP = ({ onSuccess }: { onSuccess: () => void }) => {
  const router = useRouter();
  const [otp, setOtp] = useState<string>('');
  const [serverOtp, setServerOtp] = useState("")

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  const getExpiryTime = (seconds = 60) => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + seconds);

    return time;
  };

  const {
    minutes,
    seconds,
    restart,
    isRunning
  } = useTimer({ 
    expiryTimestamp: getExpiryTime(60),
    autoStart: true, 
  });
  const totalSeconds = minutes * 60 + seconds;

  const handleResendOTP = () => {
    const newOtp = generateOtp();

    setServerOtp(newOtp);
    setOtp('');
    restart(getExpiryTime(60));
  };

  useEffect(() => {
    const newOtp = generateOtp();

    setServerOtp(newOtp);
  }, []);

  console.log("Generated OTP:", serverOtp);

  return (
    <Stack gap={1}>
      <Typography className="semi-2xl">OTP Verification</Typography>
      <Typography className="semi-sm" mb={2}>
        OTP code is sent to email: wrefree549@gmail.com
      </Typography>

      <Stack direction='column' alignItems='center' gap={2}>
        <FormOTPInput value={otp} onChange={setOtp} />

        {isRunning ? (
          <Typography className="semi-sm">
            {`OTP will be expired in ${totalSeconds}s`}
          </Typography>
        ) : (
          <Typography className="semi-sm">
            OTP has been expired.{" "}
            <span
              className="underline cursor-pointer"
              style={{ color: '#BC9900BF' }}
              onClick={handleResendOTP}
            >
              Resend
            </span>
          </Typography>
        )}

      </Stack>

      <Stack mt={2} alignItems='center' direction='column' gap={3}>
        <Button
          type="button"
          label="Continue"
          endIcon={<LuArrowRightFromLine style={{ width: '20px', height: '20px' }} />}
          style={{
            width: '300px',
          }}
          onClick={onSuccess}
          disabled={(otp !== serverOtp) || (!isRunning || totalSeconds <= 0)}
        />
        <Button
          type='button'
          label="Return"
          style={{
            width: '300px',
            backgroundColor: COLOR_CODES.SECONDARY_BG,
          }}
          onClick={() => router.push(`/${SYSTEM_PATHS.forgetPassword}?step=email`)}
        />
      </Stack>
    </Stack>
  );
};

export default EnterOTP;
