"use client";
import { motion } from "framer-motion";
import { ActivityCard } from "./ActivityCard";
import { HotelCard } from "./HotelCard";

export function DaySection({ day, index, totalDays }: { day: any; index: number; totalDays: number }) {
  return (
    <div className="flex gap-0 sm:gap-6 relative">
      {/* LEFT COLUMN: Sticky Day Indicator */}
      <div className="flex flex-col items-center w-16 sm:w-24 flex-shrink-0">
        <div className="sticky top-6 z-20 flex flex-col items-center">
          <div className="relative">
            {/* Glowing effect behind the number */}
            <div className="absolute inset-0 bg-emerald-500/20 blur-lg rounded-full" />
            
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 dark:from-emerald-500 dark:to-emerald-700 shadow-lg flex items-center justify-center border-2 border-white dark:border-neutral-800 text-white">
               <span className="text-lg sm:text-xl font-black">{day.day}</span>
            </div>
          </div>
          <span className="mt-2 text-[10px] sm:text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider bg-white dark:bg-neutral-900 px-2 py-0.5 rounded-full shadow-sm border border-emerald-100 dark:border-emerald-900/50">
            Day
          </span>
        </div>
        
        {/* The Main Timeline Line connecting Days */}
        {index !== totalDays - 1 && (
          <div className="w-0.5 flex-grow bg-gradient-to-b from-emerald-500 via-emerald-200 to-transparent dark:from-emerald-600 dark:via-neutral-800 dark:to-transparent my-4 opacity-50" />
        )}
      </div>

      {/* RIGHT COLUMN: Content */}
      <div className="flex-1 pb-16">
        {/* Day Title */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-6 pt-2"
        >
          <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
            {day.title}
          </h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            {day.activities?.length || 0} experiences planned for today
          </p>
        </motion.div>

        {/* Activities List */}
        <div className="relative border-l-2 border-dashed border-emerald-100 dark:border-neutral-800 ml-3 sm:ml-0">
          {day.activities?.map((activity: any, actIndex: number) => (
            <ActivityCard key={actIndex} activity={activity} index={actIndex} />
          ))}
        </div>

        {/* Hotel for the night */}
        {day.hotel && <HotelCard hotel={day.hotel} />}
      </div>
    </div>
  );
}
