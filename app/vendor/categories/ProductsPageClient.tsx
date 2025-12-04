// components/DataTableDemo.tsx
"use client";
import React, { useEffect, useState, useMemo } from "react";
import { VscAdd } from "react-icons/vsc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

export type Category = {
  id: string; // MongoDB _id
  cid: string; // Unique Category ID field
  title: string;
  image: string;
};

export default function DataTableDemo() {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  
  // ✅ FIX: Separate state for Create and View dialogs
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [cid, setCid] = useState("");
  const [image, setImage] = useState("");
  
  // ✅ FIX: Separate state for viewing category
  const [viewCategory, setViewCategory] = useState<Category | null>(null);

  // Fetch categories
  useEffect(() => {
    const ac = new AbortController();
    async function fetchCategories() {
      try {
        setLoading(true);
        const res = await fetch("/api/categories", { signal: ac.signal });
        if (!res.ok) throw new Error(`Fetch error: ${res.status}`);
        const json = await res.json();
        const payload = Array.isArray(json) ? json : json?.categories ?? [];
        setData(payload);
      } catch (err: any) {
        if (err.name !== "AbortError") setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
    return () => ac.abort();
  }, []);

  // Submit form (Create)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, cid, image }),
      });
      if (!res.ok) throw new Error("Failed to create category");

      const responseData = await res.json();
      const newCategory = responseData.category || responseData; 
      
      setData((prev) => [...prev, newCategory]);
      
      // Reset form state and close CREATE dialog
      setTitle("");
      setCid("");
      setImage("");
      setIsCreateDialogOpen(false); 

    } catch (err: any) {
      console.error(err);
    }
  };

  // ✅ FIX: Memoized columns with proper dependencies
  const columns: ColumnDef<Category>[] = useMemo(() => [
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
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category ID <ArrowUpDown />
        </Button>
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
        <img
          src={row.getValue("image")}
          alt={String(row.getValue("title"))}
          className="w-10 h-10 object-cover rounded"
        />
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const item = row.original;
        
        // Delete Category
        const handleDelete = async () => {
          try {
            const res = await fetch(`http://localhost:3000/api/categories/${item.id}`, { 
              method: "DELETE",
            });

            if (!res.ok) throw new Error("Failed to delete category");
            
            setData(prevData => prevData.filter(cat => cat.id !== item.id));
            
            console.log(`Category ${item.cid} deleted successfully.`); 

          } catch (err: any) {
            console.error("Error during deletion:", err.message);
          }
        };
        
        // ✅ FIX: View Category - simplified
        const handleViewCategory = () => {
          setViewCategory(item);
          setIsViewDialogOpen(true);
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
              {/* ✅ FIX: Remove DialogTrigger, use onClick directly */}
              <DropdownMenuItem className="cursor-pointer" onClick={handleViewCategory}>
                View
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={handleDelete}
                className="cursor-pointer text-red-500 focus:text-red-500"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ], [setData]); // Keep minimal dependencies

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
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="w-full px-8">
      <h1 className="mt-4 font-extrabold text-4xl">CATEGORY ({data.length})</h1>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter title..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("title")?.setFilterValue(e.target.value)
          }
          className="max-w-sm bg-white"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="noShadow" className="ml-auto">
              Columns <ChevronDown />
            </Button>
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

        {/* ✅ FIX: CREATE Dialog with separate state */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="text-white bg-black ml-8 cursor-pointer">
              Create <VscAdd />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>
                  <h1 className="text-2xl mb-4"> Create a new category </h1> 
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 mb-4 font-semibold">
                <div className="grid gap-1">
                  <Label className="font-semibold" htmlFor="cid">Category ID</Label>
                  <Input
                    className="bg-white"
                    id="cid"
                    value={cid}
                    onChange={(e) => setCid(e.target.value)}
                    placeholder="category id"
                  />
                </div>
                <div className="grid gap-1">
                  <Label className="font-semibold" htmlFor="title">Title</Label>
                  <Input
                    className="bg-white"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="category title"
                  />
                </div>
                <div className="grid gap-1">
                  <Label className="font-semibold" htmlFor="image">Category Image</Label>
                  <Input
                    className="bg-white"
                    id="image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="category url"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="neutral">Close</Button>
                </DialogClose>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* ✅ FIX: VIEW Dialog outside the table, controlled by separate state */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              <h1 className="text-2xl mb-4">Category Details</h1>
            </DialogTitle>
          </DialogHeader>

          {viewCategory && (
            <div className="grid gap-4 mb-4 font-semibold">
              <div className="grid gap-1">
                <Label className="font-bold">Category ID: {viewCategory.cid}</Label>
              </div>

              <div className="grid gap-1">
                <Label className="font-bold">Title: {viewCategory.title}</Label>
              </div>
              <div className="grid gap-1">
                <Label className="font-bold">Category Image</Label>
                <p className="text-sm break-all">{viewCategory.image}</p>
                <img 
                  src={viewCategory.image} 
                  alt={viewCategory.title}
                  className="w-32 h-32 object-cover rounded mt-2"
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <DialogClose asChild>
              <Button className="cursor-pointer" variant="neutral">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {loading ? (
        <div className="h-24 flex items-center justify-center">Loading...</div>
      ) : error ? (
        <div className="h-24 text-center text-red-600">Error: {error}</div>
      ) : (
        <>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead className="font-semibold" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="space-x-2">
              <Button
                variant="noShadow"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="noShadow"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}