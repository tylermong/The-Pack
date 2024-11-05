import {IsString, IsOptional, IsInt, IsEnum, IsUUID, IsDateString, IsNumber, Min, Max} from 'class-validator'
import { MealType } from '@prisma/client'

export class CreateNutritionTracker{

    @IsUUID() // Ensures the userId is a valid UUID
    userId: string; // The ID of the user for whom the nutrition data is being created

    @IsString() // Ensures title is a non-empty string
    title: string; // Title of the nutrition entry

    @IsOptional()
    @IsString() // Optional: description can be a string
    description?: string; // Description of the nutrition entry

    @IsOptional()
    @IsDateString() // Optional: timeSlot is a valid date string
    timeSlot?: string; // Date/time for the nutrition record

    @IsOptional()
    @IsInt()
    @Min(0) // Calories should be a positive integer
    calories?: number; // Total calorie count

    @IsOptional()
    @IsNumber()
    @Min(0) // Protein should be a positive number
    protein?: number; // Amount of protein (grams)

    @IsOptional()
    @IsNumber()
    @Min(0) // Carbohydrates should be a positive number
    carbohydrates?: number; // Amount of carbohydrates (grams)

    @IsOptional()
    @IsNumber()
    @Min(0) // Fats should be a positive number
    fats?: number; // Amount of fats (grams)

    @IsOptional()
    @IsString() // Optional: notes can be a string
    notes?: string; // Additional notes

    @IsEnum(MealType) // Ensures mealType is a valid MealType enum
    @IsOptional()
    mealType?: MealType; // Type of meal (e.g., breakfast, lunch, dinner, or snack)
}