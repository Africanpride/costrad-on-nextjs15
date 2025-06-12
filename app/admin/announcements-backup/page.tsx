"use client";

import * as React from "react";
import Image from "next/image";
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
import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ActionsCell } from "../testimonials/ActionsCell";
import { format } from "date-fns";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Textarea } from "@/components/ui/textarea";
import { DialogPortal } from "@radix-ui/react-dialog";
import { AnnouncementActionsCell } from "./AnnouncementActionsCell";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export type Announcement = {
  userId?: string;
  content?: string;
  featured: boolean;
  approved: boolean;
};

export const columns: ColumnDef<any>[] = [
  {
    header: "Author",
    accessorFn: (row) => row.user?.name || "System Notification",
    cell: ({ row }) => (
      <Image
        src={row.original.user?.image || "/images/avatar.png"}
        alt={row.original.user?.name || "Unknown user"}
        width={50}
        height={50}
        className="rounded-full"
      />
    ),
  },
  {
    header: "Content",
    accessorKey: "content",
    cell: ({ row }) => (
      <div className="space-y-2">
        <p className="whitespace-normal line-clamp-3 break-words text-sm max-w-[450px]">
          {row.original.content}
        </p>
        <h5 className="font-bebas ">
          &mdash; {row.original.user?.name || "System Notification"}
        </h5>
      </div>
    ),
  },

  {
    header: "Date",
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const createdAtValue = row.original.createdAt;

      // Check if the value is truthy and can be parsed
      if (createdAtValue && !isNaN(new Date(createdAtValue).getTime())) {
        return format(new Date(createdAtValue), "PPP");
      }
      return "N/A"; // Or any fallback text for invalid/missing dates
    },
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const { id, approved, featured } = row.original;
      return (
        <AnnouncementActionsCell
          id={id}
          approved={approved}
          featured={featured}
        />
      );
    },
  },
  {
    header: "Status",
    cell: ({ row }) => (
      <div className="flex gap-2">
        {row.original.approved && <Badge>Approved</Badge>}
        {row.original.featured && <Badge variant="secondary">Featured</Badge>}
      </div>
    ),
  },
];

export default function AnnouncementPage() {
  const [formState, setFormState] = React.useState({
    content: "",
    featured: false,
    approved: true,
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [data, setData] = React.useState<Announcement[]>([]);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  React.useEffect(() => {
    fetchAnnouncements();
  }, []);

  async function fetchAnnouncements() {
    try {
      const res = await fetch("/api/announcements");
      const announcements: Announcement[] = await res.json();
      setData(announcements);
    } catch (error) {
      console.error("Fetch error", error);
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/announcements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      if (!res.ok) throw new Error("Failed to post announcement");

      toast.success("Announcement posted successfully!");
      setFormState({ content: "", featured: false, approved: true });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full p-4 sm:p-8">
      <div className="flex sm:flex-flow justify-between items-center py-4">
        <Input
          placeholder="Filter contents..."
          value={(table.getColumn("content")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("content")?.setFilterValue(event.target.value)
          }
          className="max-w-lg"
        />

        <div className="flex gap-4 items-center ">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={() =>
                  setFormState({ content: "", featured: false, approved: true })
                }
              >
                <PlusCircledIcon className="mr-2 h-4 w-4" /> Add Announcement
              </Button>
            </DialogTrigger>

            <DialogContent className="w-auto p-4 sm:max-w-[50vw]">
              <DialogHeader>
                <DialogTitle>Create New Announcement</DialogTitle>
                <DialogDescription>
                  Fill out the details below to publish a new announcement.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid w-full gap-3">
                    <Label htmlFor="content">Your Message</Label>
                    <Textarea
                      id="content"
                      name="content"
                      value={formState.content}
                      onChange={handleChange}
                      placeholder="Type your message here."
                      required
                    />
                  </div>

                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <Checkbox
                        id="featured"
                        name="featured"
                        checked={formState.featured}
                        onCheckedChange={(checked) =>
                          setFormState((prev) => ({
                            ...prev,
                            featured: !!checked,
                          }))
                        }
                      />
                      Featured
                    </label>

                    <label className="flex items-center gap-2">
                      <Checkbox
                        id="approved"
                        name="approved"
                        checked={formState.approved}
                        onCheckedChange={(checked) =>
                          setFormState((prev) => ({
                            ...prev,
                            approved: !!checked,
                          }))
                        }
                      />
                      Approved
                    </label>
                  </div>
                </div>

                <DialogFooter className="mt-4">
                  <DialogClose asChild>
                    <Button variant="outline" type="button">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Publishing..." : "Publish Announcement"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
                  colSpan={columns.length}
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
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
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
    </div>
  );
}
