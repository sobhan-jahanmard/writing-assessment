import { processNextJob } from "@/src/lib/services/queue.service";
import { NextResponse } from "next/server";

export async function GET() {
  await processNextJob();
  return NextResponse.json({ message: "Job processed" });
}
