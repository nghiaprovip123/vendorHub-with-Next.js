'use client';

import { Stack } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

import { EnterResetEmail } from "@/src/containers/Authen";

import '../styles.scss';

enum RESET_STEP {
  EMAIL = "email",
  OTP = "otp",
  RESET = "reset",
};

const X = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentStep = (searchParams.get("step") as RESET_STEP) ?? RESET_STEP.EMAIL;

  const goToStep = (step: RESET_STEP) => {
    router.push(`?step=${step}`, { scroll: false });
  };

  const renderStep = () => {
    switch (currentStep) {
      case RESET_STEP.EMAIL:
        return <EnterResetEmail onSuccess={() => goToStep(RESET_STEP.OTP)} />;
      case RESET_STEP.OTP:
        return <>otp</>;
      case RESET_STEP.RESET:
        return <>reset</>;
      default:
        return null;
    }
  };

  return (
    <Stack className="authen-page">
      {renderStep()}
    </Stack>
  );
};

export default X;
