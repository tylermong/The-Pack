'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"

interface Exercise {
  id: string;
  name: string;
  sets: string;
  reps: string;
  weight: string;
  completedSets?: boolean[];
}

interface Day {
  id: string;
  name: string;
  exercises: Exercise[];
}

interface Program {
  id: string;
  name: string;
  days: Day[];
}

export default function ProgramDetails({ program }: { program: Program }) {
  const [selectedDay, setSelectedDay] = useState<Day | null>(null)
  const [exercises, setExercises] = useState<Exercise[]>([])

  const handleDayClick = (day: Day) => {
    setSelectedDay(day)
    setExercises(day.exercises.map(exercise => ({
      ...exercise,
      completedSets: new Array(parseInt(exercise.sets)).fill(false)
    })))
  }

  const handleExerciseChange = (exerciseId: string, field: 'sets' | 'reps' | 'weight', value: number) => {
    setExercises(prevExercises =>
      prevExercises.map(exercise =>
        exercise.id === exerciseId ? { ...exercise, [field]: value } : exercise
      )
    )
  }

  const handleSetCompletion = (exerciseId: string, setIndex: number) => {
    setExercises(prevExercises =>
      prevExercises.map(exercise =>
        exercise.id === exerciseId ? {
          ...exercise,
          completedSets: exercise.completedSets?.map((completed, i) =>
            i === setIndex ? !completed : completed
          )
        } : exercise
      )
    )
  }

  const generateSetRows = (exercise: Exercise) => {
    return Array.from({ length: parseInt(exercise.sets) }, (_, i) => i + 1)
  }

  return (
    <div className="flex flex-col mx-12">
      <div className="mb-6">
        <Link href="/client/fitness-tracker/dashboard" passHref>
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-6">{program.name}</h1>
      
      {!selectedDay ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {program.days.map((day) => (
            <Card key={day.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleDayClick(day)}>
              <CardHeader>
                <CardTitle>{day.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {day.exercises.map((exercise) => (
                    <div key={exercise.id} className="text-sm">
                      <p className="font-medium">{exercise.name}</p>
                      <p className="text-muted-foreground">
                        {exercise.sets} × {exercise.reps} reps @ {exercise.weight}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div>
          <Button variant="ghost" onClick={() => setSelectedDay(null)} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Days
          </Button>
          <h2 className="text-2xl font-semibold mb-4">{selectedDay.name}</h2>
          {exercises.map((exercise) => (
            <Card key={exercise.id} className="mb-4">
              <CardHeader>
                <CardTitle>{exercise.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {generateSetRows(exercise).map((setNumber, index) => (
                    <div key={`${exercise.id}-set-${setNumber}`} className="grid grid-cols-4 gap-4 items-center">
                      <div className="text-sm font-medium">Set {setNumber}</div>
                      <Input
                        type="number"
                        value={exercise.reps}
                        onChange={(e) => handleExerciseChange(exercise.id, 'reps', parseInt(e.target.value))}
                        className="w-full"
                      />
                      <Input
                        type="number"
                        value={exercise.weight}
                        onChange={(e) => handleExerciseChange(exercise.id, 'weight', parseFloat(e.target.value))}
                        className="w-full"
                      />
                      <Button
                        variant={exercise.completedSets?.[index] ? "default" : "outline"}
                        onClick={() => handleSetCompletion(exercise.id, index)}
                        className="w-full"
                      >
                        {exercise.completedSets?.[index] ? "Completed" : "Mark Complete"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}