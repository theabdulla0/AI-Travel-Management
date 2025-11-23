import { getTripById } from '@/app/actions/trip';
import React from 'react';
import TripDetailsView from './_components/TripDetailsView';

export default async function ViewTrip({ params }: { params: Promise<{ tripId: string }> }) {
  const { tripId } = await params;
  const trip = await getTripById(tripId);
  
  if (!trip) {
    return (
      <div className="flex items-center justify-center h-screen bg-neutral-50 dark:bg-neutral-950">
        <h1 className="text-2xl font-bold text-neutral-600 dark:text-neutral-400">Trip not found</h1>
      </div>
    );
  }

  return <TripDetailsView tripPlan={trip.tripDetail} />;
}
