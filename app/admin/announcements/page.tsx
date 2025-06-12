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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
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

const data: Announcement[] = [
  {
    userId: "60a7d9b0f7e3d1a2c3b4e5f6",
    content:
      "Exciting news! Our new community center is officially open. Come and explore the facilities!",
    featured: true,
    approved: true,
  },
  {
    userId: "60a7d9b0f7e3d1a2c3b4e5f7",
    content:
      "Reminder: The annual neighborhood clean-up is scheduled for next Saturday. Let's keep our area beautiful!",
    featured: false,
    approved: true,
  },
  {
    userId: "60a7d9b0f7e3d1a2c3b4e5f8",
    content:
      "Looking for volunteers to help with our upcoming charity event. Your support makes a difference!",
    featured: true,
    approved: false,
  },
  {
    userId: "60a7d9b0f7e3d1a2c3b4e5f9",
    content:
      "New yoga classes starting soon at the community hall. Sign up now to reserve your spot!",
    featured: false,
    approved: true,
  },
  {
    userId: "60a7d9b0f7e3d1a2c3b4e5fa",
    content:
      "Important notice: Road closures in effect this weekend for the annual marathon. Plan your routes accordingly.",
    featured: false,
    approved: true,
  },
  {
    userId: "60a7d9b0f7e3d1a2c3b4e5fb",
    content:
      "Seeking donations for our winter coat drive. Help us keep everyone warm this season.",
    featured: true,
    approved: true,
  },
  {
    userId: "60a7d9b0f7e3d1a2c3b4e5fc",
    content:
      "Community garden plots are now available for rent. Grow your own fresh produce!",
    featured: false,
    approved: false,
  },
  {
    userId: "60a7d9b0f7e3d1a2c3b4e5fd",
    content:
      "Don't miss our free financial literacy workshop next month. Learn to manage your money effectively.",
    featured: true,
    approved: true,
  },
  {
    userId: "60a7d9b0f7e3d1a2c3b4e5fe",
    content:
      "Call for artists: Submit your work for our upcoming local art exhibition.",
    featured: false,
    approved: true,
  },
  {
    userId: "60a7d9b0f7e3d1a2c3b4e5ff",
    content:
      "Local library will have extended hours starting next week. More time for reading and research!",
    featured: false,
    approved: true,
  },
];

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
        <h5 className="font-bebas ">&mdash; {row.original.user?.name || "System Notification"}</h5>
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
    }
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const { id, approved, featured } = row.original;
      return <ActionsCell id={id} approved={approved} featured={featured} />;
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

  return (
    <div className="w-full p-4 sm:p-8">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter contents..."
          value={(table.getColumn("content")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("content")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
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
