"use client";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Clock,
  Landmark,
  MapPinned,
  Sparkles,
  Utensils,
  Navigation2,
  Camera,
  Star,
  Leaf,
  Wallet,
  ExternalLink,
  Image as ImageIcon
} from "lucide-react";

// --- Icon Mapping ---
const categoryIcons: Record<string, any> = {
  "Sightseeing": Landmark,
  "Activity": MapPinned,
  "Culture": Sparkles,
  "Dining": Utensils,
  "Walking Tour": Navigation2,
  "Museum": Camera,
  "Entertainment": Star,
  "Historical Site": Landmark,
  "Nature": Leaf,
  "Shopping": Wallet,
  "Fine Dining": Utensils,
};

export function ActivityCard({ activity, index }: { activity: any; index: number }) {
  const CategoryIcon = categoryIcons[activity.category] || MapPinned;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative pl-8 pb-8 last:pb-0"
    >
      {/* Connector Dot on the local timeline */}
      <div className="absolute left-0 top-6 w-3 h-3 rounded-full border-2 border-emerald-500 bg-white dark:bg-neutral-900 z-10 group-hover:scale-125 group-hover:bg-emerald-500 transition-all duration-300" />
      
      {/* Vertical Line for specific day items */}
      <div className="absolute left-[5px] top-8 bottom-0 w-0.5 bg-neutral-200 dark:bg-neutral-800 group-last:hidden" />

      <div className="bg-white dark:bg-neutral-800/50 rounded-2xl p-5 border border-neutral-100 dark:border-neutral-800 hover:border-emerald-200 dark:hover:border-emerald-900/50 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Activity Image */}
          {activity.imageUrl ? (
            <div className="w-full sm:w-32 h-32 rounded-xl overflow-hidden flex-shrink-0 relative group-hover:shadow-md transition-all">
              <img 
                src={activity.imageUrl} 
                alt={activity.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ) : (
            <div className="w-full sm:w-32 h-32 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center flex-shrink-0 text-emerald-300 dark:text-emerald-700">
               <CategoryIcon className="w-10 h-10 opacity-50" />
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
                <CategoryIcon className="w-3 h-3" />
                {activity.category}
              </span>
            </div>

            <h4 className="text-lg font-bold text-neutral-800 dark:text-neutral-100 mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
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
    </motion.div>
  );
}
