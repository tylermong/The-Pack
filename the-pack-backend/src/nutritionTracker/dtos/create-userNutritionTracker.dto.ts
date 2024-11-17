import { IsString, IsOptional, IsInt, IsEnum, IsUUID, IsDateString, IsNumber, Min } from 'class-validator';
import { MealType } from '@prisma/client';

export class CreateNutritionTracker {

    @IsUUID()  // Ensures userId is a valid UUID
    userId: string;  // The ID of the user for whom the nutrition data is being created

    @IsDateString()  // Ensures the date is in the correct ISO format (YYYY-MM-DD)
    date: string;  // Date of the nutrition entry

    @IsOptional()
    @IsInt()
    @Min(1)
    goals?: number;
    //asd
    @IsOptional()  // Calories is optional
    @IsInt()  // Ensures calories is an integer
    @Min(0)  // Calories should be a positive integer or zero
    calories?: number;  // Total calorie count

    @IsOptional()  // Protein is optional
    @IsNumber()  // Ensures protein is a number
    @Min(0)  // Protein should be a positive number or zero
    protein?: number;  // Amount of protein (grams)

    @IsOptional()  // Carbohydrates is optional
    @IsNumber()  // Ensures carbohydrates is a number
    @Min(0)  // Carbohydrates should be a positive number or zero
    carbohydrates?: number;  // Amount of carbohydrates (grams)

    @IsOptional()  // Fats is optional
    @IsNumber()  // Ensures fats is a number
    @Min(0)  // Fats should be a positive number or zero
    fats?: number;  // Amount of fats (grams)

    @IsEnum(MealType)  // Ensures mealType is a valid MealType enum
    @IsOptional()  // Optional mealType field
    mealType?: MealType;  // Type of meal (e.g., breakfast, lunch, dinner, or snack)
}
