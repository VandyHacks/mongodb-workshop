import {stats} from "@/constants/fake-data";

export async function GET() {
  return new Response(JSON.stringify(stats), {
    headers: {
      "content-type": "application/json",
    },
  });
}