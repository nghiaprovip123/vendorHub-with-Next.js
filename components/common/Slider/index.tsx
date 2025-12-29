'use client';

import { FieldValues, Path, useFormContext } from "react-hook-form";
import * as SliderPrimitive from "@radix-ui/react-slider";

import {
  FormField,
  FormItem,
  FormControl,
} from "@/components/ui";
import { Slider } from "./SliderComponents";
import { Stack } from "@mui/material";

type FormSliderRangeProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  showValue?: boolean;
} & React.ComponentProps<typeof SliderPrimitive.Root>;

export const FormSlider = <T extends FieldValues>(
  props: FormSliderRangeProps<T>
) => {
  const {
    name,
    label,
    value,
    min = 0,
    max = 100,
    step = 1,
    disabled,
    showValue,
    ...restProps
  } = props;

  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const error = fieldState.error?.message;
        
        return (
          <FormItem>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
              {label && (
                <span className="font-bold">{label}</span>
              )}
              {showValue && (
                <span className="text-sm font-bold">
                  {`${value?.[0]} - ${value?.[1]}`}
                </span>
              )}
            </Stack>

            <FormControl>
              <Slider
                min={min}
                max={max}
                step={step}
                disabled={disabled}
                value={value}
                onValueChange={field.onChange}
                {...restProps}
              />
            </FormControl>

            {error && (
              <span className="text-xs text-red-500">{error}</span>
            )}
          </FormItem>
        );
      }}
    />
  );
};
