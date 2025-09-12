import React, { useState, useEffect } from 'react';
import { Bell, Clock } from 'lucide-react';
import { PrayerTime, TimeLeft } from '../types';

const PrayerTimes: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 0, minutes: 13, seconds: 11, totalMinutes: 13 });

  // Sample prayer times data
  const prayerTimes: PrayerTime[] = [
    { name: 'Fajr', time: '4:28 AM', isCurrent: false },
    { name: 'Dhuhr', time: '11:56 AM', isCurrent: false },
    { name: 'Asr', time: '4:21 PM', isCurrent: false },
    { name: 'Maghrib', time: '6:05 PM', isCurrent: true },
    { name: 'Isha', time: '7:21 PM', isCurrent: false },
  ];

  const currentPrayer = prayerTimes.find(prayer => prayer.isCurrent);
  const nextPrayer = prayerTimes.find(prayer => prayer.isNext);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Update time left logic here
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTimeLeft = (timeLeft: TimeLeft) => {
    const { hours, minutes, seconds } = timeLeft;
    if (hours > 0) {
      return `${hours} hour ${minutes}.${seconds.toString().padStart(2, '0')} min left (Approx)`;
    }
    return `${minutes}.${seconds.toString().padStart(2, '0')} min left (Approx)`;
  };

  const formatTimeDisplay = (timeLeft: TimeLeft) => {
    const { hours, minutes, seconds } = timeLeft;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const calculateProgress = () => {
    // This would be calculated based on actual prayer times
    return 75; // 75% progress for demo
  };

  return (
    <div className="px-4 py-6">
      {/* Current Prayer Section */}
      <div className="bg-gradient-card rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-primary-400" />
            <span className="text-sm text-gray-300">Now :</span>
            <span className="text-lg font-semibold text-white">
              {currentPrayer?.name}
            </span>
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          </div>
        </div>

        <div className="flex justify-between items-start mb-4">
          <div className="space-y-2">
            <div className="text-2xl font-bold text-white">
              {currentPrayer?.time} (Start time)
            </div>
            <div className="text-sm text-gray-300">
              {formatTimeLeft(timeLeft)}
            </div>
            <div className="text-sm text-gray-300">
              Suhur: 4:27 AM
            </div>
            <div className="text-sm text-gray-300">
              Iftar: 6:05 PM
            </div>
          </div>

          {/* Circular Progress */}
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-gray-700"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - calculateProgress() / 100)}`}
                className="text-white"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-xs text-gray-400">Time</div>
              <div className="text-sm font-bold text-white">
                {formatTimeDisplay(timeLeft)}
              </div>
              <div className="text-xs text-gray-400">Left</div>
            </div>
          </div>
        </div>
      </div>

      {/* Prayer Times List */}
      <div className="bg-gradient-card rounded-2xl p-4 mb-6">
        <div className="flex justify-between items-center">
          {prayerTimes.map((prayer, index) => (
            <div key={prayer.name} className="flex flex-col items-center space-y-2">
              <div className={`w-2 h-2 rounded-full ${
                prayer.isCurrent ? 'bg-white' : 'bg-gray-500'
              }`} />
              <div className="text-center">
                <div className="text-xs text-gray-300">{prayer.name}</div>
                <div className="text-sm font-semibold text-white">{prayer.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrayerTimes;
