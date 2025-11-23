import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { fetchPlaceDetails } from "@/lib/imageService";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const MODEL =
  process.env.OPENROUTER_MODEL || "x-ai/grok-4.1-fast:free";

type TripPlanRequest = {
  origin: string;
  destination: string;
  duration: string;
  travelType: string;
  budget: string;
  purpose: string[];
  specialRequirements?: string;
};

function buildPrompt(data: TripPlanRequest) {
  return `
You are an AI Trip Planner.
User details:
- From: ${data.origin}
- To: ${data.destination}
- Duration: ${data.duration}
- Group: ${data.travelType}
- Budget: ${data.budget}
- Interests: ${data.purpose.join(", ")}
${data.specialRequirements ? `- Special: ${data.specialRequirements}` : ""}

Return ONLY a JSON object (no markdown, no extra text) with this shape:

{
  "tripTitle": "string",
  "startingPoint": "string",
  "destination": { "city": "string", "country": "string" },
  "groupSize": "Solo | Couple | Family | Friends | Business",
  "budgetCategory": "Budget-friendly | Moderate | Luxury | Ultra-luxury",
  "durationDays": number,
  "interests": ["array", "of", "interests"],
  "itinerary": [
    {
      "day": number,
      "title": "string",
      "activities": [
        { 
          "time": "string (e.g., '9:00 AM - 11:00 AM')", 
          "name": "string (activity/place name)", 
          "description": "string (detailed 2-3 sentence description)",
          "location": "string (specific address or area)",
          "duration": "string (e.g., '2 hours')",
          "category": "string (e.g., 'Sightseeing', 'Museum', 'Adventure', 'Food')"
        }
      ],
      "hotel": { "name": "string" },
      "meals": [{ "type": "Breakfast | Lunch | Dinner", "name": "string" }]
    }
  ],
  "estimatedCost": { "total": "string", "perPerson": "string" },
  "recommendations": {
    "hotels": [{ "name": "string" }],
    "restaurants": [{ "name": "string" }],
    "travelTips": ["tip1", "tip2"]
  }
}

Rules:
- durationDays must be a number.
- itinerary length must equal durationDays.
- Each activity must have detailed description, location, duration, and category.
- Descriptions should be engaging and informative (2-3 sentences).
- Locations should be specific (neighborhood, street, or landmark).
- Times should cover the full day (morning to evening).
- Only return JSON.
`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const tripData: TripPlanRequest | undefined = body?.tripData;

    if (!tripData) {
      return NextResponse.json(
        { success: false, error: "Missing tripData" },
        { status: 400 }
      );
    }

    const required = [
      "origin",
      "destination",
      "duration",
      "travelType",
      "budget",
      "purpose",
    ] as const;
    const missing = required.filter((k) => !(tripData as any)[k]);
    if (missing.length) {
      return NextResponse.json(
        { success: false, error: `Missing fields: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    const prompt = buildPrompt(tripData);

    const completion = await client.chat.completions.create({
      model: MODEL,
      messages: [{ role: "system", content: prompt }],
      // @ts-expect-error - OpenRouter supports extra_body for reasoning
      extra_body: { reasoning: { enabled: true } },
    });

    let text = completion.choices?.[0]?.message?.content || "";
    text = text
      .trim()
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "");

    // Parse safely
    let json: any;
    try {
      json = JSON.parse(text);
    } catch {
      const match = text.match(/\{[\s\S]*\}/);
      if (!match) throw new Error("Model did not return JSON");
      json = JSON.parse(match[0]);
    }

    // Enhance with SerpApi data
    if (json.itinerary && Array.isArray(json.itinerary)) {
      await Promise.all(
        json.itinerary.map(async (day: any) => {
          const promises = [];

          // Fetch hotel details
          if (day.hotel?.name) {
            promises.push(
              (async () => {
                const query = `${day.hotel.name} hotel in ${json.destination?.city || tripData.destination}`;
                const details = await fetchPlaceDetails(query);
                day.hotel = { ...day.hotel, ...details };
              })()
            );
          }

          // Fetch activity details
          if (day.activities && Array.isArray(day.activities)) {
            day.activities.forEach((activity: any) => {
              if (activity.name) {
                promises.push(
                  (async () => {
                    const query = `${activity.name} ${json.destination?.city || tripData.destination}`;
                    const details = await fetchPlaceDetails(query);
                    activity.imageUrl = details.imageUrl;
                    activity.mapLink = details.mapLink;
                  })()
                );
              }
            });
          }

          await Promise.all(promises);
        })
      );
    }

    return NextResponse.json({ success: true, data: json });
  } catch (err: any) {
    console.error("aimodel error:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to generate trip plan" },
      { status: 500 }
    );
  }
}

// Simple test route
export async function GET() {
  return NextResponse.json({ ok: true, route: "/api/aimodel" });
}
