
export function HotelCard({ hotel }: { hotel: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative mt-6 mb-8 ml-8 overflow-hidden rounded-2xl border border-emerald-100 dark:border-emerald-900"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/30 dark:to-neutral-900 z-0" />
      
      {/* Decorative Background Blob */}
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-100 dark:bg-emerald-900/20 rounded-full blur-3xl" />

      <div className="relative z-10 p-1">
        <div className="flex flex-col sm:flex-row gap-4 bg-white/60 dark:bg-black/20 backdrop-blur-sm rounded-xl p-4">
          {hotel.imageUrl ? (
             <div className="w-full sm:w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
               <img src={hotel.imageUrl} alt={hotel.name} className="w-full h-full object-cover" />
             </div>
          ) : (
            <div className="w-full sm:w-32 h-32 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0 text-emerald-600">
              <Home className="w-8 h-8" />
            </div>
          )}
          
          <div className="flex-1 min-w-0 py-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Where to stay
              </span>
              {hotel.rating && (
                <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/20 px-2 py-0.5 rounded-full">
                  <Star className="w-3 h-3 text-yellow-600 dark:text-yellow-400 fill-yellow-600 dark:fill-yellow-400" />
                  <span className="text-xs font-bold text-yellow-700 dark:text-yellow-500">{hotel.rating}</span>
                </div>
              )}
            </div>
            
            <h4 className="text-lg font-bold text-neutral-900 dark:text-white truncate mb-2">
              {hotel.name}
            </h4>
            
            <div className="flex items-start gap-2 mb-3">
              <MapPin className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">{hotel.address}</p>
            </div>

            {hotel.mapLink && (
              <a 
                href={hotel.mapLink} 
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
    </motion.div>
  );
}
