import { NextApiRequest, NextApiResponse } from 'next';

interface HijriDateResponse {
  hijriDate: string;
  gregorianDate: string;
  day: string;
  month: string;
  year: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HijriDateResponse | { error: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const today = new Date().toISOString().split('T')[0];
    const response = await fetch(`https://api.aladhan.com/v1/gToH?date=${today}`);
    const data = await response.json();

    if (data.code !== 200) {
      throw new Error('Failed to fetch Hijri date');
    }

    const hijri = data.data.hijri;
    const gregorian = data.data.gregorian;

    const hijriDateResponse: HijriDateResponse = {
      hijriDate: `${hijri.day} ${hijri.month.en} ${hijri.year} AH`,
      gregorianDate: gregorian.date,
      day: hijri.day,
      month: hijri.month.en,
      year: hijri.year,
    };

    res.status(200).json(hijriDateResponse);
  } catch (error) {
    console.error('Error fetching Hijri date:', error);
    res.status(500).json({ error: 'Failed to fetch Hijri date' });
  }
}
