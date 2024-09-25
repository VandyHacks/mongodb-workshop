import { workouts } from "@/constants/fake-data";

export function GET() {
  return new Response(JSON.stringify(workouts), {
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  console.log(body)
  return new Response();
}