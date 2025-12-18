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

const ForgetPassword = () => {
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
      <Typography className="semi-2xl">Forget password</Typography>
      <Typography className="semi-sm" mb={2}>
        Please enter your password you&apos;d like to received your reset password information.
      </Typography>

      <Form {...form}>
        <form onSubmit={handleSubmit(handleValidSubmit)}>
          <Grid container>
            <Grid size={12}>
              <FormInput 
                name={CrudKeys._EMAIL}
                label="Email"
                placeholder="seller@gmail.com"
                startIcon={<CiMail style={{ width: '24px', height: '24px' }} />}
                required
              />
            </Grid>
          </Grid>

          <Stack mt={4} alignItems='center' direction='column' gap={3}>
            <Button
              type="submit"
              label="Request OTP code"
              endIcon={<LuArrowRightFromLine style={{ width: '20px', height: '20px' }} />}
              style={{
                width: '300px',
              }}
            />
            <Button
              type='button'
              label="Back to login"
              style={{
                width: '300px',
                backgroundColor: COLOR_CODES.SECONDARY_BG,
              }}
              onClick={() => router.push('/authentication?type=login')}
            />
          </Stack>
        </form>
      </Form>
    </Stack>
  );
};

export default ForgetPassword;
