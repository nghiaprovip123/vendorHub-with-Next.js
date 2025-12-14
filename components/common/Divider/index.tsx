"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { Stack, Typography } from "@mui/material";

import { cn } from "@/lib/utils";

const Separator = ({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) => {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  )
};

type Props = {
  text?: string;
};

const Divider = ({ text }: Props) => {
  return (
    text ? (
      <Stack direction='row' alignItems='center' justifyContent='center'>
        <Separator className="flex-1 h-0.5 max-w-40" />
        <Typography
          sx={{
            border: '2px solid #000',
            padding: '0px 2px',
            height: 'fit-content',
            fontWeight: 600
          }}
        >
          {text}
        </Typography>
        <Separator className="flex-1 h-0.5 max-w-40" />
      </Stack>
    ) : (
      <Separator />
    )
  );
};

export default Divider;
