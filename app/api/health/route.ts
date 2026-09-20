import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { db } from "@/db";

export async function GET() {
  if (!db) {
    return NextResponse.json(
      { status: "degraded", database: "not-configured" },
      { status: 200 }
    );
  }

  try {
    await db.execute(sql`select 1`);
    return NextResponse.json({ status: "ok", database: "ok" });
  } catch {
    return NextResponse.json({ status: "error", database: "unreachable" }, { status: 503 });
  }
}
