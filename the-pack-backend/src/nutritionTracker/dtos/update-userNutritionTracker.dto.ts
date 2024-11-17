import { IsOptional, IsInt, IsEnum, IsUUID, IsDateString, IsNumber, Min, IsString } from 'class-validator';
import { MealType } from '@prisma/client';

export class UpdateNutritionTrackerDto {
  
  @IsUUID()  // Ensure userId is valid if updating it
  @IsOptional()  // userId is optional for updating
  userId?: string;

  @IsOptional()  // coachId is optional
  @IsUUID()  // Ensure coachId is valid if updating it
  coachId?: string;

  @IsDateString()  // Ensure date is a valid ISO format if updating it
  @IsOptional()  // date is optional for updating
  date?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  goals?: number;
  
  @IsOptional()  // Optional: calories field
  @IsInt()  // Ensure calories is an integer
  @Min(0)  // Calories should be a positive integer or zero
  calories?: number;

  @IsOptional()  // Optional: protein field
  @IsNumber()  // Ensure protein is a number
  @Min(0)  // Protein should be a positive number or zero
  protein?: number;

  @IsOptional()  // Optional: carbohydrates field
  @IsNumber()  // Ensure carbohydrates is a number
  @Min(0)  // Carbohydrates should be a positive number or zero
  carbohydrates?: number;

  @IsOptional()  // Optional: fats field
  @IsNumber()  // Ensure fats is a number
  @Min(0)  // Fats should be a positive number or zero
  fats?: number;

  @IsOptional()  // Optional: notes field
  @IsString()
  notes?: string;

  @IsOptional()  // Optional: mealType field
  @IsEnum(MealType)  // Ensures mealType is a valid MealType enum
  mealType?: MealType;
}
