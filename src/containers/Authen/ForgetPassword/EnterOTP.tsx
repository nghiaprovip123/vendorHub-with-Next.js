'use client';

import { CiMail } from "react-icons/ci";
import { LuArrowRightFromLine } from "react-icons/lu";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Grid, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

import { FormInput } from "@/components/common";
import { Button, Form } from "@/components/ui";
import { COLOR_CODES } from "@/src/constants/color";
import { 
  CrudKeys, 
  ForgetPasswordFormValues, 
  formSchema, 
  initialValues 
} from "./helper";

const EnterOTP = ({ onSuccess }: { onSuccess: () => void }) => {
  const router = useRouter();

  const form = useForm<ForgetPasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  const {
    handleSubmit,
  } = form;

  const handleValidSubmit = (formValues: ForgetPasswordFormValues) => {
    console.log(formValues);
  };

  return (
    <Stack gap={1}>
      <Typography className="semi-2xl">OTP Verification</Typography>
      <Typography className="semi-sm" mb={2}>
        OTP code is sent to email: wrefree549@gmail.com
      </Typography>

      <Form {...form}>
        <form onSubmit={handleSubmit(handleValidSubmit)}>
          {/* <Grid container>
            <Grid size={12}>
              <FormInput 
                name={CrudKeys._EMAIL}
                label="Email"
                placeholder="seller@gmail.com"
                startIcon={<CiMail style={{ width: '24px', height: '24px' }} />}
                required
              />
            </Grid>
          </Grid> */}

          <Stack mt={4} alignItems='center' direction='column' gap={3}>
            <Button
              type="button"
              label="Continue"
              endIcon={<LuArrowRightFromLine style={{ width: '20px', height: '20px' }} />}
              style={{
                width: '300px',
              }}
              onClick={onSuccess}
            />
            <Button
              type='button'
              label="Return"
              style={{
                width: '300px',
                backgroundColor: COLOR_CODES.SECONDARY_BG,
              }}
              onClick={() => router.push('/forget-password?step=email')}
            />
          </Stack>
        </form>
      </Form>
    </Stack>
  );
};

export default EnterOTP;
