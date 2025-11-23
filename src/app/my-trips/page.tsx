"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useUserDetail } from "../provider";
import { getUserTrips } from "../actions/trip";
import UserTripCard from "./_components/UserTripCard";
import { Loader2, MapPinOff } from "lucide-react";

function MyTrips() {
  const { userDetail } = useUserDetail();
  const [userTrips, setUserTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTrips = useCallback(async () => {
    try {
      setLoading(true);
      const trips = await getUserTrips(userDetail._id);
      setUserTrips(trips);
    } catch (error) {
      console.error("Error fetching trips:", error);
    } finally {
      setLoading(false);
    }
  }, [userDetail]);

  useEffect(() => {
    if (userDetail) {
      fetchTrips();
    }
  }, [userDetail, fetchTrips]);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-8">
          My Trips
        </h1>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
        ) : userTrips.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userTrips.map((trip, index) => (
              <UserTripCard key={index} trip={trip} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mb-4">
              <MapPinOff className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
              No trips found
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-md mb-6">
              You haven&apos;t created any trips yet. Start a conversation with our AI assistant to plan your next adventure!
            </p>
            <a
              href="/create-new-trip"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
            >
              Create New Trip
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyTrips;
