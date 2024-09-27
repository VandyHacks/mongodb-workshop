import dbConnect from "@/lib/db-connect";
import { Exercise } from "@/models/Exercise";

export async function GET() {
  await dbConnect();
  const exercises = await Exercise.find({});
  return new Response(JSON.stringify(exercises), {
    headers: {
      "content-type": "application/json",
    },
  });
}