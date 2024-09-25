import { Button, Modal } from "antd";
import { Stats } from "@/types/types";

export default function StatsModal({
  stats,
  statsModalVisible,
  handleStatsClose,
}: {
  stats: Stats;
  statsModalVisible: boolean;
  handleStatsClose: () => void;
}) {
  return (
    <Modal
      title="Workout Stats"
      visible={statsModalVisible}
      footer={[
        <Button key="back" onClick={handleStatsClose}>
          Return
        </Button>,
      ]}
      onCancel={handleStatsClose}
    >
      <p>Total Workouts: {stats.totalWorkouts}</p>
      <p>Total Reps: {stats.totalReps}</p>
      <p>Total Sets: {stats.totalSets}</p>
      <p>Total Lifted: {stats.totalLifted}</p>
    </Modal>
  );
}
