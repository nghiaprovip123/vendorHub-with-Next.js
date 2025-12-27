/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { BiFilterAlt } from "react-icons/bi";
import { 
  ColumnDef, 
  ColumnFiltersState, 
  flexRender, 
  getCoreRowModel, 
  getFilteredRowModel, 
  getPaginationRowModel, 
  getSortedRowModel, 
  SortingState, 
  useReactTable
} from "@tanstack/react-table";
import { IoIosSearch } from "react-icons/io";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";

import { Button } from "@/components/ui";
import { FONT_WEIGHT, TEXT_SIZE } from "@/src/constants/text";
import { cn } from "@/lib";
import { Input } from "../Input";

const UITable = ({ className, ...props }: React.ComponentProps<"table">) => {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}

const TableHeader = ({ className, ...props }: React.ComponentProps<"thead">) => {
  return (
    <thead
      data-slot="table-header"
      className={cn("rounded bg-[#E2E0D0]", className)}
      {...props}
    />
  )
}

const TableBody = ({ className, ...props }: React.ComponentProps<"tbody">) => {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

const TableFooter = ({ className, ...props }: React.ComponentProps<"tfoot">) => {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

const TableRow = ({ className, ...props }: React.ComponentProps<"tr">) => {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      )}
      {...props}
    />
  )
}

const TableHead = ({ className, ...props }: React.ComponentProps<"th">) => {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

const TableCell = ({ className, ...props }: React.ComponentProps<"td">) => {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

const TableCaption = ({
  className,
  ...props
}: React.ComponentProps<"caption">) => {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  )
}

// CUSTOME TABLE
interface DataTableProps<TData, TValue> {
  title?: string,
  data: TData[],
  columns: ColumnDef<TData, TValue>[],
  isLoading?: boolean;
  handleButtonAction?: () => void;
};

const Table = <TData, TValue>({
  title,
  data,
  columns,
  isLoading,
  handleButtonAction
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const hasRows = table.getRowModel().rows.length > 0;

  const renderRows = table.getRowModel().rows.map((row) => (
    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id} style={{ padding: '0px 16px' }}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  ));

  const loadingView = (
    <TableRow>
      <TableCell
        colSpan={columns.length}
        className="h-[100px] p-0"
      >
        <div className="flex h-full items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </TableCell>
    </TableRow>
  );

  const emptyView = (
    <TableRow>
      <TableCell 
        colSpan={columns.length} 
        className="text-center py-10"
      >
        <Stack>
          <Image 
            src='/assets/EmptyTable.svg'
            alt="Empty Data"
            height={400}
            width={450}
            style={{ 
              margin: '40px auto 0',
              objectFit: 'cover'
            }}
          />
        </Stack>
      </TableCell>
    </TableRow>
  );
  
  return (
    <Stack gap={2}>
      <Stack flexDirection='row' alignItems='center' justifyContent='space-between'>
        {title && (
          <h2 className="text-2xl font-bold text-[#584700]">
            {title}{' '}{`(${data.length})`}
          </h2>
        )}
        <div className="flex items-center gap-6">
          <Button 
            className="w-20 text-sm!" 
            variant='noShadow'
            onClick={handleButtonAction}
            label='Filter'
            startIcon={<BiFilterAlt style={{ width: '20px', height: '20px' }} />}
            style={{}}
          />

          <Input 
            placeholder="Search products..."
            startIcon={<IoIosSearch style={{ width: '20px', height: '20px' }} />}
            style={{
              width: '350px',
            }}
          />
        </div>

      </Stack>

      <Stack 
        className="shadow-shadow" 
        style={{
          borderRadius: '20px',
          border: '1px solid #000',
          padding: '12px 20px',
          backgroundColor: '#F7F6EC',
          minHeight: '574px',
        }}
        gap={2}
      >
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Typography style={{
            fontSize: TEXT_SIZE.LG,
            fontWeight: FONT_WEIGHT.BOLD
          }}>
            Selected 10 Products
          </Typography>

          <Button 
            label="Add Product"
            style={{ width: '140px' }}
            endIcon={<FiPlusCircle style={{ width: '20px', height: '20px' }} />}
          />
        </Stack>
        <UITable style={{ height: '100%' }}>
          <TableHeader 
            className="font-semibold" 
            style={{ 
              backgroundColor: '#E2E0D0',
            }}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead 
                    key={header.id} 
                    className="font-semibold uppercase"
                    style={{ padding: '0px 16px' }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading
              ? loadingView
              : hasRows
              ? renderRows
              : emptyView}
          </TableBody>
        </UITable>

        {/* <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="noShadow"
              size="sm"
              label="Previous"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            />
            <Button
              variant="noShadow"
              size="sm"
              label="Next"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            />
          </div>
        </div> */}
      </Stack>
    </Stack>
  );  
};

export default Table;
