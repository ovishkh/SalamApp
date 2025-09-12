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
      <div className="bg-gradient-card rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Prayer Tracker</h2>
        
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {prayers.map((prayer) => (
            <button
              key={prayer.key}
              onClick={() => togglePrayer(prayer.key)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-full whitespace-nowrap transition-all duration-200 ${
                tracker[prayer.key]
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
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
