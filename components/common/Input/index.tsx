'use client';

import { Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";
import React from "react";

import * as LabelPrimitive from "@radix-ui/react-label"
import { cn } from "@/lib/utils";
import { TEXT_SIZE, FONT_WEIGHT } from "@/src/constants/text";
import { FormControl, FormField, FormItem } from "@/components/ui";

// SHADCN LABEL & INPUT //
const LibLabel = ({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) => {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
};

const LibInput = ({ 
  className, 
  type, 
  ...props 
}: React.ComponentProps<"input">) => {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-10 w-full rounded-base bg-secondary-background selection:bg-main selection:text-main-foreground px-3 py-2 text-sm font-base text-foreground file:border-0 file:bg-transparent file:text-sm file:font-heading placeholder:text-foreground/50 focus-visible:outline-hidden focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
};

// CUSTOM INPUT //
type InputProps = React.ComponentProps<"input"> & {
  label?: string;
  startIcon?: React.ReactNode;
  error?: string; 
  includeForgetPass?: boolean;
  handleForgetPassword?: () => void;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      name,
      placeholder,
      type = 'text',
      startIcon,
      required,
      error,
      includeForgetPass,
      handleForgetPassword,
      ...props
    },
    ref
  ) => {
    return (
      <Stack direction='column' gap={1}>
        {(label || includeForgetPass) && (
          <Stack direction='row' justifyContent='space-between'>
            <LibLabel htmlFor={name} className="font-bold">
              {label}
              {required ? <span style={{ color: 'red' }}>*</span> : null}
            </LibLabel>

            {includeForgetPass && (
              <p
                style={{
                  fontSize: TEXT_SIZE.SM,
                  fontWeight: FONT_WEIGHT.MEDIUM,
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
                onClick={handleForgetPassword}
              >
                Forgot your password?
              </p>
            )}
          </Stack>
        )}

        <Stack 
          direction='row' 
          alignItems='center' 
          gap={2}
          px={1}
          className={cn(
            "rounded-base border-2 bg-secondary-background",
            error ? "border-red-500" : "border-border"
          )}
        >
          {startIcon && <span className="inline-flex">{startIcon}</span>}

          <LibInput 
            ref={ref}
            type={type} 
            id={name} 
            name={name} 
            placeholder={placeholder}
            {...props}
          />
        </Stack>

        {error && (
          <span className="text-xs text-red-500">{error}</span>
        )}
      </Stack>
    );
  }
);
Input.displayName = 'Input';

// FORM //
type FormInputProps = InputProps & {
  name: string;
};

export const FormInput = ({ name, ...props }: FormInputProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormControl>
            <Input
              {...field}
              {...props}
              error={fieldState.error?.message}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
