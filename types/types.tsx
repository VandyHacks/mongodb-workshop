export type Exercise = {
  name: string;
  muscleGroup: string;
  equipment: string;
  difficulty: number;
};

export type Workout = {
  id: string;
  exercise: Exercise;
  reps: number;
  sets: number;
};

export type Stats = {
  totalWorkouts: number;
  totalReps: number;
  totalSets: number;
  totalLifted: number;
};
