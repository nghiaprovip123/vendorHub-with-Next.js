"use client"

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem } from "@/components/ui";

// SHADCN CHECKBOX //
const LibCheckbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      data-slot="checkbox"
      className={cn(
        "peer size-4 shrink-0 outline-2 outline-border ring-offset-white focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-main data-[state=checked]:text-white",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current"
      >
        <CheckIcon className="size-4 text-main-foreground" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
});
LibCheckbox.displayName = "LibCheckbox";

// CUSTOM CHECKBOX //
type CheckboxFieldProps = {
  label?: React.ReactNode,
  error?: string,
} & React.ComponentPropsWithoutRef<typeof LibCheckbox>

const Checkbox = React.forwardRef<
  React.ComponentRef<typeof LibCheckbox>,
  CheckboxFieldProps
>(({ label, error, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="flex items-center gap-2 cursor-pointer">
        <LibCheckbox ref={ref} {...props} />
        <span className="text-sm text-foreground font-bold">{label}</span>
      </label>

      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}
    </div>
  )
});
Checkbox.displayName = "Checkbox";

// FORM //
type FormCheckboxProps = CheckboxFieldProps & {
  name: string,
  label?: React.ReactNode,
};

export const FormCheckbox = ({ name, label, ...props }: FormCheckboxProps) => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormControl>
            <Checkbox
              label={label}
              {...field}
              {...props}
              error={fieldState.error?.message}
            />
          </FormControl>
        </FormItem>
      )}
    />
  )
}
