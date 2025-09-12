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
    <div className="px-4 mb-6">
      <div className="bg-gradient-card rounded-2xl p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <Quote className="w-8 h-8 text-primary-400" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">Daily Ayah</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-3">
              {dailyAyah.text}
            </p>
            <div className="text-right">
              <span className="text-primary-400 text-sm font-medium">
                {dailyAyah.reference}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyAyah;
