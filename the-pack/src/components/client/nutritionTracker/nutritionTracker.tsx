'use client'

import { useState, useEffect } from 'react'
import { ChevronRight, Plus, X, ChevronLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import axios from 'axios'
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from "jsonwebtoken";

type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snacks'

type FoodItem = {
  id: number
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  mealType: MealType
}

// Add this new interface for the form state
interface FoodItemForm {
  id: string
  name: string
  calories: string
  protein: string
  carbs: string
  fat: string
  mealType: MealType
}

type DailyMeals = {
  [key in MealType]: FoodItem[]
}

type NutritionLog = {
  [date: string]: DailyMeals
}

type NutritionGoals = {
  calories: number
  protein: number
  carbs: number
  fat: number
}

type GoalsLog = {
  [date: string]: NutritionGoals
}

enum MType {
  Breakfast = 'BREAKFAST',
  Lunch = 'LUNCH',
  Dinner = 'DINNER',
  Snacks = 'SNACK'
}

interface CustomJwtPayload extends JwtPayload {
  sub: string;
}

export default function NutritionTracker() {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0])
  const [nutritionLog, setNutritionLog] = useState<NutritionLog>({
    [selectedDate]: {
      breakfast: [],
      lunch: [],
      dinner: [],
      snacks: []
    }
  })
  const [newItem, setNewItem] = useState<FoodItemForm>({
    id: '',
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    mealType: 'breakfast'
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [collapsedSections, setCollapsedSections] = useState<{[key in MealType]: boolean}>({
    breakfast: false,
    lunch: false,
    dinner: false,
    snacks: false
  })

  const defaultGoals = {
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 65
  }

  const [goalsLog, setGoalsLog] = useState<GoalsLog>({
    [selectedDate]: defaultGoals
  })
  const [isGoalsDialogOpen, setIsGoalsDialogOpen] = useState(false)
  const [newGoals, setNewGoals] = useState<NutritionGoals>(defaultGoals)


  //On mount get each entry for the day
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('accessToken');
      if(token){
        const decodedToken = jwtDecode<CustomJwtPayload>(token);
        const userId = decodedToken.sub['id'];

        console.log("Current date: ", selectedDate)
        //Format selectedDate to an ISO-8601 DateTime. This is the format that the backend expects
        const currentDate = new Date(selectedDate).toISOString();
        console.log("Current formatted date: ", currentDate)

        try{
          const response = await axios.get(`http://localhost:3001/nutritionTracker/${userId}/${currentDate}`)
          console.log("Response", response.data)

          //Check if response is empty
          if(response.data.length === 0){
            console.log("No entries found for this date")
          } else {
            //Iterate over each entry and make it into a FoodItemForm then add it to the nutritionLog
            response.data.forEach((entry: any) => {
              const mealType = entry.mealType;
              let mealT: MealType = 'breakfast';

              if(mealType === MType.Breakfast){
                mealT = 'breakfast';
              } else if(mealType === MType.Lunch){
                mealT = 'lunch';
              } else if(mealType === MType.Dinner){
                mealT = 'dinner';
              } else if(mealType === MType.Snacks){
                mealT = 'snacks';
              }

              const newEntry: FoodItemForm = {
                id: entry.id,
                name: entry.name,
                calories: entry.calories,
                protein: entry.protein,
                carbs: entry.carbohydrates,
                fat: entry.fats,
                mealType: mealT
              }

              //Check if nutritionLog already contains the entry
              if(nutritionLog[selectedDate][mealT].find((item) => item.name === newEntry.name)){
                console.log("Entry already exists")
              } else {
                setNutritionLog(prev => ({
                  ...prev,
                  [selectedDate]: {
                    ...prev[selectedDate],
                    [mealT]: [...prev[selectedDate][mealT], {
                      ...newEntry,
                      calories: Number(newEntry.calories) || 0,
                      protein: Number(newEntry.protein) || 0,
                      carbs: Number(newEntry.carbs) || 0,
                      fat: Number(newEntry.fat) || 0,
                      id: entry.id
                    }]
                  }
                }))
              }
            })
          }
            

        } catch (error){
          console.log("ERROR", error)
        }
      }
    };

    fetchData();
  }, [selectedDate])



  const changeDate = (offset: number) => {
    const date = new Date(selectedDate)
    date.setDate(date.getDate() + offset)
    const newDate = date.toISOString().split('T')[0]
    setSelectedDate(newDate)
    
    // Initialize the day if it doesn't exist
    if (!nutritionLog[newDate]) {
      setNutritionLog(prev => ({
        ...prev,
        [newDate]: {
          breakfast: [],
          lunch: [],
          dinner: [],
          snacks: []
        }
      }))
    }
    getCurrentGoals(newDate) // This will ensure goals exist for the new date
  }

  const calculateTotals = () => {
    return Object.values(nutritionLog[selectedDate]).flat().reduce(
      (acc, item) => ({
        calories: acc.calories + item.calories,
        protein: acc.protein + item.protein,
        carbs: acc.carbs + item.carbs,
        fat: acc.fat + item.fat
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    )
  }

  const { calories: totalCalories, protein: totalProtein, carbs: totalCarbs, fat: totalFat } = calculateTotals()

  const handleAddItem = () => {
    if (newItem.name && Number(newItem.calories) > 0) {
      setNutritionLog(prev => ({
        ...prev,
        [selectedDate]: {
          ...prev[selectedDate],
          [newItem.mealType]: [...prev[selectedDate][newItem.mealType], {
            ...newItem,
            calories: Number(newItem.calories) || 0,
            protein: Number(newItem.protein) || 0,
            carbs: Number(newItem.carbs) || 0,
            fat: Number(newItem.fat) || 0,
            id: Date.now()
          }]
        }
      }))

      const token = localStorage.getItem('accessToken');
      if(token){
        const decodedToken = jwtDecode<CustomJwtPayload>(token);
        const userId = decodedToken.sub['id'];

        const mealT = newItem.mealType;

        //Check which meal type it is 
        if(mealT === 'breakfast'){
          const newEntry = {
            userId: userId,
            name: newItem.name,
            date: new Date(selectedDate),
            calories: Number(newItem.calories) || 0,
            protein: Number(newItem.protein) || 0,
            carbohydrates: Number(newItem.carbs) || 0,
            fats: Number(newItem.fat) || 0,
            mealType: MType.Breakfast
          }

          axios.post('http://localhost:3001/nutritionTracker', newEntry)
          console.log('New entry added', newEntry)
        } else if(mealT === 'lunch'){
          const newEntry = {
            userId: userId,
            name: newItem.name,
            date: new Date(selectedDate),
            calories: Number(newItem.calories) || 0,
            protein: Number(newItem.protein) || 0,
            carbohydrates: Number(newItem.carbs) || 0,
            fats: Number(newItem.fat) || 0,
            mealType: MType.Lunch
          }
          axios.post('http://localhost:3001/nutritionTracker', newEntry)
          console.log('New entry added', newEntry)
        } else if(mealT === 'dinner'){
          const newEntry = {
            userId: userId,
            name: newItem.name,
            date: new Date(selectedDate),
            calories: Number(newItem.calories) || 0,
            protein: Number(newItem.protein) || 0,
            carbohydrates: Number(newItem.carbs) || 0,
            fats: Number(newItem.fat) || 0,
            mealType: MType.Dinner
          }
          axios.post('http://localhost:3001/nutritionTracker', newEntry)
          console.log('New entry added', newEntry)
        } else if(mealT === 'snacks'){
          const newEntry = {
            userId: userId,
            name: newItem.name,
            date: new Date(selectedDate),
            calories: Number(newItem.calories) || 0,
            protein: Number(newItem.protein) || 0,
            carbohydrates: Number(newItem.carbs) || 0,
            fats: Number(newItem.fat) || 0,
            mealType: MType.Snacks
          }
          axios.post('http://localhost:3001/nutritionTracker', newEntry)
          console.log('New entry added', newEntry)
        }
      }
      
      setNewItem({ name: '', calories: '', protein: '', carbs: '', fat: '', mealType: 'breakfast' })
      setIsDialogOpen(false)
    }
  }

  const handleRemoveItem = (id: number, mealType: MealType) => {
    const token = localStorage.getItem('accessToken');
    if(token){
      const decodedToken = jwtDecode<CustomJwtPayload>(token);
      const userId = decodedToken.sub['id'];

      const mealT = mealType;

      //Find the entry in the nutritionlog with the id
      const entry = nutritionLog[selectedDate][mealType].find((item) => item.id === id);
      console.log("Entry", entry)

      //Check which meal type it is 
      if(mealT === 'breakfast'){
        axios.delete(`http://localhost:3001/nutritionTracker/${id}`)
        console.log('Entry deleted')
      } else if(mealT === 'lunch'){
        axios.delete(`http://localhost:3001/nutritionTracker/${id}`)
        console.log('Entry deleted')
      } else if(mealT === 'dinner'){
        axios.delete(`http://localhost:3001/nutritionTracker/${id}`)
        console.log('Entry deleted')
      } else if(mealT === 'snacks'){
        axios.delete(`http://localhost:3001/nutritionTracker/${id}`)
        console.log('Entry deleted')
      }

      setNutritionLog(prev => ({
        ...prev,
        [selectedDate]: {
          ...prev[selectedDate],
          [mealType]: prev[selectedDate][mealType].filter(item => item.id !== id)
        }
      }))
  }
}

  const toggleCollapse = (mealType: MealType) => {
    setCollapsedSections(prev => ({
      ...prev,
      [mealType]: !prev[mealType]
    }))
  }

  const getCurrentGoals = (date: string): NutritionGoals => {
    const dates = Object.keys(goalsLog)
      .sort()
      .filter(d => d <= date)
    
    return dates.length > 0 ? goalsLog[dates[dates.length - 1]] : defaultGoals
  }

  const renderMealSection = (mealType: MealType, title: string) => (
    <Collapsible
      open={!collapsedSections[mealType]}
      onOpenChange={() => toggleCollapse(mealType)}
      className="mb-6 border rounded-lg p-4"
    >
      <CollapsibleTrigger asChild>
        <div className="flex justify-between items-center cursor-pointer">
          <h3 className="text-lg font-semibold">{title}</h3>
          <ChevronRight
            className={`h-5 w-5 transform transition-transform duration-150 ${
              collapsedSections[mealType] ? '' : 'rotate-90'
            }`}
          />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[#B0B0B0]">Food</TableHead>
              <TableHead className="text-[#B0B0B0]">Calories</TableHead>
              <TableHead className="text-[#B0B0B0]">Protein</TableHead>
              <TableHead className="text-[#B0B0B0]">Carbs</TableHead>
              <TableHead className="text-[#B0B0B0]">Fat</TableHead>
              <TableHead className="text-[#B0B0B0] w-2"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {nutritionLog[selectedDate][mealType].map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.calories}</TableCell>
                <TableCell>{item.protein}g</TableCell>
                <TableCell>{item.carbs}g</TableCell>
                <TableCell>{item.fat}g</TableCell>
                <TableCell className="w-fit">
                  <Button variant="default" size="icon" onClick={() => handleRemoveItem(item.id, mealType)}>
                    <X className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CollapsibleContent>
    </Collapsible>
  )

  return (
    <Card className="w-full max-w-4xl mx-auto mb-8 bg-primary text-secondary">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <CardTitle className="text-2xl font-bold">Nutrition Tracker</CardTitle>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => changeDate(-1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value)
                if (!nutritionLog[e.target.value]) {
                  setNutritionLog(prev => ({
                    ...prev,
                    [e.target.value]: {
                      breakfast: [],
                      lunch: [],
                      dinner: [],
                      snacks: []
                    }
                  }))
                }
              }}
              className="w-40"
            />
            <Button variant="outline" size="icon" onClick={() => changeDate(1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-4 gap-4'>

          <div className="mb-3">
            <div className="flex mb-2 ">
              <span className="text-sm font-semibold pr-3">Calories: </span>
              <span className="text-sm">{totalCalories}</span>
            </div>
          </div>

          <div>
            <div className="flex mb-2">
            <span className="text-sm font-semibold pr-3">Protein: </span>
              <span className="text-sm">{totalProtein}g </span>
            </div>
          </div>

          <div>
            <div className="flex mb-2">
              <span className="text-sm font-semibold pr-3">Carbs: </span>
              <span className="text-sm">{totalCarbs}g </span>
            </div>
          </div>

          <div>
            <div className="flex mb-2">
            <span className="text-sm font-semibold pr-3">Fat: </span>
              <span className="text-sm">{totalFat}g </span>
            </div>
          </div>

        </div>

        {renderMealSection('breakfast', 'Breakfast')}
        {renderMealSection('lunch', 'Lunch')}
        {renderMealSection('dinner', 'Dinner')}
        {renderMealSection('snacks', 'Snacks')}
      </CardContent>
      <CardFooter>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Add Food Item
            </Button>
          </DialogTrigger>
          <DialogContent className='bg-primary text-secondary'>
            <DialogHeader>
              <DialogTitle>Add Food Item</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="calories" className="text-right">
                  Calories
                </Label>
                <Input
                  id="calories"
                  type="number"
                  value={newItem.calories}
                  onChange={(e) => setNewItem({ ...newItem, calories: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="protein" className="text-right">
                  Protein (g)
                </Label>
                <Input
                  id="protein"
                  type="number"
                  value={newItem.protein}
                  onChange={(e) => setNewItem({ ...newItem, protein: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="carbs" className="text-right">
                  Carbs (g)
                </Label>
                <Input
                  id="carbs"
                  type="number"
                  value={newItem.carbs}
                  onChange={(e) => setNewItem({ ...newItem, carbs: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fat" className="text-right">
                  Fat (g)
                </Label>
                <Input
                  id="fat"
                  type="number"
                  value={newItem.fat}
                  onChange={(e) => setNewItem({ ...newItem, fat: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="mealType" className="text-right">
                  Meal
                </Label>
                <Select
                  value={newItem.mealType}
                  onValueChange={(value: MealType) => setNewItem({ ...newItem, mealType: value })}
                >
                  <SelectTrigger className="border border-solid border-secondary col-span-3 mx-0">
                    <SelectValue placeholder="Select meal type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breakfast">Breakfast</SelectItem>
                    <SelectItem value="lunch">Lunch</SelectItem>
                    <SelectItem value="dinner">Dinner</SelectItem>
                    <SelectItem value="snacks">Snacks</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddItem}>Add Item</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}