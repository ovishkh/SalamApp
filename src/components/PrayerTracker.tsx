import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { PrayerTracker as PrayerTrackerType } from '../types';

const PrayerTracker: React.FC = () => {
  const [tracker, setTracker] = useState<PrayerTrackerType>({
    fajr: false,
    dhuhr: false,
    asr: false,
    maghrib: false,
    isha: false,
  });

  const prayers = [
    { key: 'fajr' as keyof PrayerTrackerType, name: 'Fajr' },
    { key: 'dhuhr' as keyof PrayerTrackerType, name: 'Duhr' },
    { key: 'asr' as keyof PrayerTrackerType, name: 'Asr' },
    { key: 'maghrib' as keyof PrayerTrackerType, name: 'Maghrib' },
    { key: 'isha' as keyof PrayerTrackerType, name: 'Isha' },
  ];

  const togglePrayer = (prayerKey: keyof PrayerTrackerType) => {
    setTracker(prev => ({
      ...prev,
      [prayerKey]: !prev[prayerKey]
    }));
  };

  return (
    <div className="px-4 py-8">
      <div className="flex items-center justify-between mb-6 px-1">
        <h3 className="text-[10px] uppercase tracking-[0.3em] text-islamic-gold-500 font-bold">Prayer Performance</h3>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-islamic-gold-500/30 to-transparent ml-4" />
      </div>

      <div className="glass-morphism rounded-3xl p-6 islamic-shadow overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-islamic-green-500/5 rounded-full blur-3xl -mr-16 -mt-16" />

        <div className="relative z-10 flex space-x-3 overflow-x-auto pb-4 no-scrollbar">
          {prayers.map((prayer) => (
            <button
              key={prayer.key}
              onClick={() => togglePrayer(prayer.key)}
              className={`flex flex-col items-center justify-center min-w-[80px] aspect-square rounded-2xl transition-all duration-500 ${tracker[prayer.key]
                  ? 'bg-islamic-green-500/20 border border-islamic-green-500/50 text-white shadow-[0_0_15px_rgba(74,222,128,0.1)]'
                  : 'bg-islamic-deep-900/50 border border-white/5 text-gray-500 hover:border-white/10'
                }`}
            >
              <div className={`p-2 rounded-full mb-2 transition-transform duration-300 ${tracker[prayer.key] ? 'bg-islamic-green-500 text-islamic-deep-900 scale-110 shadow-lg' : 'bg-islamic-deep-800 text-gray-600'}`}>
                {tracker[prayer.key] ? (
                  <CheckCircle className="w-5 h-5 font-bold" />
                ) : (
                  <div className="w-5 h-5 flex items-center justify-center font-bold text-xs">?</div>
                )}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${tracker[prayer.key] ? 'text-islamic-green-300' : 'text-gray-600'}`}>
                {prayer.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrayerTracker;
