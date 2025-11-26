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

  // import the interface for Category.
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
    const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog

    const [title, setTitle] = useState("");
    const [cid, setCid] = useState("");
    const [image, setImage] = useState("");

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
      e.preventDefault(); // Crucial to prevent full page reload
      try {
        const res = await fetch("/api/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, cid, image }),
        });
        if (!res.ok) throw new Error("Failed to create category");

        const responseData = await res.json();
        // Ensure we append the category object, assuming the API returns it under a key or directly
        const newCategory = responseData.category || responseData; 
        
        setData((prev) => [...prev, newCategory]); // append to table
        
        // Reset form state and close dialog
        setTitle("");
        setCid("");
        setImage("");
        setIsDialogOpen(false); 

      } catch (err: any) {
        console.error(err);
      }
    };


    // defining how each column in Data Table behave.
    // ✅ FIX: Defined inside the component and memoized to access setData and for performance
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
          console.log("List of the data from Item Row", item);
          const handleDelete = async () => {
            try {
              // Use item.id (MongoDB _id) which is the most reliable unique identifier.
              const res = await fetch(`http://localhost:3000/api/categories/${item.id}`, { 
                method: "DELETE",
              });

              if (!res.ok) throw new Error("Failed to delete category");
              
              // ✅ FIX: Update the local state (data) to reflect the deletion
              setData(prevData => prevData.filter(cat => cat.id !== item.id));
              
              console.log(`Category ${item.cid} deleted successfully.`); 

            } catch (err: any) {
              console.error("Error during deletion:", err.message);
              // Optionally, set an error state for the user here
            }
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
                <DropdownMenuItem>View</DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={handleDelete}
                  className="text-red-500 focus:text-red-500" // Visual cue for deletion
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ], [setData]); // Dependency array: ensures columns are only rebuilt if setData changes

    const table = useReactTable({
      data,
      columns, // Now using the columns defined inside the component
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

          {/* ✅ FIX: Dialog controlled by state for closing after submission */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="text-white bg-black border-cyan-300 ml-8 cursor-pointer">
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