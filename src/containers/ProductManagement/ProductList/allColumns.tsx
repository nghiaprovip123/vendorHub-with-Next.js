/* eslint-disable @typescript-eslint/no-explicit-any */
'use-client'

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Category } from "./types";
// import { Checkbox } from "@/components/ui/checkbox";
// import CategoriesDetail from "../CategoriesDetail";
import { 
  Button,
  DropdownMenu, 
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  ImageCard,
} from "@/components/ui";
import { Checkbox } from "@radix-ui/react-checkbox";

export const allColumns = (
  dialog: any,
): ColumnDef<any>[] => [
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
    
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => <div className="capitalize">{row.getValue("stock")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div className="capitalize">{row.getValue("category")}</div>,
  },
  {
    accessorKey: "warehouse",
    header: "Warehouse",
    cell: ({ row }) => <div className="capitalize">{row.getValue("warehouse")}</div>,
  },
  {
    accessorKey: "variants",
    header: "Variants",
    cell: ({ row }) => <div className="capitalize">{row.getValue("variants")}</div>,
  },
  {
    accessorKey: "productAssets",
    header: "Product Assets",
    cell: ({ row }) => <div className="capitalize">{row.getValue("productAssets")}</div>,
  },
  {
    header: 'Action',
    cell: ({ row }) => {
      const item = row.original;
      
      return (
        <></>
      );
    },
  },
];
