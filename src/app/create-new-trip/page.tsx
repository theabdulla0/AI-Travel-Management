"use client";
import React, { useState } from "react";
import ChatBox from "./_components/ChatBox";
import TripDetails from "./_components/TripDetails";
import { Sparkles } from "lucide-react";
// import { demoTripData, demoTripPlan } from "./_components/demoTripData";

export default function CreateNewTrip() {
  const [tripPlan, setTripPlan] = useState<any>(null); // Use demo data
  const [tripData, setTripData] = useState<any>(null);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-blue-500" />
            Plan Your Next Adventure
          </h1>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            Chat with our AI to create a personalized travel itinerary
          </p>
        </div>

        <div 
          className={`grid grid-cols-1 gap-6 transition-all duration-500 ${
            tripPlan ? "lg:grid-cols-2" : "lg:grid-cols-1"
          }`}
        >
          {/* ChatBox - Full width when no trip, half width when trip exists */}
          <div 
            className={`order-2 lg:order-1 transition-all duration-500 ${
              !tripPlan ? "lg:max-w-4xl lg:mx-auto w-full" : ""
            }`}
          >
            <ChatBox
              onTripGenerated={(plan) => setTripPlan(plan)}
              onTripDataUpdate={(data) => setTripData(data)}
            />
          </div>

          {/* TripDetails - Only show when trip is generated */}
          {tripPlan && (
            <div className="order-1 lg:order-2 animate-slide-in-right">
              <TripDetails tripPlan={tripPlan} tripData={tripData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}