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
    <div className="space-y-6">
      {/* Current Prayer Section */}
      <div className="relative overflow-hidden golden-border rounded-3xl p-8 islamic-shadow geometric-pattern glass-morphism">
        {/* Abstract background decorative element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-islamic-teal-500/10 rounded-full blur-3xl -mr-10 -mt-10" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="px-4 py-1 rounded-full bg-islamic-teal-500/20 border border-islamic-teal-500/30 flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-islamic-teal-400 animate-pulse shadow-[0_0_8px_rgba(20,184,166,0.8)]" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-islamic-teal-300">Active Now</span>
            </div>
            <Bell className="w-5 h-5 text-islamic-teal-400 opacity-60" />
          </div>

          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <h2 className="text-4xl font-bold tracking-tight islamic-title text-white">
              {currentPrayer?.name}
            </h2>
            <div className="text-5xl font-extrabold text-islamic-teal-300 drop-shadow-lg tracking-tight">
              {currentPrayer?.time}
            </div>

            <div className="py-4 flex flex-col items-center">
              <div className="text-[10px] uppercase tracking-[0.3em] text-islamic-teal-500 font-bold mb-2">Next Prayer In</div>
              <div className="text-3xl font-mono font-bold text-white tabular-nums">
                {formatTimeDisplay(timeLeft)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full pt-4 border-t border-white/5">
              <div className="flex flex-col items-center p-3 rounded-2xl bg-white/5 border border-white/5">
                <span className="text-[9px] uppercase tracking-widest text-islamic-teal-400 font-bold mb-1">Suhur</span>
                <span className="text-sm font-bold">04:27 AM</span>
              </div>
              <div className="flex flex-col items-center p-3 rounded-2xl bg-white/5 border border-white/5">
                <span className="text-[9px] uppercase tracking-widest text-islamic-teal-400 font-bold mb-1">Iftar</span>
                <span className="text-sm font-bold">06:05 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {prayerTimes.map((prayer, index) => (
          <div
            key={prayer.name}
            className={`flex items-center justify-between p-5 rounded-2xl transition-all duration-300 card-hover ${prayer.isCurrent
                ? 'bg-islamic-teal-500/10 border border-islamic-teal-500/30 shadow-[0_0_20px_rgba(20,184,166,0.1)]'
                : 'bg-islamic-deep-900/40 border border-white/5'
              }`}
          >
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-lg ${prayer.isCurrent ? 'bg-islamic-teal-500 text-islamic-deep-950' : 'bg-islamic-deep-900 text-islamic-teal-400'}`}>
                <Clock size={16} />
              </div>
              <span className={`font-bold tracking-wide ${prayer.isCurrent ? 'text-islamic-teal-300' : 'text-gray-300'}`}>
                {prayer.name}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`text-lg font-bold tabular-nums ${prayer.isCurrent ? 'text-white' : 'text-gray-400'}`}>
                {prayer.time}
              </span>
              {prayer.isCurrent ? (
                <div className="w-1.5 h-1.5 rounded-full bg-islamic-teal-400 shadow-[0_0_8px_rgba(20,184,166,0.8)]" />
              ) : (
                <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrayerTimes;
