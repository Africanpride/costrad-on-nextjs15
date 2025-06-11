"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export type Institute = {
  id: string
  name: string
  acronym: string
  overview: string
  about: string
  introduction: string
  icon: string
  logo: string
  active: boolean
}

interface InstituteFormModalProps {
  id?: string
  isOpen: boolean
  onClose: () => void
  initialData: Institute | null
  onSubmit: (data: Partial<Institute>) => void
}

export function InstituteFormModal({ id, isOpen, onClose, initialData, onSubmit }: InstituteFormModalProps) {
  const [formData, setFormData] = useState<Partial<Institute>>(initialData || {
    name: "",
    acronym: "",
    overview: "",
    about: "",
    introduction: "",
    icon: "",
    logo: "",
    active: false,
  })

  useEffect(() => {
    setFormData(initialData || {
      name: "",
      acronym: "",
      overview: "",
      about: "",
      introduction: "",
      icon: "",
      logo: "",
      active: false,
    })
  }, [initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (initialData?.id) {
      onSubmit({ id: initialData.id, ...formData })
    } else {
      onSubmit(formData)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Institute" : "Create Institute"}</DialogTitle>
        </DialogHeader>
        <div>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="acronym" className="text-right">Acronym</Label>
              <Input
                id="acronym"
                name="acronym"
                value={formData.acronym || ""}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="overview" className="text-right">Overview</Label>
              <Input
                id="overview"
                name="overview"
                value={formData.overview || ""}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="about" className="text-right">About</Label>
              <Input
                id="about"
                name="about"
                value={formData.about || ""}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="introduction" className="text-right">Introduction</Label>
              <Input
                id="introduction"
                name="introduction"
                value={formData.introduction || ""}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="icon" className="text-right">Icon URL</Label>
              <Input
                id="icon"
                name="icon"
                value={formData.icon || ""}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="logo" className="text-right">Logo URL</Label>
              <Input
                id="logo"
                name="logo"
                value={formData.logo || ""}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="active" className="text-right">Active</Label>
              <input
                type="checkbox"
                id="active"
                name="active"
                checked={formData.active || false}
                onChange={handleChange}
                className="col-span-3 h-4 w-4"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSubmit}>
              {initialData ? "Update" : "Create"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// If you need to control the modal from a parent, lift the state up and pass via props.