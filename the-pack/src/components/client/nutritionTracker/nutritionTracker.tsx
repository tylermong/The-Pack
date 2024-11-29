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


  //On mount get the data from the backend
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const token = localStorage.getItem('accessToken');
  //     if(token){
  //       try {
  //         const decodedToken = jwtDecode<CustomJwtPayload>(token);
  //         const userId = decodedToken.sub['id'];
  //         const ISODate = new Date(selectedDate).toISOString(); 
  //         const breakfastData = await axios.get(`http://localhost:3001/nutritionTracker/${userId}/${ISODate}?mealType=BREAKFAST`);
  //         const lunchData = await axios.get(`http://localhost:3001/nutritionTracker/${userId}/${ISODate}?mealType=LUNCH`);
  //         const dinnerData = await axios.get(`http://localhost:3001/nutritionTracker/${userId}/${ISODate}?mealType=DINNER`);
  //         const snacksData = await axios.get(`http://localhost:3001/nutritionTracker/${userId}/${ISODate}?mealType=SNACK`);

  //         const nutritionLog = {
  //           [selectedDate]: {
  //             breakfast: breakfastData.data,
  //             lunch: lunchData.data,
  //             dinner: dinnerData.data,
  //             snacks: snacksData.data
  //           }
  //         }
  //         setNutritionLog(nutritionLog);
  //         console.log('NUTRITION LOG', nutritionLog)

  //       } catch (error) {
  //         console.log('Error fetching data', error);
  //       }
  //     } else {
  //       return;
  //     }
  //   };

  //   fetchData();
  // }, []);



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
            carb: Number(newItem.carbs) || 0,
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
    setNutritionLog(prev => ({
      ...prev,
      [selectedDate]: {
        ...prev[selectedDate],
        [mealType]: prev[selectedDate][mealType].filter(item => item.id !== id)
      }
    }))
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

  const handleSaveGoals = () => {
    setGoalsLog(prev => ({
      ...prev,
      [selectedDate]: newGoals
    }))
    setIsGoalsDialogOpen(false)
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
            <Button variant="outline" onClick={() => {
              setNewGoals(getCurrentGoals(selectedDate))
              setIsGoalsDialogOpen(true)
            }}>
              Edit Goals
            </Button>
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
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-semibold">Calories</span>
            <span className="text-sm">{totalCalories} / {getCurrentGoals(selectedDate).calories}</span>
          </div>
          <Progress value={(totalCalories / getCurrentGoals(selectedDate).calories) * 100} className="h-3" />
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <div className="flex justify-between mb-2">
            <span className="text-sm font-semibold">Protein</span>
              <span className="text-sm">{totalProtein}g / {getCurrentGoals(selectedDate).protein}g</span>
            </div>
            <Progress value={(totalProtein / getCurrentGoals(selectedDate).protein) * 100} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-semibold">Carbs</span>
              <span className="text-sm">{totalCarbs}g / {getCurrentGoals(selectedDate).carbs}g</span>
            </div>
            <Progress value={(totalCarbs / getCurrentGoals(selectedDate).carbs) * 100} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
            <span className="text-sm font-semibold">Fat</span>
              <span className="text-sm">{totalFat}g / {getCurrentGoals(selectedDate).fat}g</span>
            </div>
            <Progress value={(totalFat / getCurrentGoals(selectedDate).fat) * 100} className="h-2" />
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
      <Dialog open={isGoalsDialogOpen} onOpenChange={setIsGoalsDialogOpen}>
        <DialogContent className='bg-primary text-secondary'>
          <DialogHeader>
            <DialogTitle>Edit Nutrition Goals</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="goalCalories" className="text-right">
                Calories
              </Label>
              <Input
                id="goalCalories"
                type="number"
                value={newGoals.calories}
                onChange={(e) => setNewGoals(prev => ({ ...prev, calories: Number(e.target.value) }))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="goalProtein" className="text-right">
                Protein (g)
              </Label>
              <Input
                id="goalProtein"
                type="number"
                value={newGoals.protein}
                onChange={(e) => setNewGoals(prev => ({ ...prev, protein: Number(e.target.value) }))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="goalCarbs" className="text-right">
                Carbs (g)
              </Label>
              <Input
                id="goalCarbs"
                type="number"
                value={newGoals.carbs}
                onChange={(e) => setNewGoals(prev => ({ ...prev, carbs: Number(e.target.value) }))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="goalFat" className="text-right">
                Fat (g)
              </Label>
              <Input
                id="goalFat"
                type="number"
                value={newGoals.fat}
                onChange={(e) => setNewGoals(prev => ({ ...prev, fat: Number(e.target.value) }))}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveGoals}>Save Goals</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}