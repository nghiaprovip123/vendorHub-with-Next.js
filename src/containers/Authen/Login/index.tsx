'use client';

import { Stack, Typography, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import { CiMail } from "react-icons/ci";
import { IoKeyOutline } from "react-icons/io5";
import { LuArrowRightFromLine } from "react-icons/lu";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Cookies from "universal-cookie";

import { 
  WaveHandEmoji, 
  MoneyBagEmoji,
} from "@/components/common/Emoji";
import { Button, Form } from "@/components/ui";
import { GoogleLogo } from "@/components/common/Logo";
import { COLOR_CODES } from "@/src/constants/color";
import { Divider, FormInput } from "@/components/common";
import { SYSTEM_PATHS } from "@/src/constants/path";
import { CrudKeys, formSchema, initialValues, LoginFormValues } from "./helpers";

import { useLogin } from "@/src/queries";

const LoginPage = () => {
  const router = useRouter();
  const cookies = new Cookies();

  const { login, isLoading } = useLogin({
    onSuccess(data) {
      cookies.set('accessToken', data.accessToken, { 
        path: '/' ,
        sameSite: 'strict',
        maxAge: 15 * 60,
      });
      router.push('/category-list');
    },
  });

  // const handleLoginWithGoogle = () => {
  //   startTransition(() => {
  //     router.push('/api/auth/google');
  //   });
  // };

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  const {
    handleSubmit,
  } = form;

  const handleValidSubmit = (formValues: LoginFormValues) => {
    login(formValues);
  };

  return (
    <Stack>
      <Stack direction='row' alignItems='center' gap={2} justifyContent='center'>
        <Typography className="semi-2xl">
          WELCOME BACK!
        </Typography>
        <WaveHandEmoji width={20} height={20} />
      </Stack>
      
      <Stack direction='row' alignItems='center' gap={1} justifyContent='center'>
        <Typography className="semi-2xl" letterSpacing={1}>
          Let&apos;s get you back to the bag
        </Typography>
        <MoneyBagEmoji width={20} height={20} />
      </Stack>

      <Button 
        variant='default'
        label="CONTINUE WITH GOOGLE"
        startIcon={<GoogleLogo />}
        style={{
          backgroundColor: COLOR_CODES.SECONDARY_BG,
          marginTop: '20px',
          marginBottom: '28px'
        }}
        // onClick={handleLoginWithGoogle}
        // disabled={isPending}
      />

      <Divider text="OR" />
      <Form {...form}>
        <form onSubmit={handleSubmit(handleValidSubmit)}>
          <Grid container gap={3}>
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
                handleForgetPassword={() => router.push(SYSTEM_PATHS.forgetPassword)}
                required
                includeForgetPass
              />
            </Grid>
          </Grid>

          <Stack mt={4} justifyContent='center' direction='row'>
            <Button
              type="submit"
              label="LET'S GO!"
              endIcon={<LuArrowRightFromLine style={{ width: '20px', height: '20px' }} />}
              style={{
                minWidth: '300px',
              }}
              disabled={isLoading}
              isLoading={isLoading}
            />
          </Stack>
        </form>
      </Form>
    </Stack>
  );
};

export default LoginPage;
