"use client";

import { FloatButton } from "antd";
import { PlusOutlined, CalculatorOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import CreateWorkout from "./components/CreateWorkout";
import WorkoutCard from "./components/WorkoutCard";
import StatsModal from "./components/StatsModal";
import { ExerciseType, Stats, WorkoutType } from "@/types/types";

export default function Home() {
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [statsModalVisible, setStatsModalVisible] = useState(false);
  const [workoutList, setWorkoutList] = useState<WorkoutType[]>([]);
  const [exercises, setExercises] = useState<ExerciseType[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalWorkouts: 0,
    totalReps: 0,
    totalSets: 0,
    totalLifted: 0,
  });

  useEffect(() => {
    fetch("/api/exercises")
      .then((res) => res.json())
      .then((data) => setExercises(data));
  }, []);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  useEffect(() => {
    fetch("/api/workouts")
      .then((res) => res.json())
      .then((data) => {
        setWorkoutList(data);
      });
  }, []);

  const handleStatsClose = () => {
    setStatsModalVisible(false);
  };

  return (
    <div className="w-full flex flex-col items-center m-10 gap-5">
      <h1 className="text-4xl">Weightlifting Tracker</h1>
      <FloatButton
        icon={<PlusOutlined />}
        style={{ insetInlineEnd: 24 }}
        onClick={() => setCreateModalVisible(true)}
      />
      <FloatButton
        icon={<CalculatorOutlined />}
        style={{ insetInlineEnd: 94 }}
        onClick={() => setStatsModalVisible(true)}
      />
      <div className="flex gap-3 flex-col w-1/2">
        {workoutList.map((workout) => (
          <WorkoutCard workout={workout} key={workout._id} />
        ))}
      </div>
      <CreateWorkout
        exercises={exercises}
        isVisible={createModalVisible}
        setIsVisible={setCreateModalVisible}
        setWorkoutList={setWorkoutList}
      />
      <StatsModal
        stats={stats}
        statsModalVisible={statsModalVisible}
        handleStatsClose={handleStatsClose}
      />
    </div>
  );
}
