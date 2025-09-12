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
    <div className="px-4 mb-6">
      <div className="gradient-card rounded-2xl p-6 islamic-shadow">
        <h2 className="text-lg font-semibold text-white mb-4 islamic-title">Prayer Tracker</h2>
        
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {prayers.map((prayer) => (
            <button
              key={prayer.key}
              onClick={() => togglePrayer(prayer.key)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-full whitespace-nowrap transition-all duration-300 ${
                tracker[prayer.key]
                  ? 'bg-gradient-to-r from-islamic-green-600 to-islamic-green-700 text-white green-glow'
                  : 'bg-gradient-to-r from-islamic-deep-700 to-islamic-deep-800 text-islamic-gold-200 hover:from-islamic-deep-600 hover:to-islamic-deep-700 hover:text-white'
              }`}
            >
              {tracker[prayer.key] ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <span className="text-lg font-bold">!</span>
              )}
              <span className="font-medium">{prayer.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrayerTracker;
