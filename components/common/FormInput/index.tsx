'use client';

import { useFormContext } from "react-hook-form";

import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input, InputProps } from "../Input";

export type FormInputProps = InputProps & {
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
