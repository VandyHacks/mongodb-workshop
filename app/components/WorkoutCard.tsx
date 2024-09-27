import { WorkoutType } from "@/types/types";
import { Card } from "antd";

export default function WorkoutCard({
  workout,
}: Readonly<{ workout: WorkoutType }>) {
  return (
    <Card title={workout.exercise.name} key={workout._id}>
      <p>Reps: {workout.reps}</p>
      <p>Sets: {workout.sets}</p>
      <p>Weight: {workout.weight}</p>
      <p>Muscle Group: {workout.exercise.muscleGroup}</p>
      <p>Equipment: {workout.exercise.equipment}</p>
      <p>Difficulty: {workout.exercise.difficulty}</p>
    </Card>
  );
}
