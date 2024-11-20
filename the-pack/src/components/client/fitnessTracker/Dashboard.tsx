'use client'

import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { PlusCircle, MoreVertical, Edit, Trash, Copy, X } from "lucide-react"

interface Program {
  id: string;
  name: string;
  description: string;
  tags: string[];
}

export default function ProgramList() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [editingProgram, setEditingProgram] = useState<Program | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isNewProgramDialogOpen, setIsNewProgramDialogOpen] = useState(false)
  const [newProgram, setNewProgram] = useState<Program>({ id: '', name: '', description: '', tags: [] })
  const [newTag, setNewTag] = useState('');
  const [editingTag, setEditingTag] = useState('');
  const [newProgramErrors, setNewProgramErrors] = useState({ name: '', description: '' });

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
    const newId = uuidv4()
    const newProgram = { ...program, id: newId, name: `${program.name} (Copy)` }
    setPrograms(prev => [...prev, newProgram])
  }

  const handleNewProgramChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewProgram(prev => ({ ...prev, [name]: value }))
  }

  const handleNewProgramTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(',').map(tag => tag.trim())
    setNewProgram(prev => ({ ...prev, tags }))
  }

  const handleNewProgramSave = () => {
    const errors = { name: '', description: '' };
  
    if (!newProgram.name.trim()) {
      errors.name = 'Name is required.';
    }
  
    if (!newProgram.description.trim()) {
      errors.description = 'Description is required.';
    }
  
    if (errors.name || errors.description) {
      setNewProgramErrors(errors);
      return;
    }
  
    const newId = uuidv4();
    const programToAdd = { ...newProgram, id: newId };
    setPrograms(prev => [...prev, programToAdd]);
    setIsNewProgramDialogOpen(false);
    setNewProgram({ id: '', name: '', description: '', tags: [] });
    setNewProgramErrors({ name: '', description: '' });
  }

  const handleAddTag = () => {
    if (newTag.trim()) {
      setNewProgram(prev => ({ ...prev, tags: [...prev.tags, newTag.trim()] }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (index: number) => {
    setNewProgram(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const handleAddEditingTag = () => {
    if (editingTag.trim() && editingProgram) {
      setEditingProgram(prev => prev ? { ...prev, tags: [...prev.tags, editingTag.trim()] } : null);
      setEditingTag('');
    }
  };

  const handleRemoveEditingTag = (index: number) => {
    if (editingProgram) {
      setEditingProgram(prev => prev ? {
        ...prev,
        tags: prev.tags.filter((_, i) => i !== index),
      } : null);
    }
  };

  return (
    <div className="flex flex-col mx-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Workout Programs</h1>
        <Button onClick={() => setIsNewProgramDialogOpen(true)}><PlusCircle className="mr-2 h-4 w-4" />New Program</Button>
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
                  <Badge key={index} variant="programTags">{tag}</Badge>
                ))}
              </div>
              <div className="pt-2">
                <Link href={`/client/fitness-tracker/programs/${program.id}`} passHref>
                  <Button variant="outline" className="bg-primary text-secondary hover:bg-primary/80 hover:text-secondary w-full sm:w-auto">View Details</Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-black sm:max-w-[425px]">
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
              <Label htmlFor="edit-tag-input" className="text-right">
                Tags
              </Label>
              <div className="col-span-3 flex items-center space-x-2">
                <Input
                  id="edit-tag-input"
                  value={editingTag}
                  onChange={(e) => setEditingTag(e.target.value)}
                  placeholder="Add a tag"
                  className="w-full"
                />
                <Button type="button" onClick={handleAddEditingTag}>Add</Button>
              </div>
            </div>
            <div className="grid grid-cols-4 items-start gap-4 mt-2">
              <div></div> {/* Empty grid cell for alignment */}
              <div className="col-span-3">
                <div className="flex flex-wrap gap-2">
                  {editingProgram?.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveEditingTag(index)}
                        className="group -mr-0.5 ml-1 shrink-0 rounded-full p-0 h-4 w-4 flex items-center justify-center"
                      >
                        <X className="h-3 w-3 stroke-current" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSave}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isNewProgramDialogOpen} onOpenChange={setIsNewProgramDialogOpen}>
        <DialogContent className="bg-black sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Program</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-name" className="text-right">
                Name
              </Label>
              <div className="col-span-3">
                <Input
                  id="new-name"
                  name="name"
                  value={newProgram.name}
                  onChange={handleNewProgramChange}
                  // Optionally, add 'required' attribute or styling
                />
                {newProgramErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{newProgramErrors.name}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-description" className="text-right">
                Description
              </Label>
              <div className="col-span-3">
                <Textarea
                  id="new-description"
                  name="description"
                  value={newProgram.description}
                  onChange={handleNewProgramChange}
                  // Optionally, add 'required' attribute or styling
                />
                {newProgramErrors.description && (
                  <p className="text-red-500 text-sm mt-1">{newProgramErrors.description}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-tag-input" className="text-right">
                Tags
              </Label>
              <div className="col-span-3 flex items-center space-x-2">
                <Input
                  id="new-tag-input"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                  className="w-full"
                />
                <Button type="button" onClick={handleAddTag}>Add</Button>
              </div>
            </div>
            <div className="grid grid-cols-4 items-start gap-4 mt-2">
              <div></div> {/* Empty grid cell for alignment */}
              <div className="col-span-3">
                <div className="flex flex-wrap gap-2">
                  {newProgram.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(index)}
                        className="group -mr-0.5 ml-1 shrink-0 rounded-full p-0 h-4 w-4 flex items-center justify-center"
                      >
                        <X className="h-3 w-3 stroke-current" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleNewProgramSave}>Save Program</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}