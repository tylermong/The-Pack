import { IsString, IsOptional, IsInt, IsEnum, IsUUID, IsDateString, IsNumber, Min} from 'class-validator';
import { MealType } from '@prisma/client';

export class UpdateNutritionTrackerDto {
  @IsUUID() // Ensure userId is valid if updating it
  @IsOptional()
  userId?: string;

  @IsUUID() // Ensure coachId is valid if updating it
  @IsOptional()
  coachId?: string;

  @IsString() // Ensure title is valid if updating it
  @IsOptional()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  timeSlot?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  calories?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  protein?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  carbohydrates?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  fats?: number;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsEnum(MealType)
  mealType?: MealType;
}
