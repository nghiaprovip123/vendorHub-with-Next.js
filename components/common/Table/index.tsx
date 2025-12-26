/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { ChevronDown, Loader2 } from "lucide-react";
import { useState } from "react";
import { VscAdd } from "react-icons/vsc";
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

import { 
  Table as UITable,
  TableCell, 
  TableRow,
  TableHeader,
  TableBody,
  DropdownMenu,
  DropdownMenuTrigger,
  Button,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  TableHead,
} from "@/components/ui";

interface DataTableProps<TData, TValue> {
  title?: string,
  data: TData[],
  columns: ColumnDef<TData, TValue>[],
  isLoading?: boolean;
  buttonText?: string;
  handleButtonAction?: () => void;
};

const Table = <TData, TValue>({
  title,
  data,
  columns,
  isLoading,
  buttonText,
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
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  ));

  const loadingView = (
    <TableRow>
      <TableCell colSpan={columns.length} className="text-center py-10">
        <Loader2 className="animate-spin mx-auto" />
      </TableCell>
    </TableRow>
  );

  const emptyView = (
    <TableRow>
      <TableCell colSpan={columns.length} className="text-center py-10">
        No Data
      </TableCell>
    </TableRow>
  );
  
  return (
    <div className="space-y-3">
      {title && <h2 className="text-lg font-semibold">{title}</h2>}

      <div className="flex items-center py-4">
        {/* <Input
          placeholder="Filter title..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("title")?.setFilterValue(e.target.value)
          }
          className="max-w-sm bg-white"
        /> */}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="noShadow" 
              className="ml-auto"
              label="Columns"
              endIcon={<ChevronDown />}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) =>
                    column.toggleVisibility(!!value)
                  }
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        {buttonText && (
          <Button 
            className="text-white bg-black ml-8 cursor-pointer" 
            variant='noShadow'
            onClick={handleButtonAction}
            label={buttonText}
            endIcon={<VscAdd />}
          />
        )}
      </div>

      <div className="rounded-lg">
        <UITable>
          <TableHeader className="font-semibold">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="font-semibold">
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

        <div className="flex items-center justify-end space-x-2 py-4">
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
        </div>
      </div>

    </div>
  );  
};

export default Table;
