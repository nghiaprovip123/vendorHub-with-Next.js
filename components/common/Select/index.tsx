'use client';

import { FieldValues, Path, useFormContext } from "react-hook-form";
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { FormControl, FormField, FormItem } from "@/components/ui";
import { 
  Popover, 
  PopoverContent,
  PopoverTrigger
} from "./PopoverComponents";
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem 
} from "./CommandComponents";
import { cn } from "@/lib";

type Option = {
  label: string;
  value: string;
};

type FormSelectProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  options: Option[];
  disabled?: boolean;
  searchable?: boolean;
};

export const FormSelect = <T extends FieldValues>({
  name,
  label,
  placeholder = "Select...",
  options,
  disabled,
  searchable = false,
}: FormSelectProps<T>) => {
  const { control } = useFormContext<T>();
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selected = options.find(
          (opt) => opt.value === field.value
        );

        return (
          <FormItem>
            {label && (
              <span className="font-bold">{label}</span>
            )}

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <div style={{
                    border: '2px solid #000',
                    borderRadius: '5px',
                    padding: '0 12px',
                    backgroundColor: '#fff',
                    cursor: 'pointer'
                  }}>
                    <div className="flex h-10 justify-between items-center">
                      {selected?.label ? (
                        <span className="font-base text-black">
                          {selected?.label}
                        </span>
                      ) : (
                        <span className="font-base text-[#7f7f7f]">
                          {placeholder}
                        </span>
                      )}
                      <ChevronsUpDown style={{ width: '20px', height: '20px' }} />
                    </div>
                  </div>
                </FormControl>
              </PopoverTrigger>

              <PopoverContent className="p-0 w-(--radix-popover-trigger-width) bg-white">
                <Command className="bg-white rounded-base! border-none">
                  {searchable && (
                    <CommandInput placeholder="Search..." />
                  )}

                  <CommandEmpty>
                    <span className="leading-9">
                      No data
                    </span>
                  </CommandEmpty>

                  {options.length !== 0 && (
                    <CommandGroup>
                      {options.map((opt) => (
                        <CommandItem
                          key={opt.value}
                          value={opt.label}
                          onSelect={() => {
                            field.onChange(opt.value);
                            setOpen(false);
                          }}
                        >
                          <span>
                            {opt.label}
                          </span>
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              opt.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                </Command>
              </PopoverContent>
            </Popover>
          </FormItem>
        );
      }}
    />
  );
};
