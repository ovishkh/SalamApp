import React, { useState, useEffect } from 'react';
import { Bell, Clock } from 'lucide-react';
import { PrayerTime, TimeLeft, Location } from '../types';

interface PrayerTimesData {
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  location: string;
  date: string;
  hijriDate: string;
}

interface PrayerTimesProps {
  location: Location;
}

const PrayerTimes: React.FC<PrayerTimesProps> = ({ location }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 0, minutes: 13, seconds: 11, totalMinutes: 13 });
  const [prayerTimesData, setPrayerTimesData] = useState<PrayerTimesData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrayerTimes();
  }, [location]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      updateTimeLeft();
    }, 1000);

    return () => clearInterval(timer);
  }, [prayerTimesData]);

  const fetchPrayerTimes = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/prayer-times?city=${location.name}&country=${location.country}&lat=${location.coordinates.lat}&lng=${location.coordinates.lng}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setPrayerTimesData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching prayer times:', error);
      setLoading(false);
      // Set fallback prayer times
      setPrayerTimesData({
        fajr: '04:28',
        dhuhr: '11:56',
        asr: '16:21',
        maghrib: '18:05',
        isha: '19:21',
        location: `${location.name}, ${location.country}`,
        date: new Date().toISOString().split('T')[0],
        hijriDate: '12 Muharram 1447 AH'
      });
    }
  };

  const updateTimeLeft = () => {
    if (!prayerTimesData) return;

    const now = new Date();
    const today = now.toDateString();
    
    const prayers = [
      { name: 'Fajr', time: new Date(`${today} ${prayerTimesData.fajr}`) },
      { name: 'Dhuhr', time: new Date(`${today} ${prayerTimesData.dhuhr}`) },
      { name: 'Asr', time: new Date(`${today} ${prayerTimesData.asr}`) },
      { name: 'Maghrib', time: new Date(`${today} ${prayerTimesData.maghrib}`) },
      { name: 'Isha', time: new Date(`${today} ${prayerTimesData.isha}`) },
    ];

    // Find the next prayer time
    const nextPrayer = prayers.find(prayer => prayer.time > now);
    if (nextPrayer) {
      const timeDiff = nextPrayer.time.getTime() - now.getTime();
      if (timeDiff > 0) {
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        
        setTimeLeft({ hours, minutes, seconds, totalMinutes: Math.floor(timeDiff / (1000 * 60)) });
      }
    } else {
      // If no prayer found for today, use first prayer of next day
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = tomorrow.toDateString();
      
      const firstPrayerTomorrow = new Date(`${tomorrowStr} ${prayerTimesData.fajr}`);
      const timeDiff = firstPrayerTomorrow.getTime() - now.getTime();
      
      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
      
      setTimeLeft({ hours, minutes, seconds, totalMinutes: Math.floor(timeDiff / (1000 * 60)) });
    }
  };

  const formatPrayerTime = (time: string) => {
    const [timePart, period] = time.split(' ');
    const [hours, minutes] = timePart.split(':');
    const hour24 = period === 'AM' ? parseInt(hours) : parseInt(hours) + 12;
    return `${hour24.toString().padStart(2, '0')}:${minutes}`;
  };

  if (loading) {
    return (
      <div className="px-4 py-6">
        <div className="gradient-card rounded-2xl p-6 text-center islamic-shadow">
          <div className="animate-pulse text-islamic-gold-300">Loading prayer times...</div>
        </div>
      </div>
    );
  }

  if (!prayerTimesData) {
    return (
      <div className="px-4 py-6">
        <div className="gradient-card rounded-2xl p-6 text-center islamic-shadow">
          <div className="text-red-400">Failed to load prayer times</div>
        </div>
      </div>
    );
  }

  const getCurrentPrayer = () => {
    if (!prayerTimesData) return null;
    
    const now = new Date();
    const today = now.toDateString();
    
    const prayers = [
      { name: 'Fajr', time: new Date(`${today} ${prayerTimesData.fajr}`) },
      { name: 'Dhuhr', time: new Date(`${today} ${prayerTimesData.dhuhr}`) },
      { name: 'Asr', time: new Date(`${today} ${prayerTimesData.asr}`) },
      { name: 'Maghrib', time: new Date(`${today} ${prayerTimesData.maghrib}`) },
      { name: 'Isha', time: new Date(`${today} ${prayerTimesData.isha}`) },
    ];

    // Find current prayer (the one that just passed or is currently active)
    const currentPrayer = prayers.find((prayer, index) => {
      const nextPrayer = prayers[index + 1];
      return prayer.time <= now && (!nextPrayer || nextPrayer.time > now);
    });

    return currentPrayer?.name || 'Fajr';
  };

  const prayerTimes: PrayerTime[] = [
    { name: 'Fajr', time: prayerTimesData.fajr, isCurrent: getCurrentPrayer() === 'Fajr' },
    { name: 'Dhuhr', time: prayerTimesData.dhuhr, isCurrent: getCurrentPrayer() === 'Dhuhr' },
    { name: 'Asr', time: prayerTimesData.asr, isCurrent: getCurrentPrayer() === 'Asr' },
    { name: 'Maghrib', time: prayerTimesData.maghrib, isCurrent: getCurrentPrayer() === 'Maghrib' },
    { name: 'Isha', time: prayerTimesData.isha, isCurrent: getCurrentPrayer() === 'Isha' },
  ];

  const currentPrayer = prayerTimes.find(prayer => prayer.isCurrent);
  const nextPrayer = prayerTimes.find(prayer => prayer.isNext);

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
      <div className="gradient-card rounded-2xl p-6 mb-6 islamic-shadow geometric-pattern">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-islamic-gold-400 golden-glow" />
            <span className="text-sm text-islamic-gold-200">Now :</span>
            <span className="text-lg font-semibold text-white islamic-title">
              {currentPrayer?.name}
            </span>
            <div className="w-2 h-2 bg-islamic-green-400 rounded-full green-glow"></div>
          </div>
        </div>

        <div className="flex justify-between items-start mb-4">
          <div className="space-y-2">
            <div className="text-2xl font-bold text-white islamic-title">
              {currentPrayer?.time} (Start time)
            </div>
            <div className="text-sm text-islamic-gold-200">
              {formatTimeLeft(timeLeft)}
            </div>
            <div className="text-sm text-islamic-gold-200">
              Suhur: 4:27 AM
            </div>
            <div className="text-sm text-islamic-gold-200">
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
                className="text-islamic-deep-700"
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
                className="text-islamic-gold-400"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-xs text-islamic-gold-300">Time</div>
              <div className="text-sm font-bold text-white islamic-title">
                {formatTimeDisplay(timeLeft)}
              </div>
              <div className="text-xs text-islamic-gold-300">Left</div>
            </div>
          </div>
        </div>
      </div>

      {/* Prayer Times List */}
      <div className="gradient-card rounded-2xl p-4 mb-6 islamic-shadow">
        <div className="flex justify-between items-center">
          {prayerTimes.map((prayer, index) => (
            <div key={prayer.name} className="flex flex-col items-center space-y-2">
              <div className={`w-2 h-2 rounded-full ${
                prayer.isCurrent ? 'bg-islamic-gold-400 golden-glow' : 'bg-islamic-deep-500'
              }`} />
              <div className="text-center">
                <div className="text-xs text-islamic-gold-200">{prayer.name}</div>
                <div className="text-sm font-semibold text-white islamic-title">{prayer.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrayerTimes;
