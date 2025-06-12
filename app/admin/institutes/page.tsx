"use client";
import * as React from "react";
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
import { Edit2, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
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

export type Institute = {
  id: string;
  name: string;
  acronym: string;
  overview: string;
  about: string;
  introduction: string;
  icon: string;
  logo: string;
  active: boolean;
};

export default function InstituteDataTable() {
  const [data, setData] = React.useState<Institute[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // New state for global filter
  const [globalFilter, setGlobalFilter] = React.useState("");

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [formState, setFormState] = React.useState<Partial<Institute>>({});

  const handleDelete = React.useCallback(async (id: string) => {
    if (!confirm("Delete this institute?")) return;
    try {
      await fetch("/api/institutes", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
        },
        body: JSON.stringify({ id }),
      });
      fetchInstitutes();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const table = useReactTable({
    data,
    columns: React.useMemo<ColumnDef<Institute>[]>(
      () => [
        {
          id: "select",
          header: ({ table }) => (
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
              }
              onCheckedChange={(value) =>
                table.toggleAllPageRowsSelected(!!value)
              }
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
          enableSorting: false,
          enableHiding: false,
        },
        {
          accessorKey: "logo",
          header: "",
          cell: ({ row }) => (
            <div className="text-center">
              <Image
                src={`/${row.original.logo}` || "/images/logos/costrad.png"}
                alt={
                  row.original.name
                    ? `${row.original.name} logo`
                    : "Institute logo"
                }
                width={80}
                height={80}
                className="rounded-full object-cover"
              />
            </div>
          ),
        },
        {
          accessorKey: "acronym",
          header: "Acronym",
          cell: ({ getValue }) => (
            <div className="uppercase font-bold  max-w-xs h-auto overflow-hidden text-ellipsis">
              {getValue() as string}
            </div>
          ),
        },
        { accessorKey: "name", header: "Name" },
        {
          accessorKey: "overview",
          header: "Overview",
          size: 250,
          cell: ({ cell }) => (
            <p className="whitespace-normal font-opensans line-clamp-4 break-words text-sm max-w-[450px]">
              {cell.getValue()?.toString()}
            </p>
          ),
        },
        {
          id: "actions",
          header: () => <div className="flex justify-end">Actions</div>,
          enableHiding: false,
          cell: ({ row }) => (
            <div className="flex items-center justify-end space-x-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleEdit(row.original)}
                className="text-primary"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="text-danger"
                onClick={() => handleDelete(row.original.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ),
        },
      ],
      [handleDelete]
    ),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    }, // Add globalFilter to state
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter, // Add this handler
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  React.useEffect(() => {
    fetchInstitutes();
  }, []);

  async function fetchInstitutes() {
    try {
      const res = await fetch("/api/institutes", {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
        },
      });
      const institutes: Institute[] = await res.json();
      setData(institutes);
    } catch (error) {
      console.error("Fetch error", error);
    }
  }

  async function handleCreate() {
    try {
      await fetch("/api/institutes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
        },
        body: JSON.stringify(formState),
      });
      setDialogOpen(false);
      fetchInstitutes();
    } catch (error) {
      console.error(error);
    }
  }

  function handleEdit(institute: Institute) {
    setIsEditing(true);
    setFormState(institute);
    setDialogOpen(true);
  }

  async function handleUpdate() {
    try {
      await fetch("/api/institutes", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
        },
        body: JSON.stringify(formState),
      });
      setDialogOpen(false);
      setIsEditing(false);
      fetchInstitutes();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="w-full p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row sm: gap-y-2 justify-between items-center">
        <div className=" py-4">
          {" "}
          {/* Removed gap-2 as only one input */}
          <Input
            placeholder="Filter all columns..." // Updated placeholder
            value={globalFilter ?? ""} // Use globalFilter
            onChange={(event) => setGlobalFilter(event.target.value)} // Update globalFilter state
            className="max-w-sm"
          />
        </div>
        <div className="flex items-center py-4">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setFormState({});
                }}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Institute
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {isEditing ? "Edit" : "Add"} Institute
                </DialogTitle>
                <DialogDescription>
                  {isEditing
                    ? "Update the institute details below."
                    : "Fill out the form to add a new institute."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 gap-4 py-4">
                <Input
                  placeholder="Name"
                  value={formState.name || ""}
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                />
                <Input
                  placeholder="Acronym"
                  value={formState.acronym || ""}
                  onChange={(e) =>
                    setFormState({ ...formState, acronym: e.target.value })
                  }
                />
                <Textarea
                  placeholder="Overview"
                  value={formState.overview || ""}
                  onChange={(e) =>
                    setFormState({ ...formState, overview: e.target.value })
                  }
                />
                <Textarea
                  placeholder="About"
                  value={formState.about || ""}
                  onChange={(e) =>
                    setFormState({ ...formState, about: e.target.value })
                  }
                />
                <Textarea
                  placeholder="Introduction"
                  value={formState.introduction || ""}
                  onChange={(e) =>
                    setFormState({ ...formState, introduction: e.target.value })
                  }
                />
                <Input
                  placeholder="Icon URL"
                  value={formState.icon || ""}
                  onChange={(e) =>
                    setFormState({ ...formState, icon: e.target.value })
                  }
                />
                <Input
                  placeholder="Logo URL"
                  value={formState.logo || ""}
                  onChange={(e) =>
                    setFormState({ ...formState, logo: e.target.value })
                  }
                />
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={formState.active || false}
                    onCheckedChange={(val) =>
                      setFormState({ ...formState, active: !!val })
                    }
                  />
                  <span>Active</span>
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={() => {
                    setDialogOpen(false);
                    setIsEditing(false);
                    setFormState({});
                  }}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button onClick={isEditing ? handleUpdate : handleCreate}>
                  {isEditing ? "Update" : "Create"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{ width: cell.column.getSize() }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
