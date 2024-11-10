'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { PlusCircle, MoreVertical, Edit, Trash, Copy } from "lucide-react"

interface Program {
  id: string;
  name: string;
  description: string;
  tags: string[];
}

const initialPrograms: Program[] = [
  { 
    id: "strength-building", 
    name: "Strength Building", 
    description: "A 12-week program focused on building overall strength.",
    tags: ["4x/week", "Strength", "Intermediate"]
  },
  { 
    id: "weight-loss", 
    name: "Weight Loss", 
    description: "An 8-week program designed for effective weight loss.",
    tags: ["5x/week", "Cardio", "Beginner"]
  },
  { 
    id: "muscle-gain", 
    name: "Muscle Gain", 
    description: "A 16-week program for muscle hypertrophy and mass gain.",
    tags: ["6x/week", "Hypertrophy", "Advanced"]
  },
]

export default function ProgramList() {
  const [programs, setPrograms] = useState<Program[]>(initialPrograms)
  const [editingProgram, setEditingProgram] = useState<Program | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleEditClick = (program: Program) => {
    setEditingProgram({ ...program })
    setIsDialogOpen(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditingProgram(prev => prev ? { ...prev, [name]: value } : null)
  }

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(',').map(tag => tag.trim())
    setEditingProgram(prev => prev ? { ...prev, tags } : null)
  }

  const handleSave = () => {
    if (editingProgram) {
      setPrograms(prev => prev.map(p => p.id === editingProgram.id ? editingProgram : p))
      setIsDialogOpen(false)
    }
  }

  const handleDelete = (id: string) => {
    setPrograms(prev => prev.filter(p => p.id !== id))
  }

  const handleCopy = (program: Program) => {
    const newId = `${program.id}-copy-${Date.now()}`
    const newProgram = { ...program, id: newId, name: `${program.name} (Copy)` }
    setPrograms(prev => [...prev, newProgram])
  }

  return (
    <div className="flex flex-col mx-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Workout Programs</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> New Program
        </Button>
      </div>
      <div className="space-y-4">
        {programs.map((program) => (
          <div key={program.id} className="bg-background border rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-start">
                <h2 className="text-xl text-primary font-semibold">{program.name}</h2>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEditClick(program)}>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(program.id)}>
                      <Trash className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleCopy(program)}>
                      <Copy className="mr-2 h-4 w-4" />
                      <span>Copy</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className="text-sm text-muted-foreground">{program.description}</p>
              <div className="flex flex-wrap gap-2">
                {program.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">{tag}</Badge>
                ))}
              </div>
              <div className="pt-2">
                <Link href={`/client/fitness-tracker/programs/${program.id}`} passHref>
                  <Button variant="outline" className="w-full sm:w-auto">View Details</Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Program</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={editingProgram?.name || ''}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={editingProgram?.description || ''}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tags" className="text-right">
                Tags
              </Label>
              <Input
                id="tags"
                name="tags"
                value={editingProgram?.tags.join(', ') || ''}
                onChange={handleTagsChange}
                placeholder="Separate tags with commas"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSave}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}