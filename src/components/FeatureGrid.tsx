import React from 'react';
import {
  Clock,
  BookOpen,
  Book,
  Hand,
  Compass,
  CircleDot,
  DollarSign,
  Calendar,
  Users,
  Building,
  Lightbulb,
  Heart
} from 'lucide-react';
import { Feature } from '../types';

const FeatureGrid: React.FC = () => {
  const features: Feature[] = [
    { id: 'prayer-time', name: 'Prayer Time', icon: 'Clock', route: '/prayer-times' },
    { id: 'quran', name: 'Al-Quran', icon: 'BookOpen', route: '/quran' },
    { id: 'hadith', name: 'Hadith', icon: 'Book', route: '/hadith' },
    { id: 'dua', name: 'Dua', icon: 'Hands', route: '/dua' },
    { id: 'qibla', name: 'Qibla', icon: 'Compass', route: '/qibla' },
    { id: 'tasbih', name: 'Tasbih', icon: 'CircleDot', route: '/tasbih' },
    { id: 'zakat', name: 'Zakat', icon: 'DollarSign', route: '/zakat' },
    { id: 'hijri', name: 'Hijri', icon: 'Calendar', route: '/hijri' },
    { id: 'community', name: 'Community', icon: 'Users', route: '/community' },
    { id: 'mosque', name: 'Mosque', icon: 'Building', route: '/mosque' },
    { id: 'kitab', name: 'Kitab', icon: 'Lightbulb', route: '/kitab' },
    { id: 'donate', name: 'Donate', icon: 'Heart', route: '/donate' },
  ];

  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      Clock,
      BookOpen,
      Book,
      Hand,
      Compass,
      CircleDot,
      DollarSign,
      Calendar,
      Users,
      Building,
      Lightbulb,
      Heart,
    };
    return iconMap[iconName] || BookOpen;
  };

  return (
    <div className="px-4 py-8">
      <div className="flex items-center justify-between mb-6 px-1">
        <h3 className="text-[10px] uppercase tracking-[0.3em] text-islamic-teal-500 font-bold">Services & Learning</h3>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-islamic-teal-500/30 to-transparent ml-4" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {features.map((feature) => {
          const IconComponent = getIcon(feature.icon);

          return (
            <button
              key={feature.id}
              className="flex flex-col items-center justify-center space-y-3 p-5 glass-morphism rounded-2xl transition-all duration-300 card-hover group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-islamic-teal-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative w-14 h-14 bg-islamic-deep-950 border border-white/5 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:border-islamic-teal-500/50 group-hover:-translate-y-1">
                  <IconComponent className="w-6 h-6 text-islamic-teal-300 group-hover:text-islamic-teal-100 transition-colors duration-300" />
                </div>
              </div>
              <span className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-widest group-hover:text-islamic-teal-200 transition-colors duration-300">
                {feature.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FeatureGrid;
