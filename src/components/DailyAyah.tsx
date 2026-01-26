import React from 'react';
import { Quote } from 'lucide-react';

const DailyAyah: React.FC = () => {
  const dailyAyah = {
    text: "And it is He who created the heavens and earth in truth. And the day He says, 'Be,' and it is, His word is the truth. And His is the dominion [on] the day the Horn is blown. [He is] Knower of the unseen and the witnessed; and He is the Wise, the Acquainted.",
    reference: "Ayah - 24 : 48",
    surah: "Al-An'am",
    verse: 48
  };

  return (
    <div className="px-4 py-6">
      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="text-[10px] uppercase tracking-[0.3em] text-islamic-teal-500 font-bold">Daily Revelation</h3>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-islamic-teal-500/30 to-transparent ml-4" />
      </div>

      <div className="relative overflow-hidden glass-morphism rounded-3xl p-8 islamic-shadow geometric-pattern">
        {/* Background decorative element */}
        <div className="absolute top-0 left-0 w-24 h-24 bg-islamic-teal-500/5 rounded-full blur-2xl -ml-12 -mt-12" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <Quote className="w-8 h-8 text-islamic-teal-400/40 mb-6" />

          <p className="text-xl font-medium text-white leading-relaxed mb-6 italic font-serif">
            "{dailyAyah.text}"
          </p>

          <div className="flex items-center space-x-4">
            <div className="h-[1px] w-8 bg-islamic-teal-500/30" />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-islamic-teal-300 tracking-wider">
                {dailyAyah.surah}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-islamic-teal-500 font-bold">
                {dailyAyah.reference}
              </span>
            </div>
            <div className="h-[1px] w-8 bg-islamic-teal-500/30" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyAyah;
