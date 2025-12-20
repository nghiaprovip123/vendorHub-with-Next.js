'use client';

import { LuArrowRightFromLine } from "react-icons/lu";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Grid, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { IoKeyOutline, IoKeySharp } from "react-icons/io5";

import { FormInput } from "@/components/common";
import { Button, Form } from "@/components/ui";
import { COLOR_CODES } from "@/src/constants/color";
import { 
  CrudKeys, 
  formNewPasswordSchema, 
  initialNewPasswordValues, 
  NewPasswordFormValues
} from "./helper";
import { SYSTEM_PATHS } from "@/src/constants/path";
import { useDialog } from "@/components/useCustomDialog/useDialog";
import { PhonePasswordEmoji } from "@/components/common/Emoji";
import { TEXT_SIZE, FONT_WEIGHT } from "@/src/constants/text";

const EnterNewPassword = () => {
  const router = useRouter();
  const dialog = useDialog();
  
  const form = useForm<NewPasswordFormValues>({
    resolver: zodResolver(formNewPasswordSchema),
    defaultValues: initialNewPasswordValues,
  });

  const {
    handleSubmit,
  } = form;

  const handleValidSubmit = (formValues: NewPasswordFormValues) => {
    console.log(formValues);

    dialog.open({
      type: 'alert',
      size: 'sm',
      content: (
        <Stack px={3} py={1} gap={2}>
          <Stack direction='column' alignItems='center' gap={1}>
            <PhonePasswordEmoji />
            <Typography
              sx={{
                fontSize: TEXT_SIZE.HXL,
                fontWeight: FONT_WEIGHT.BOLD,
                color: '#584700',
              }}
            >
              Change password successfully
            </Typography>
            <Typography 
              textAlign='center'
              sx={{
                fontSize: TEXT_SIZE.BASE,
                fontWeight: FONT_WEIGHT.MEDIUM,
              }}
            >
              Log back in with your new password to get started with {" "}
              <span style={{ color: '#BC9900BF' }}>vendorHub</span>!
            </Typography>
          </Stack>

          <Button
            label="Login"
            onClick={() => {
              router.push(`/${SYSTEM_PATHS.authentication}?type=login`);
              dialog.close();
            }}
          />
        </Stack>
      ),
    });
  };

  return (
    <Stack gap={1}>
      <Typography className="semi-2xl">Create a new password</Typography>
      <Typography className="semi-sm" mb={2}>
        Password must be at least 8 characters long, include at least one uppercase letter, special characters, and no spaces.
      </Typography>

      <Form {...form}>
        <form onSubmit={handleSubmit(handleValidSubmit)}>
          <Grid container gap={3}>
            <Grid size={12}>
              <FormInput 
                name={CrudKeys._PASSWORD}
                label="Password"
                type='password'
                placeholder="*******"
                startIcon={<IoKeyOutline style={{ width: '24px', height: '24px' }} />}
                required
              />
            </Grid>
            <Grid size={12}>
              <FormInput 
                name={CrudKeys._CONFIRM_PASSWORD}
                label="Confirm Password"
                type='password'
                placeholder="*******"
                startIcon={<IoKeySharp style={{ width: '24px', height: '24px' }} />}
                required
              />
            </Grid>
          </Grid>

          <Stack mt={4} alignItems='center' direction='column' gap={3}>
            <Button
              type="submit"
              label="Continue"
              endIcon={<LuArrowRightFromLine style={{ width: '20px', height: '20px' }} />}
              style={{
                width: '300px',
              }}
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
        </form>
      </Form>
    </Stack>
  );
};

export default EnterNewPassword;
