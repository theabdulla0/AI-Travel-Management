import { NextRequest, NextResponse } from "next/server";

// Optional: define the shape you expect
interface Trip {
  tripTitle: string;
  startingPoint?: string;
  destination: { city: string; country: string };
  durationDays: number;
  budgetCategory?: string;
  groupSize?: string;
  interests?: string[];
  itinerary?: any[];
}

// Helper (optional)
async function saveTrip(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const trip: Trip | undefined = body?.trip;

  if (!trip) {
    return NextResponse.json(
      { success: false, error: "Missing 'trip' in request body" },
      { status: 400 }
    );
  }

  // Basic validation
  if (!trip.tripTitle) {
    return NextResponse.json(
      { success: false, error: "trip.tripTitle is required" },
      { status: 400 }
    );
  }
  if (!trip.destination?.city || !trip.destination?.country) {
    return NextResponse.json(
      { success: false, error: "destination.city and destination.country are required" },
      { status: 400 }
    );
  }
  if (typeof trip.durationDays !== "number") {
    return NextResponse.json(
      { success: false, error: "durationDays must be a number" },
      { status: 400 }
    );
  }


  const saved = { id: crypto.randomUUID(), ...trip };

  return NextResponse.json({ success: true, data: saved }, { status: 201 });
}

// Export HTTP handlers
export async function POST(req: NextRequest) {
  try {
    return await saveTrip(req);
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to save trip" },
      { status: 500 }
    );
  }
}

// Optional: sanity check
export async function GET() {
  return NextResponse.json({ ok: true, route: "/api/save-trip" });
}