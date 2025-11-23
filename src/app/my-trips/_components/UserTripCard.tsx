import React from "react";
import { MapPin, Calendar, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface UserTripCardProps {
  trip: any;
}

function UserTripCard({ trip }: UserTripCardProps) {
  const tripData = trip?.tripDetail;

  return (
    <Link href={'/view-trip/' + trip.tripId}>
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-md border border-neutral-200 dark:border-neutral-800 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group">
        <div className="relative h-48 w-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
          {/* Image Logic: Try to find an image from the itinerary */}
          {tripData?.itinerary?.[0]?.hotel?.imageUrl || tripData?.itinerary?.[0]?.activities?.[0]?.imageUrl ? (
             <Image 
               src={tripData?.itinerary?.[0]?.hotel?.imageUrl || tripData?.itinerary?.[0]?.activities?.[0]?.imageUrl}
               alt={tripData?.destination?.city || "Trip"}
               fill
               className="object-cover group-hover:scale-110 transition-transform duration-700"
             />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-emerald-200 dark:text-emerald-900 bg-emerald-50 dark:bg-emerald-950">
              <MapPin className="w-12 h-12" />
            </div>
          )}
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-10">
            <h3 className="text-xl font-bold text-white truncate">
              {tripData?.destination?.city || tripData?.destination}
            </h3>
            <p className="text-sm text-emerald-100 truncate font-medium">
              {tripData?.destination?.country}
            </p>
          </div>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-400">
            <div className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-900/20 px-2.5 py-1 rounded-lg text-emerald-700 dark:text-emerald-300 font-medium">
              <Calendar className="w-3.5 h-3.5" />
              <span>{tripData?.durationDays} Days</span>
            </div>
            <div className="flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-lg">
              <Wallet className="w-3.5 h-3.5" />
              <span>{tripData?.budgetCategory}</span>
            </div>
          </div>
          <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <p className="text-xs text-neutral-500 dark:text-neutral-500 line-clamp-2">
                  {tripData?.tripTitle || "Your personalized trip plan"}
              </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCard;
