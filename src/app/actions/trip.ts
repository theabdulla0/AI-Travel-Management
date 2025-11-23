'use server';

import dbConnect from '@/lib/db';
import Trip from '@/models/Trip';
import User from '@/models/User';

export async function saveTrip(tripData: {
  tripId: string;
  userId: string;

  tripDetail: Record<string, any>;
}) {
  console.log("saveTrip called for user:", tripData.userId);
  try {
    await dbConnect();

    const newTrip = await Trip.create({
      tripId: tripData.tripId,
      userId: tripData.userId,
      tripDetail: tripData.tripDetail,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    // Add tripId to User's trips array
    // Assuming userId passed here is the User's _id from MongoDB or ClerkId. 
    // Based on ChatBox.tsx, it's userDetail?._id which is the Mongo _id.
    await User.findByIdAndUpdate(tripData.userId, {
      $push: { trips: tripData.tripId }
    });

    return JSON.parse(JSON.stringify(newTrip));
  } catch (error) {
    console.error('Error in saveTrip:', error);
    throw new Error('Failed to save trip');
  }
}

export async function getUserTrips(userId: string) {
  try {
    await dbConnect();
    const trips = await Trip.find({ userId: userId }).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(trips));
  } catch (error) {
    console.error("Error fetching user trips:", error);
    throw new Error("Failed to fetch user trips");
  }
}

export async function getTripById(tripId: string) {
  try {
    await dbConnect();
    const trip = await Trip.findOne({ tripId: tripId });
    return JSON.parse(JSON.stringify(trip));
  } catch (error) {
    console.error("Error fetching trip:", error);
    throw new Error("Failed to fetch trip");
  }
}
