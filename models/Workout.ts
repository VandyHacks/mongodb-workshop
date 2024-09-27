import {Schema, model, models} from "mongoose";
import {WorkoutType} from "../types/types";

const workoutSchema = new Schema<WorkoutType>({
  exercise: {
    type: Schema.Types.ObjectId,
    ref: "Exercise",
  },
  reps: Number,
  sets: Number,
  weight: Number,
});

export const Workout = models.Workout || model<WorkoutType>("Workout", workoutSchema);