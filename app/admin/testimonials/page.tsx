// File: app/admin/testimonials/page.tsx

import { prisma } from "@/prisma/dbConnect";
import { GenericDataTable } from "@/components/generic-data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { IconCirclePlus } from "@tabler/icons-react";
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

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    include: { user: true },
  });

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">User Testimonials</h1>
      <GenericDataTable
        extention={<ExtensionComponent />}
        addFiltering={true}
        columns={columns}
        data={testimonials}
      />
    </div>
  );
}

export function ExtensionComponent() {
  return (
    <div>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button variant="outline" size="lg" className="cursor-pointer hidden">
              <IconCirclePlus /> Add New
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Testimonial</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Name</Label>
                <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username-1">Username</Label>
                <Input
                  id="username-1"
                  name="username"
                  defaultValue="@peduarte"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}
