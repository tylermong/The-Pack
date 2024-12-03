'use client'

import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { PlusCircle } from "lucide-react"
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'

interface Program {
  programURL: string
  userId: string
  programName: string
  programDecription: string  // Fixed spelling to match backend
  programTags: string
}

export default function ProgramList() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    programName: '',
    programDecription: '',  // Fixed spelling
    programTags: ''
  })
  const [error, setError] = useState('')

  // Load existing programs on component mount
  useEffect(() => {
    fetchPrograms()
  }, [])

  const fetchPrograms = async () => {
    const token = localStorage.getItem('accessToken')
    if (!token) return

    try {
      const response = await axios.get('http://localhost:3001/programs', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setPrograms(response.data)
    } catch (err) {
      console.error('Failed to fetch programs:', err)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async () => {
    setError('')
    
    // Basic validation
    if (!formData.programName.trim()) {
      setError('Program name is required')
      return
    }

    const token = localStorage.getItem('accessToken')
    if (!token) {
      setError('You must be logged in')
      return
    }

    try {
      const decodedToken = jwtDecode<{ sub: { id: string } }>(token)
      const userId = decodedToken.sub.id

      const newProgram = {
        programURL: uuidv4(),
        userId,
        programName: formData.programName,
        programDecription: formData.programDecription,  // Fixed spelling
        programTags: formData.programTags
      }

      await axios.post('http://localhost:3001/programs', newProgram, {
        headers: { Authorization: `Bearer ${token}` }
      })

      // Reset form and refresh programs
      setFormData({ programName: '', programDecription: '', programTags: '' })
      setIsDialogOpen(false)
      fetchPrograms()

    } catch (err) {
      console.error('Failed to create program:', err)
      setError('Failed to create program. Please try again.')
    }
  }

  return (
    <div className="flex flex-col mx-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Workout Programs</h1>
        <Button onClick={() => setIsDialogOpen(true)}><PlusCircle className="mr-2 h-4 w-4" />New Program</Button>
      </div>
      <div className="space-y-4">
        {programs.map((program) => (
          <div key={program.programURL} className="bg-background border rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-start">
                <h2 className="text-xl text-primary font-semibold">{program.programName}</h2>
              </div>
              <p className="text-sm text-muted-foreground">{program.programDecription}</p>
              <div className="flex flex-wrap gap-2">
                {program.programTags.split(',')
                  .map(tag => tag.trim())
                  .filter(tag => tag.length > 0)
                  .map((tag, index) => (
                    <Badge key={index} variant="programTags">{tag}</Badge>
                  ))}
              </div>
              <div className="pt-2">
                <Link href={`/client/fitness-tracker/programs/${program.programURL}`} passHref>
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
            <DialogTitle>New Program</DialogTitle>
          </DialogHeader>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="programName" className="text-right">Name</Label>
              <Input
                id="programName"
                name="programName"
                value={formData.programName}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="programDecription" className="text-right">Description</Label>
              <Textarea
                id="programDecription"
                name="programDecription"  // Fixed spelling
                value={formData.programDecription}  // Fixed spelling
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="programTags" className="text-right">Tags</Label>
              <Input
                id="programTags"
                name="programTags"
                value={formData.programTags}
                onChange={handleInputChange}
                placeholder="Enter tags separated by commas"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSubmit}>Create Program</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}