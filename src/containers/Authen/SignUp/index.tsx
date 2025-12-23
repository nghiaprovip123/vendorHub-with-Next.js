/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Grid, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { CiMail } from "react-icons/ci";
import { IoKeyOutline, IoKeySharp } from "react-icons/io5";
import { LuArrowRightFromLine } from "react-icons/lu";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HiOutlineUser } from "react-icons/hi2";

import { StarBlingEmoji, RocketEmoji, MoneyBagEmoji } from "@/components/common/Emoji";
import { Button, Form } from "@/components/ui";
import { GoogleLogo } from "@/components/common/Logo";
import { COLOR_CODES } from "@/src/constants/color";
import { TEXT_SIZE, FONT_WEIGHT } from "@/src/constants/text";
import { SYSTEM_PATHS } from "@/src/constants/path";
import { Divider, FormInput, FormCheckbox } from "@/components/common";
import { CrudKeys, formSchema, initialValues, SignUpFormValues } from "./helpers";

import { useRegister } from "@/src/queries";
import { RegisterPayload } from "@/app/services";

const SignUpPage = () => {
  const router = useRouter();
  const [checked, setChecked] = useState<boolean>(false);

  const { register, isLoading } = useRegister({
    onSuccess() {
      router.replace(`${SYSTEM_PATHS.authentication}?type=login`);
    },
  });
  
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  const {
    handleSubmit,
  } = form;

  const handleValidSubmit = (formValues: SignUpFormValues) => {
    const payload: RegisterPayload = {
      email: formValues.email,
      password: formValues.password,
      userName: formValues.userName,
    };

    register(payload);
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
        style={{
          backgroundColor: COLOR_CODES.SECONDARY_BG,
          cursor: 'pointer',
          marginTop: '20px',
          marginBottom: '28px'
        }}
      />

      <Divider text="OR" />

      <Form {...form}>
        <form onSubmit={handleSubmit(handleValidSubmit)}>
          <Grid container gap={3}>
            <Grid size={12}>
              <FormInput 
                name={CrudKeys._USERNAME}
                label="Username"
                placeholder="coolseller123"
                startIcon={<HiOutlineUser style={{ width: '24px', height: '24px' }} />}
                required
              />
            </Grid>
            <Grid size={12}>
              <FormInput 
                name={CrudKeys._EMAIL}
                label="Email"
                placeholder="seller@gmail.com"
                startIcon={<CiMail style={{ width: '24px', height: '24px' }} />}
                required
              />
            </Grid>
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

            <Grid size={12}>
              <FormCheckbox 
                name=""
                checked={checked}
                onClick={() => setChecked(!checked)}
                label={
                  <Stack direction='row' alignItems='center' gap={1}>
                    <Typography sx={{ fontSize: TEXT_SIZE.SM, fontWeight: FONT_WEIGHT.BOLD }}>
                      I agree to{" "}
                      <span className="underline">Terms</span>{" "}
                      and{" "}
                      <span className="underline">Privacy Policy</span>.{" "}
                      I&apos;m 18+ and ready to make money!
                    </Typography>
                    <MoneyBagEmoji width={16} height={16} />
                  </Stack>
                }
              />
            </Grid>
          </Grid>

          <Stack mt={4} justifyContent='center' direction='row'>
            <Button
              type="submit"
              label="CREATE MY SHOP!"
              endIcon={<LuArrowRightFromLine style={{ width: '20px', height: '20px' }} />}
              style={{
                minWidth: '300px',
              }}
              disabled={!checked || isLoading}
              isLoading={isLoading}
            />
          </Stack>
        </form>
      </Form>
    </Stack>
  );
};

export default SignUpPage;
