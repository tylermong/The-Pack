import { notFound } from 'next/navigation'
import ProgramDetails from '@/components/client/fitnessTracker/ProgramDetails'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/client/sidebar/app-sidebar"

// This would typically come from a database
const programs = [
  { 
    id: "strength-building", 
    name: "Strength Building", 
    days: [
      {
        id: "chest-day",
        name: "Chest Day",
        exercises: [
          { id: "bench-press", name: "Bench Press", sets: "3", reps: "8-12", weight: "225lbs" },
          { id: "incline-dumbbell-press", name: "Incline Dumbbell Press", sets: "3", reps: "10-12", weight: "100lbs" },
          { id: "chest-flys", name: "Chest Flys", sets: "3", reps: "12-15", weight: "60lbs" },
        ]
      },
      {
        id: "back-day",
        name: "Back Day",
        exercises: [
          { id: "deadlifts", name: "Deadlifts", sets: "3", reps: "5", weight: "315lbs" },
          { id: "pull-ups", name: "Pull Ups", sets: "3", reps: "10", weight: "0lbs" },
          { id: "barbell-rows", name: "Barbell Rows", sets: "3", reps: "8", weight: "135lbs" },
        ]
      },
      {
        id: "leg-day",
        name: "Leg Day",
        exercises: [
          { id: "squats", name: "Squats", sets: "4", reps: "8", weight: "225lbs" },
          { id: "leg-press", name: "Leg Press", sets: "3", reps: "12", weight: "450lbs" },
          { id: "leg-curls", name: "Leg Curls", sets: "3", reps: "15", weight: "120lbs" },
        ]
      }
    ]
  },
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