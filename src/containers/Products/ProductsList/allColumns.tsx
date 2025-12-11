/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Product } from "./types";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  ImageCard
} from "@/components/ui";

export const allColumns = (
  dialog: any
): ColumnDef<Product>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "id", 
    header: "DB ID",
    cell: ({ row }) => <div className="text-xs">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "pid",
    header: ({ column }) => (
      <Button
        variant="noShadow"
        label="Product ID"
        className="ml-[-20] bg-transquarent border-0 font-semibold"
        size="sm"
        endIcon={<ArrowUpDown />}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("pid")}</div>,
  },
  {
    accessorKey: "title",
    header: "Product Title",
    cell: ({ row }) => <div className="capitalize">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "price",
    header: "Product Price",
    cell: ({ row }) => <div className="capitalize">{row.getValue("price")}</div>,
  },
  {
    accessorKey: "image",
    header: "Product Image",
    cell: ({ row }) => (
      <ImageCard  
        imageUrl={row.getValue("image")}
        className="w-10 h-10 object-cover rounded"
      />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original;

      const handleViewProduct = () => {
          dialog.open({
          title: 'View Product Details',
          content: <></>,
          confirmText: "Close",
          size: "md",
        });
      };
      
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="bg-amber-50">
            <Button 
              variant="noShadow" 
              className="p-0"
              style={{ height: '24px' }}
              endIcon={<MoreHorizontal />}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="font-semibold bg-white" align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(item.pid)}
            >
              Copy Product ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={handleViewProduct}>
              View
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer text-red-500 focus:text-red-500"
              onClick={() => null}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];