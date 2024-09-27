import {Schema, model, models} from "mongoose";
import {ExerciseType} from "../types/types";

export const exerciseSchema = new Schema<ExerciseType>({
  name: String,
  muscleGroup: String,
  equipment: String,
  difficulty: Number,
});

console.log(models)

export const Exercise = models.exercises || model<ExerciseType>("Exercise", exerciseSchema);