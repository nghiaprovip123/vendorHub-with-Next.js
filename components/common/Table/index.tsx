/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/incompatible-library */
'use client';

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { BiFilterAlt } from "react-icons/bi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
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
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui";
import { FONT_WEIGHT, TEXT_SIZE } from "@/src/constants/text";
import { Input } from "../Input";
import { 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow, 
  UITable,
} from "./TableComponents";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
} from "./PaginationComponents";

// CUSTOME TABLE
interface DataTableProps<TData, TValue> {
  title?: string,
  totalRecord: number,
  take?: number,
  data: TData[],
  columns: ColumnDef<TData, TValue>[],
  isLoading?: boolean;
  handleButtonAction?: () => void;
};

const Table = <TData, TValue>({
  title,
  data,
  totalRecord,
  take = 10,
  columns,
  isLoading,
  handleButtonAction
}: DataTableProps<TData, TValue>) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const page = Number(searchParams.get("page") ?? 1);
  const totalPage = Math.ceil(totalRecord / take);

  const onChange = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
    router.push(`?${params.toString()}`);
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    manualPagination: true,
    pageCount: totalPage,
    
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
        <TableCell key={cell.id} style={{ padding: '12px 16px' }}>
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
          maxHeight: '574px',
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

        <UITable>
          <TableHeader 
            className="font-semibold sticky top-0 z-10" 
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

      </Stack>
      
      <Stack ml='auto'>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button 
                label="Previous"
                variant='noShadow'
                startIcon={<FaChevronLeft style={{ width: '12px', height: '12px' }} />}
                onClick={() => onChange(page - 1)}
                style={{ width: '100px' }}
                disabled={page === 1}
              />
            </PaginationItem>

            {Array.from({ length: totalPage }).map((_, i) => {
              const p = i + 1;
              return (
                <PaginationItem key={p}>
                  <PaginationLink
                    isActive={p === page}
                    onClick={() => onChange(p)}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <Button 
                label="Next"
                variant='noShadow'
                startIcon={<FaChevronRight style={{ width: '12px', height: '12px' }} />}
                onClick={() => onChange(page + 1)}
                style={{ width: '100px' }}
                disabled={page === totalPage}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Stack>
    </Stack>
  );  
};

export default Table;
