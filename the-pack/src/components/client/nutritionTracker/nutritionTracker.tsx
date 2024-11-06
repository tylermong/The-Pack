'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Plus, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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

type Meals = {
  [key in MealType]: FoodItem[]
}

export default function NutritionTracker() {
  const [meals, setMeals] = useState<Meals>({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: []
  })
  const [newItem, setNewItem] = useState<Omit<FoodItem, 'id'>>({
    name: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    mealType: 'breakfast'
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [collapsedSections, setCollapsedSections] = useState<{[key in MealType]: boolean}>({
    breakfast: false,
    lunch: false,
    dinner: false,
    snacks: false
  })

  // Example goals (temporary)
  const dailyGoal = 2000 
  const proteinGoal = 150
  const carbsGoal = 250
  const fatGoal = 65

  const calculateTotals = () => {
    return Object.values(meals).flat().reduce(
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
    if (newItem.name && newItem.calories > 0) {
      setMeals(prevMeals => ({
        ...prevMeals,
        [newItem.mealType]: [...prevMeals[newItem.mealType], { ...newItem, id: Date.now() }]
      }))
      setNewItem({ name: '', calories: 0, protein: 0, carbs: 0, fat: 0, mealType: 'breakfast' })
      setIsDialogOpen(false)
    }
  }

  const handleRemoveItem = (id: number, mealType: MealType) => {
    setMeals(prevMeals => ({
      ...prevMeals,
      [mealType]: prevMeals[mealType].filter(item => item.id !== id)
    }))
  }

  const toggleCollapse = (mealType: MealType) => {
    setCollapsedSections(prev => ({
      ...prev,
      [mealType]: !prev[mealType]
    }))
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
          {collapsedSections[mealType] ? (
            <ChevronDown className="h-5 w-5" />
          ) : (
            <ChevronUp className="h-5 w-5" />
          )}
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
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {meals[mealType].map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.calories}</TableCell>
                <TableCell>{item.protein}g</TableCell>
                <TableCell>{item.carbs}g</TableCell>
                <TableCell>{item.fat}g</TableCell>
                <TableCell>
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
    <Card className="w-full max-w-4xl mx-auto bg-primary text-secondary">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Nutrition Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-semibold">Calories</span>
            <span className="text-sm">{totalCalories} / {dailyGoal}</span>
          </div>
          <Progress value={(totalCalories / dailyGoal) * 100} className="h-3" />
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <div className="flex justify-between mb-2">
            <span className="text-sm font-semibold">Protein</span>
              <span className="text-sm">{totalProtein}g / {proteinGoal}g</span>
            </div>
            <Progress value={(totalProtein / proteinGoal) * 100} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-semibold">Carbs</span>
              <span className="text-sm">{totalCarbs}g / {carbsGoal}g</span>
            </div>
            <Progress value={(totalCarbs / carbsGoal) * 100} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
            <span className="text-sm font-semibold">Fat</span>
              <span className="text-sm">{totalFat}g / {fatGoal}g</span>
            </div>
            <Progress value={(totalFat / fatGoal) * 100} className="h-2" />
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
                  onChange={(e) => setNewItem({ ...newItem, calories: Number(e.target.value) })}
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
                  onChange={(e) => setNewItem({ ...newItem, protein: Number(e.target.value) })}
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
                  onChange={(e) => setNewItem({ ...newItem, carbs: Number(e.target.value) })}
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
                  onChange={(e) => setNewItem({ ...newItem, fat: Number(e.target.value) })}
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