/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use-client'

import { ColumnDef } from "@tanstack/react-table";
import { Stack, Typography } from "@mui/material";
import { VscEye } from "react-icons/vsc";

import { useDialog } from "@/components/hooks";
import { MoreActions } from "@/components/common";

export const allColumns = (): ColumnDef<any>[] => [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  // },
  {
    accessorKey: "name",
    header: "Product Name",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <Stack gap={0.5}>
          <Typography fontWeight={600}>{data.name}</Typography>
          <Typography style={{
            backgroundColor: 'var(--primary-color)',
            fontSize: '12px',
            fontWeight: 500,
            width: 'fit-content',
            padding: '4px 8px',
            borderRadius: '99px'
          }}>{data.sku}</Typography>
        </Stack>
      );
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => <Typography fontWeight={500}>{row.original.stock}</Typography>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <Typography fontWeight={500}>{row.original.category}</Typography>,
  },
  {
    accessorKey: "warehouse",
    header: "Warehouse",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <Stack gap={0.5}>
          {data.warehouse.map((item: any, index: number) => (
            <Typography 
              key={index}
              fontWeight={600}
              textTransform='uppercase'
            >
              {item}
            </Typography>
          ))}
        </Stack>
      );
    }
  },
  {
    accessorKey: "variants",
    header: "Variants",
    cell: ({ row }) => <Typography fontWeight={500}>{row.original.variants}</Typography>,
  },
  {
    accessorKey: "productAssets",
    header: "Product Assets",
    cell: ({ row }) => {
      const data = row.original;

      const { openDialog } = useDialog();

      const handleShowAssets = () => {
        openDialog({
          type: 'dialog',
          title: `Product ${data.sku}'s Assets`,
          content: <></>,
          size: 'md',
        })
      };

      return (
        <Stack >
          <VscEye 
            onClick={handleShowAssets} 
            style={{ 
              width: '24px', 
              height: '24px',
              cursor: 'pointer',
            }} 
          />
        </Stack>
      );
    },
  },
  {
    header: 'Action',
    cell: ({ row }) => {
      const item = row.original;
      
      return (
        <MoreActions />
      );
    },
  },
];
