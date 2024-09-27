import dbConnect from "@/lib/db-connect";
import { Workout } from "@/models/Workout";

export async function GET() {
  await dbConnect();
  const totalWorkouts = await Workout.countDocuments();
  const totalReps = await Workout.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: { $multiply: ["$reps", "$sets"] } },
      },
    },
  ]);
  const totalSets = await Workout.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: "$sets" },
      },
    },
  ]);
  const totalLifted = await Workout.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: { $multiply: ["$reps", "$sets", "$weight"] } },
      },
    },
  ]);
  // IF TIME PERMITS
  const totalChestLifted = await Workout.aggregate([
    {
      // match chest exercises, which uses info from the Exercise collection
      $lookup: {
        from: "exercises",
        localField: "exercise",
        foreignField: "_id",
        as: "exercise",
      },
    },
    {
      $match: {
        "exercise.muscleGroup": "Chest",
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: { $multiply: ["$reps", "$sets", "$weight"] } },
      },
    },
  ]);
  console.log("totalChestLifted", totalChestLifted);
  const stats = {
    totalWorkouts: await totalWorkouts,
    totalReps:  totalReps[0]?.total || 0,
    totalSets: totalSets[0]?.total || 0,
    totalLifted: totalLifted[0]?.total || 0,
  }
  return new Response(JSON.stringify(stats));
}