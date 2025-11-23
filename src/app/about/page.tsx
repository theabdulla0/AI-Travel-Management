import React from 'react';
import { MapPin, Brain, Wallet, Globe, Sparkles, Heart } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* --- Hero Section --- */}
      <div className="relative overflow-hidden bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-100/50 dark:bg-emerald-900/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-100/50 dark:bg-teal-900/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-bold mb-6">
            <Sparkles className="w-4 h-4" />
            The Future of Travel Planning
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-neutral-900 dark:text-white mb-6 tracking-tight">
            Reimagining Travel <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
              with Artificial Intelligence
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            We believe travel planning should be as exciting as the trip itself. 
            Our AI-powered platform curates personalized itineraries tailored to your 
            budget, interests, and dreams—in seconds.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/create-new-trip" 
              className="px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg shadow-emerald-200 dark:shadow-none transition-all transform hover:scale-105"
            >
              Start Planning Now
            </Link>
            <Link 
              href="/my-trips" 
              className="px-8 py-4 rounded-xl bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-bold border border-neutral-200 dark:border-neutral-700 hover:border-emerald-200 dark:hover:border-emerald-800 transition-all"
            >
              View My Trips
            </Link>
          </div>
        </div>
      </div>

      {/* --- Mission Section --- */}
      <div className="py-20 bg-neutral-50 dark:bg-neutral-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                Travel opens our minds and hearts, but the logistics of planning can be overwhelming. 
                We set out to solve this by combining the power of advanced AI with a deep love for exploration.
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Whether you're a budget backpacker or a luxury seeker, our goal is to make 
                global discovery accessible, effortless, and uniquely yours.
              </p>
            </div>
            <div className="relative">
               <div className="absolute inset-0 bg-emerald-500/10 rounded-3xl transform rotate-3" />
               <div className="relative bg-white dark:bg-neutral-900 p-8 rounded-3xl shadow-xl border border-neutral-100 dark:border-neutral-800">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600">
                      <Heart className="w-6 h-6 fill-current" />
                    </div>
                    <div>
                      <div className="font-bold text-neutral-900 dark:text-white">Built with Passion</div>
                      <div className="text-sm text-neutral-500">For travelers, by travelers</div>
                    </div>
                  </div>
                  <blockquote className="text-lg font-medium text-neutral-700 dark:text-neutral-300 italic">
                    "The world is a book and those who do not travel read only one page."
                  </blockquote>
                  <div className="mt-4 text-sm font-bold text-emerald-600 dark:text-emerald-400">— St. Augustine</div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Features Grid --- */}
      <div className="py-20 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              Why Choose AI Travel?
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
              Experience the next generation of trip planning with features designed to save you time and enhance your journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800 hover:border-emerald-200 dark:hover:border-emerald-900 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 mb-4 group-hover:scale-110 transition-transform">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">Smart Itineraries</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                Our AI analyzes thousands of data points to create logical, optimized day-by-day plans that maximize your time.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800 hover:border-emerald-200 dark:hover:border-emerald-900 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 mb-4 group-hover:scale-110 transition-transform">
                <Wallet className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">Budget Optimization</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                Whether you're on a shoestring or splashing out, we find the best spots that fit your financial comfort zone.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800 hover:border-emerald-200 dark:hover:border-emerald-900 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-lime-100 dark:bg-lime-900/30 flex items-center justify-center text-lime-600 mb-4 group-hover:scale-110 transition-transform">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">Global Discovery</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                From hidden gems in Tokyo to cafes in Paris, discover locations you might have missed with traditional guides.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Footer CTA --- */}
      <div className="py-20 bg-emerald-900 text-center relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
         <div className="relative z-10 px-4">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to start your next adventure?</h2>
            <Link 
              href="/create-new-trip" 
              className="inline-block px-8 py-4 rounded-xl bg-white text-emerald-900 font-bold hover:bg-emerald-50 transition-colors shadow-xl"
            >
              Create Free Itinerary
            </Link>
         </div>
      </div>
    </div>
  );
}
