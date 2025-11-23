"use client";

import { motion } from "framer-motion";
import { 
  MapPin, 
  Calendar, 
  Wallet, 
  Sparkles,
  Plane,
  Star
} from "lucide-react";
import { DaySection } from "./TripDetailsComponents/DaySection";

// --- Main Component ---
export default function TripDetails({
  tripPlan,
  tripData,
}: {
  tripPlan: any;
  tripData: any;
}) {
  
  // --- Empty State (No Plan Yet) ---
  if (!tripPlan) {
    return (
      <div className="relative bg-white dark:bg-neutral-900 rounded-3xl shadow-xl border border-neutral-200 dark:border-neutral-800 h-[calc(100vh-10rem)] max-h-[800px] overflow-hidden flex items-center justify-center">
        {/* Abstract Green Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-100/50 dark:bg-emerald-900/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-100/50 dark:bg-teal-900/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="relative z-10 text-center p-8 max-w-md">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-20 h-20 bg-gradient-to-tr from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-200 dark:shadow-none"
          >
            <MapPin className="w-10 h-10 text-white" />
          </motion.div>
          
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-3">
            Ready to Explore?
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 mb-8 leading-relaxed">
            Enter your destination and preferences to generate a personalized, day-by-day itinerary powered by AI.
          </p>

          {/* User Selection Summary (if data exists but no plan yet) */}
          {tripData && (
            <div className="grid grid-cols-2 gap-3 text-left">
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800">
                <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400">Destination</span>
                <p className="font-semibold text-neutral-800 dark:text-emerald-100">{tripData.destination || "—"}</p>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800">
                <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400">Dates</span>
                <p className="font-semibold text-neutral-800 dark:text-emerald-100 text-sm truncate">
                  {tripData.startDate ? `${tripData.startDate} - ${tripData.endDate}` : "—"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- Render Trip Plan ---
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-neutral-200 dark:border-neutral-800 h-[calc(100vh-10rem)] max-h-[800px] overflow-hidden flex flex-col">
      
      {/* --- Sticky Header --- */}
      <div className="relative z-30 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
        {/* Green Top Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600" />
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                  Travel Itinerary
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white flex items-center gap-2">
                {tripPlan.tripTitle || `Trip to ${tripPlan.destination?.city}`}
                <Plane className="w-6 h-6 text-emerald-500 rotate-[-45deg]" />
              </h2>
            </div>

            <div className="flex items-center gap-4 text-sm">
               <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-800 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700">
                  <Calendar className="w-4 h-4 text-emerald-500" />
                  <span className="font-semibold">{tripPlan.durationDays} Days</span>
               </div>
               <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-800 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700">
                  <Wallet className="w-4 h-4 text-emerald-500" />
                  <span className="font-semibold">{tripPlan.budgetCategory}</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Scrollable Content Area --- */}
      <div className="flex-1 overflow-y-auto custom-scrollbar relative bg-neutral-50/50 dark:bg-neutral-950">
        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-8">
          
          {/* Intro Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
            {tripPlan.destination && (
              <div className="bg-white dark:bg-neutral-900 p-4 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-800">
                <div className="text-xs text-neutral-400 uppercase font-bold mb-1">City</div>
                <div className="font-bold text-neutral-800 dark:text-white">{tripPlan.destination.city}</div>
              </div>
            )}
             {tripPlan.destination && (
              <div className="bg-white dark:bg-neutral-900 p-4 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-800">
                <div className="text-xs text-neutral-400 uppercase font-bold mb-1">Country</div>
                <div className="font-bold text-neutral-800 dark:text-white">{tripPlan.destination.country}</div>
              </div>
            )}
            <div className="bg-white dark:bg-neutral-900 p-4 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-800">
                <div className="text-xs text-neutral-400 uppercase font-bold mb-1">Total Spots</div>
                <div className="font-bold text-neutral-800 dark:text-white">
                  {tripPlan.itinerary?.reduce((acc: any, day: any) => acc + (day.activities?.length || 0), 0)}
                </div>
              </div>
              <div className="bg-white dark:bg-neutral-900 p-4 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-800">
                <div className="text-xs text-neutral-400 uppercase font-bold mb-1">Currency</div>
                <div className="font-bold text-neutral-800 dark:text-white">{tripPlan.destination?.currency || "USD"}</div>
              </div>
          </div>

          {/* Timeline Iteration */}
          <div className="space-y-0">
            {tripPlan.itinerary?.map((day: any, dayIndex: number) => (
              <DaySection 
                key={dayIndex} 
                day={day} 
                index={dayIndex} 
                totalDays={tripPlan.itinerary.length} 
              />
            ))}
          </div>

          {/* End of Trip */}
          <div className="flex gap-6 mt-4 opacity-60">
            <div className="w-24 flex justify-center">
               <div className="w-0.5 h-8 bg-gradient-to-b from-emerald-500 to-transparent" />
            </div>
            <div className="flex-1 pb-12">
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-bold">
                 <Sparkles className="w-4 h-4" />
                 Trip Completed
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}