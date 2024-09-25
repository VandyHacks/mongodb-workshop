import { exercises } from "@/constants/fake-data";

export async function GET() {
  return new Response(JSON.stringify(exercises), {
    headers: {
      "content-type": "application/json",
    },
  });
}