'use client';

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

const Breadcrumb = ({ ...props }: React.ComponentProps<"nav">) => {
  return <nav data-slot="breadcrumb" aria-label="breadcrumb" {...props} />;
};

const BreadcrumbList = ({ className, ...props }: React.ComponentProps<"ol">) => {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "flex flex-wrap items-center gap-1.5 text-sm font-base wrap-break-word text-foreground sm:gap-2.5",
        className,
      )}
      {...props}
    />
  );
};

const BreadcrumbItem = ({ className, ...props }: React.ComponentProps<"li">) => {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  );
};

const BreadcrumbLink = ({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean
}) => {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp data-slot="breadcrumb-link" className={cn(className)} {...props} />
  );
};

const BreadcrumbPage = ({ className, ...props }: React.ComponentProps<"span">) => {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn(className)}
      {...props}
    />
  );
};

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  );
};

type BreadcrumbDataItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbDataItem[];
  className?: string;
};

export const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
  const router = useRouter();

  if (!items || items.length === 0) return null;

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage
                    style={{
                      backgroundColor: 'var(--primary-color)',
                      padding: '4px 8px',
                      borderRadius: '99px',
                    }}
                  >{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    href={item.href}
                    onClick={() => router.push(item.href || '')}
                    className="cursor-pointer"
                  >
                    {item.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>    
    </Breadcrumb>
  );
};
