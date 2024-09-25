import { Exercise, Workout } from "@/types/types";

export const exercises: Exercise[] = [
  {
    name: "Deadlift",
    muscleGroup: "Back",
    equipment: "Barbell",
    difficulty: 3,
  },
  {
    name: "Bench Press",
    muscleGroup: "Chest",
    equipment: "Barbell",
    difficulty: 2,
  },
  {
    name: "Squat",
    muscleGroup: "Legs",
    equipment: "Barbell",
    difficulty: 3,
  },
  {
    name: "Pull-Up",
    muscleGroup: "Back",
    equipment: "Bodyweight",
    difficulty: 4,
  },
  {
    name: "Bicep Curl",
    muscleGroup: "Arms",
    equipment: "Dumbbell",
    difficulty: 1,
  },
];

export const workouts: Workout[] = [
  {
    id: "w1",
    exercise: exercises[0], // Deadlift
    reps: 5,
    sets: 3,
  },
  {
    id: "w2",
    exercise: exercises[1], // Bench Press
    reps: 8,
    sets: 4,
  },
  {
    id: "w3",
    exercise: exercises[2], // Squat
    reps: 6,
    sets: 3,
  },
  {
    id: "w4",
    exercise: exercises[3], // Pull-Up
    reps: 10,
    sets: 4,
  },
  {
    id: "w5",
    exercise: exercises[4], // Bicep Curl
    reps: 12,
    sets: 3,
  },
];

export const stats = {
  totalWorkouts: workouts.length,
  totalReps: workouts.reduce((acc, workout) => acc + workout.reps, 0),
  totalSets: workouts.reduce((acc, workout) => acc + workout.sets, 0),
  totalLifted: workouts.reduce(
    (acc, workout) => acc + workout.reps * workout.sets,
    0
  ),
};