/* eslint-disable @typescript-eslint/no-explicit-any */
'use-client'

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Category } from "./types";
// import { Checkbox } from "@/components/ui/checkbox";
import CategoriesDetail from "../CategoriesDetail";
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
): ColumnDef<Category>[] => [
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
    accessorKey: "cid",
    header: ({ column }) => (
      <Button
        variant="noShadow"
        className="ml-[-20] bg-transquarent border-0 font-semibold"
        size="sm"
        label="Category ID"
        endIcon={<ArrowUpDown />}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("cid")}</div>,
  },
  {
    accessorKey: "title",
    header: "Category Title",
    cell: ({ row }) => <div className="capitalize">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "image",
    header: "Category Image",
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
      
      const handleViewDetail = () => {
        dialog.open({
          title: 'View Category Detail',
          content: <CategoriesDetail data={item} />,
          confirmText: "Close",
          size: "md",
        });
      }; 
      
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="bg-amber-50">
            <Button variant="noShadow" className="p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="font-semibold bg-white" align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(item.cid)}
            >
              Copy Category ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={handleViewDetail}>
              View
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => null}
              className="cursor-pointer text-red-500 focus:text-red-500"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
