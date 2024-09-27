import { ExerciseType, WorkoutType } from "@/types/types";
import { AutoComplete, AutoCompleteProps, InputNumber, Modal } from "antd";
import { SetStateAction, useState } from "react";

export default function CreateWorkout({
  exercises,
  isVisible,
  setIsVisible,
  setWorkoutList,
}: Readonly<{
  exercises: ExerciseType[];
  isVisible: boolean;
  setIsVisible: (value: SetStateAction<boolean>) => void;
  setWorkoutList: (value: SetStateAction<WorkoutType[]>) => void;
}>) {
  const [value, setValue] = useState("");
  const [reps, setReps] = useState(5);
  const [sets, setSets] = useState(3);
  const [weight, setWeight] = useState(25);
  const [options, setOptions] =
    useState<AutoCompleteProps["options"]>(exercises);

  const handleCreateOk = () => {
    setIsVisible(false);
    const exercise = exercises.find((exercise) => exercise.name === value);
    setWorkoutList((prevWorkouts: WorkoutType[]) => [
      ...prevWorkouts,
      {
        _id: `w${prevWorkouts.length + 1}`,
        exercise: exercise!,
        reps: reps,
        sets: sets,
        weight: weight,
      },
    ]);
    setValue("");
    setReps(5);
    setSets(3);
    setWeight(25);
    fetch("/api/workouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        exercise: exercise?._id,
        reps,
        sets,
        weight,
      }),
    });
  };

  const handleCreateCancel = () => {
    setIsVisible(false);
  };

  const handleSearch = (searchText: string) => {
    setOptions(
      exercises
        .filter((exercise) =>
          exercise.name.toLowerCase().includes(searchText.toLowerCase())
        )
        .map((exercise) => ({ value: exercise.name }))
    );
  };
  return (
    <Modal
      title="Create Workout"
      visible={isVisible}
      onOk={handleCreateOk}
      onCancel={handleCreateCancel}
    >
      <div className="flex flex-col gap-4 w-1/2">
        <p>Exercise</p>
        <AutoComplete
          placeholder="Select an exercise"
          options={options}
          onSearch={(text) => handleSearch(text)}
          value={value}
          onChange={(newValue) => setValue(newValue)}
          onSelect={(newValue) => setValue(newValue)}
        />
        <p>Reps</p>
        <InputNumber
          min={1}
          max={20}
          defaultValue={5}
          placeholder="Reps"
          value={reps}
          onChange={(value) => value && setReps(value)}
        />
        <p>Sets</p>
        <InputNumber
          min={1}
          max={10}
          defaultValue={3}
          placeholder="Sets"
          value={sets}
          onChange={(value) => value && setSets(value)}
        />
        <InputNumber
          min={1}
          max={500}
          defaultValue={3}
          placeholder="Weight"
          value={weight}
          onChange={(value) => value && setWeight(value)}
        />
      </div>
    </Modal>
  );
}
