"use client";

import React from 'react';
import { Calendar, Wallet, Plane, Sparkles, MapPin, Clock, Star, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function TripDetailsView({ tripPlan }: { tripPlan: any }) {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* --- Sticky Header --- */}
      <div className="sticky top-0 z-30 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
        {/* Green Top Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                  Travel Itinerary
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white flex items-center gap-2">
                {tripPlan.tripTitle || `Trip to ${tripPlan.destination?.city}`}
                <Plane className="w-6 h-6 text-emerald-500 rotate-[-45deg]" />
              </h1>
            </div>

            <div className="flex items-center gap-3 text-sm">
               <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700">
                  <Calendar className="w-4 h-4 text-emerald-500" />
                  <span className="font-semibold">{tripPlan.durationDays} Days</span>
               </div>
               <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700">
                  <Wallet className="w-4 h-4 text-emerald-500" />
                  <span className="font-semibold">{tripPlan.budgetCategory}</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Main Content --- */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Intro Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {tripPlan.destination && (
            <div className="bg-white dark:bg-neutral-900 p-5 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-800">
              <div className="text-xs text-neutral-400 uppercase font-bold mb-1">City</div>
              <div className="font-bold text-lg text-neutral-800 dark:text-white">{tripPlan.destination.city}</div>
            </div>
          )}
           {tripPlan.destination && (
            <div className="bg-white dark:bg-neutral-900 p-5 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-800">
              <div className="text-xs text-neutral-400 uppercase font-bold mb-1">Country</div>
              <div className="font-bold text-lg text-neutral-800 dark:text-white">{tripPlan.destination.country}</div>
            </div>
          )}
          <div className="bg-white dark:bg-neutral-900 p-5 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-800">
              <div className="text-xs text-neutral-400 uppercase font-bold mb-1">Total Spots</div>
              <div className="font-bold text-lg text-neutral-800 dark:text-white">
                {tripPlan.itinerary?.reduce((acc: any, day: any) => acc + (day.activities?.length || 0), 0)}
              </div>
            </div>
            <div className="bg-white dark:bg-neutral-900 p-5 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-800">
              <div className="text-xs text-neutral-400 uppercase font-bold mb-1">Currency</div>
              <div className="font-bold text-lg text-neutral-800 dark:text-white">{tripPlan.destination?.currency || "USD"}</div>
            </div>
        </div>

        {/* Timeline Iteration */}
        <div className="space-y-0">
          {tripPlan.itinerary?.map((day: any, dayIndex: number) => (
            <div key={dayIndex} className="flex gap-0 sm:gap-6 relative">
              {/* LEFT COLUMN: Sticky Day Indicator */}
              <div className="flex flex-col items-center w-16 sm:w-24 flex-shrink-0">
                <div className="sticky top-24 z-20 flex flex-col items-center">
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
                {dayIndex !== tripPlan.itinerary.length - 1 && (
                  <div className="w-0.5 flex-grow bg-gradient-to-b from-emerald-500 via-emerald-200 to-transparent dark:from-emerald-600 dark:via-neutral-800 dark:to-transparent my-4 opacity-50" />
                )}
              </div>

              {/* RIGHT COLUMN: Content */}
              <div className="flex-1 pb-16">
                {/* Day Title */}
                <div className="mb-6 pt-2">
                  <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
                    {day.title}
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                    {day.activities?.length || 0} experiences planned for today
                  </p>
                </div>

                {/* Activities List */}
                <div className="relative border-l-2 border-dashed border-emerald-100 dark:border-neutral-800 ml-3 sm:ml-0 space-y-8">
                  {day.activities?.map((activity: any, actIndex: number) => (
                    <div key={actIndex} className="group relative pl-8">
                      {/* Connector Dot */}
                      <div className="absolute left-[-5px] top-6 w-3 h-3 rounded-full border-2 border-emerald-500 bg-white dark:bg-neutral-900 z-10" />
                      
                      <div className="bg-white dark:bg-neutral-800/50 rounded-2xl p-5 border border-neutral-100 dark:border-neutral-800 hover:border-emerald-200 dark:hover:border-emerald-900/50 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="flex flex-col sm:flex-row gap-4">
                          {/* Activity Image */}
                          {activity.imageUrl ? (
                            <div className="w-full sm:w-32 h-32 rounded-xl overflow-hidden flex-shrink-0 relative">
                              <img 
                                src={activity.imageUrl} 
                                alt={activity.name} 
                                className="w-full h-full object-cover" 
                              />
                            </div>
                          ) : (
                            <div className="w-full sm:w-32 h-32 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center flex-shrink-0 text-emerald-300 dark:text-emerald-700">
                               <MapPin className="w-10 h-10 opacity-50" />
                            </div>
                          )}

                          <div className="flex-1 min-w-0">
                            {/* Header: Time & Category */}
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              {activity.time && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                                  <Clock className="w-3 h-3" />
                                  {activity.time}
                                </span>
                              )}
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 text-xs font-semibold border border-neutral-200 dark:border-neutral-700">
                                <MapPin className="w-3 h-3" />
                                {activity.category}
                              </span>
                            </div>

                            <h4 className="text-lg font-bold text-neutral-800 dark:text-neutral-100 mb-1">
                              {activity.name}
                            </h4>
                            
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3 line-clamp-2">
                              {activity.description || activity.details}
                            </p>

                            <div className="flex flex-wrap items-center gap-3">
                              {activity.location && (
                                <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-500">
                                  <MapPin className="w-3.5 h-3.5" />
                                  <span className="truncate max-w-[200px]">{activity.location}</span>
                                </div>
                              )}
                              
                              {activity.mapLink && (
                                <a 
                                  href={activity.mapLink} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline ml-auto sm:ml-0"
                                >
                                  View on Map <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Hotel for the night */}
                {day.hotel && (
                  <div className="relative mt-6 mb-8 ml-8 overflow-hidden rounded-2xl border border-emerald-100 dark:border-emerald-900">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/30 dark:to-neutral-900 z-0" />
                    <div className="relative z-10 p-1">
                      <div className="flex flex-col sm:flex-row gap-4 bg-white/60 dark:bg-black/20 backdrop-blur-sm rounded-xl p-4">
                        {day.hotel.imageUrl ? (
                           <div className="w-full sm:w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                             <img src={day.hotel.imageUrl} alt={day.hotel.name} className="w-full h-full object-cover" />
                           </div>
                        ) : (
                          <div className="w-full sm:w-32 h-32 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0 text-emerald-600">
                            <MapPin className="w-8 h-8" />
                          </div>
                        )}
                        
                        <div className="flex-1 min-w-0 py-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                              Where to stay
                            </span>
                            {day.hotel.rating && (
                              <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/20 px-2 py-0.5 rounded-full">
                                <Star className="w-3 h-3 text-yellow-600 dark:text-yellow-400 fill-yellow-600 dark:fill-yellow-400" />
                                <span className="text-xs font-bold text-yellow-700 dark:text-yellow-500">{day.hotel.rating}</span>
                              </div>
                            )}
                          </div>
                          
                          <h4 className="text-lg font-bold text-neutral-900 dark:text-white truncate mb-2">
                            {day.hotel.name}
                          </h4>
                          
                          <div className="flex items-start gap-2 mb-3">
                            <MapPin className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">{day.hotel.address}</p>
                          </div>

                          {day.hotel.mapLink && (
                            <a 
                              href={day.hotel.mapLink} 
                              target="_blank" 
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                            >
                              View on Map <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* End of Trip */}
        <div className="flex gap-6 mt-8 opacity-60">
          <div className="w-16 sm:w-24 flex justify-center">
             <div className="w-0.5 h-12 bg-gradient-to-b from-emerald-500 to-transparent" />
          </div>
          <div className="flex-1 pb-12">
             <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-bold">
               <Sparkles className="w-4 h-4" />
               Trip Completed
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
