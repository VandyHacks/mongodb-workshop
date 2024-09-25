import { Exercise, Workout } from "@/types/types";
import { AutoComplete, AutoCompleteProps, InputNumber, Modal } from "antd";
import { SetStateAction, useState } from "react";

export default function CreateWorkout({
  exercises,
  isVisible,
  setIsVisible,
  setWorkoutList,
}: Readonly<{
  exercises: Exercise[];
  isVisible: boolean;
  setIsVisible: (value: SetStateAction<boolean>) => void;
  setWorkoutList: (value: SetStateAction<Workout[]>) => void;
}>) {
  const [value, setValue] = useState("");
  const [reps, setReps] = useState(5);
  const [sets, setSets] = useState(3);
  const [options, setOptions] =
    useState<AutoCompleteProps["options"]>(exercises);

  const handleCreateOk = () => {
    setIsVisible(false);
    setWorkoutList((prevWorkouts: Workout[]) => [
      ...prevWorkouts,
      {
        id: `w${prevWorkouts.length + 1}`,
        exercise: exercises.find((exercise) => exercise.name === value)!,
        reps: 5,
        sets: 3,
      },
    ]);
    setValue("");
    setReps(5);
    setSets(3);
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
          max={10}
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
      </div>
    </Modal>
  );
}
