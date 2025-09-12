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
    <div className="px-4 mb-6">
      <div className="grid grid-cols-4 gap-4">
        {features.map((feature) => {
          const IconComponent = getIcon(feature.icon);
          
          return (
            <button
              key={feature.id}
              className="flex flex-col items-center space-y-2 p-4 gradient-card rounded-2xl hover:bg-opacity-80 transition-all duration-300 islamic-shadow hover:golden-glow group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-islamic-green-600 to-islamic-green-700 rounded-full flex items-center justify-center group-hover:from-islamic-gold-500 group-hover:to-islamic-gold-600 transition-all duration-300">
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs text-center text-islamic-gold-200 font-medium group-hover:text-white transition-colors duration-300">
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
