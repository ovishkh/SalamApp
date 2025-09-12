import { NextApiRequest, NextApiResponse } from 'next';

interface PrayerTimesResponse {
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  location: string;
  date: string;
  hijriDate: string;
}

interface AladhanResponse {
  code: number;
  status: string;
  data: {
    timings: {
      Fajr: string;
      Dhuhr: string;
      Asr: string;
      Maghrib: string;
      Isha: string;
    };
    date: {
      hijri: {
        day: string;
        month: {
          en: string;
        };
        year: string;
      };
    };
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PrayerTimesResponse | { error: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { city, country, lat, lng } = req.query;

  if (!city || !country) {
    return res.status(400).json({ error: 'City and country are required' });
  }

  try {
    // Use Aladhan API for prayer times
    const today = new Date().toISOString().split('T')[0];
    const apiUrl = lat && lng 
      ? `https://api.aladhan.com/v1/timings/${today}?latitude=${lat}&longitude=${lng}`
      : `https://api.aladhan.com/v1/timingsByCity/${today}?city=${city}&country=${country}`;

    const response = await fetch(apiUrl);
    const data: AladhanResponse = await response.json();

    if (data.code !== 200) {
      throw new Error('Failed to fetch prayer times');
    }

    const { timings, date } = data.data;
    const hijriDate = `${date.hijri.day} ${date.hijri.month.en} ${date.hijri.year} AH`;

    const prayerTimes: PrayerTimesResponse = {
      fajr: timings.Fajr,
      dhuhr: timings.Dhuhr,
      asr: timings.Asr,
      maghrib: timings.Maghrib,
      isha: timings.Isha,
      location: `${city}, ${country}`,
      date: today,
      hijriDate,
    };

    res.status(200).json(prayerTimes);
  } catch (error) {
    console.error('Error fetching prayer times:', error);
    res.status(500).json({ error: 'Failed to fetch prayer times' });
  }
}
