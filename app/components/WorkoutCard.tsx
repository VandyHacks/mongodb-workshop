import { Workout } from "@/types/types";
import { Card } from "antd";

export default function WorkoutCard({
  workout,
}: Readonly<{ workout: Workout }>) {
  return (
    <Card title={workout.exercise.name} key={workout.id}>
      <p>Reps: {workout.reps}</p>
      <p>Sets: {workout.sets}</p>
      <p>Muscle Group: {workout.exercise.muscleGroup}</p>
      <p>Equipment: {workout.exercise.equipment}</p>
      <p>Difficulty: {workout.exercise.difficulty}</p>
    </Card>
  );
}
