export interface PrayerTime {
  name: string;
  time: string;
  isCurrent?: boolean;
  isNext?: boolean;
}

export interface PrayerTimes {
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

export interface Location {
  name: string;
  country: string;
  timezone: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface PrayerTracker {
  fajr: boolean;
  dhuhr: boolean;
  asr: boolean;
  maghrib: boolean;
  isha: boolean;
}

export interface DailyAyah {
  text: string;
  reference: string;
  surah: string;
  verse: number;
}

export interface Feature {
  id: string;
  name: string;
  icon: string;
  route: string;
}

export interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
  totalMinutes: number;
}