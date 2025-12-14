'use client';

import { Stack } from "@mui/material";

import { 
  Input as LibInput,
  Label,
} from "@/components/ui";

type Props = {
  label: string,
  name: string,
  type?: string,
  placeholder?: string,
  startIcon?: React.ReactNode,
};

const Input = ({
  label,
  name,
  type = 'text',
  placeholder,
  startIcon,
}: Props) => {
  return (
    <Stack direction='column' gap={1}>
      <Label htmlFor={name} className="font-bold">{label}</Label>
      <Stack 
        direction='row' 
        alignItems='center' 
        gap={2}
        px={1}
        className="rounded-base border-2 border-border bg-secondary-background"
      >
        {startIcon && <span className="inline-flex">{startIcon}</span>}
        <LibInput type={type} id={type} placeholder={placeholder} />
      </Stack>
    </Stack>
  );
};

export default Input;
