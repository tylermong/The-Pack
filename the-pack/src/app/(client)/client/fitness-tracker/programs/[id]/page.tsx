import { notFound } from 'next/navigation'
import ProgramDetails from '@/components/client/fitnessTracker/ProgramDetails'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/client/sidebar/app-sidebar"

// This would typically come from a database
const programs = [
  { 
    id: "strength-building", 
    name: "Strength Building",
    weeks: [
      {
        weekNumber: 1,
        days: [
          {
            id: "chest-day-w1",
            name: "Week 1: Chest Day",
            exercises: [
              { id: "bench-press-w1", name: "Bench Press", sets: "3", reps: "8-12", weight: "225lbs" },
              { id: "incline-dumbbell-press-w1", name: "Incline Dumbbell Press", sets: "3", reps: "10-12", weight: "100lbs" },
              { id: "chest-flys-w1", name: "Chest Flys", sets: "3", reps: "12-15", weight: "60lbs" },
            ]
          },
          {
            id: "back-day-w1",
            name: "Week 1: Back Day",
            exercises: [
              { id: "deadlifts-w1", name: "Deadlifts", sets: "3", reps: "5", weight: "315lbs" },
              { id: "pull-ups-w1", name: "Pull Ups", sets: "3", reps: "10", weight: "0lbs" },
              { id: "barbell-rows-w1", name: "Barbell Rows", sets: "3", reps: "8", weight: "135lbs" },
            ]
          },
          {
            id: "leg-day-w1",
            name: "Week 1: Leg Day",
            exercises: [
              { id: "squats-w1", name: "Squats", sets: "4", reps: "8", weight: "225lbs" },
              { id: "leg-press-w1", name: "Leg Press", sets: "3", reps: "12", weight: "450lbs" },
              { id: "leg-curls-w1", name: "Leg Curls", sets: "3", reps: "15", weight: "120lbs" },
            ]
          }
        ]
      },
      {
        weekNumber: 2,
        days: [
          {
            id: "chest-day-w2",
            name: "Week 2: Chest Day",
            exercises: [
              { id: "bench-press-w2", name: "Bench Press", sets: "3", reps: "8-12", weight: "230lbs" },
              { id: "incline-dumbbell-press-w2", name: "Incline Dumbbell Press", sets: "3", reps: "10-12", weight: "105lbs" },
              { id: "chest-flys-w2", name: "Chest Flys", sets: "3", reps: "12-15", weight: "65lbs" },
            ]
          },
          {
            id: "back-day-w2",
            name: "Week 2: Back Day",
            exercises: [
              { id: "deadlifts-w2", name: "Deadlifts", sets: "3", reps: "5", weight: "325lbs" },
              { id: "pull-ups-w2", name: "Pull Ups", sets: "3", reps: "10", weight: "0lbs" },
              { id: "barbell-rows-w2", name: "Barbell Rows", sets: "3", reps: "8", weight: "145lbs" },
            ]
          },
          {
            id: "leg-day-w2",
            name: "Week 2: Leg Day",
            exercises: [
              { id: "squats-w2", name: "Squats", sets: "4", reps: "8", weight: "230lbs" },
              { id: "leg-press-w2", name: "Leg Press", sets: "3", reps: "12", weight: "470lbs" },
              { id: "leg-curls-w2", name: "Leg Curls", sets: "3", reps: "15", weight: "130lbs" },
            ]
          }          
        ]
      }
    ]
  }
]

export default function ProgramPage({ params }: { params: { id: string } }) {
  const program = programs.find(p => p.id === params.id)
  
  if (!program) {
    notFound()
  }

  return(
    <SidebarProvider>
    <AppSidebar />
      <main className='w-screen'>
        <SidebarTrigger />
        <ProgramDetails program={program} />
      </main>
    </SidebarProvider>
  )
}