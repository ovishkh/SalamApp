import React, { useState, useEffect } from 'react';
import { Home, BarChart3, BookOpen, User, Settings } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage = 'home' }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hijriDate, setHijriDate] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Get Hijri date (we'll implement this with an API)
    getHijriDate();

    return () => clearInterval(timer);
  }, []);

  const getHijriDate = async () => {
    try {
      const response = await fetch('/api/hijri-date');
      if (response.ok) {
        const data = await response.json();
        if (data.hijriDate) {
          setHijriDate(data.hijriDate);
        }
      } else {
        throw new Error('Failed to fetch Hijri date');
      }
    } catch (error) {
      console.log('Hijri date not available, using fallback');
      setHijriDate('12 Muharram 1447 AH'); // Fallback date
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const navigationItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'stats', icon: BarChart3, label: 'Stats' },
    { id: 'quran', icon: BookOpen, label: 'Quran' },
    { id: 'learn', icon: User, label: 'Learn' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-gradient-dark text-white islamic-pattern font-sans">
      {/* Status Bar */}
      <div className="sticky top-0 z-50">
        <div className="flex justify-between items-center px-6 py-2 text-xs bg-islamic-deep-950/80 backdrop-blur-md border-b border-islamic-teal-500/10">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-islamic-teal-500 animate-pulse" />
            <span className="font-semibold text-islamic-teal-300 tracking-wider transition-all duration-500 group-hover:text-white">
              {formatTime(currentTime)}
            </span>
          </div>
          <div className="text-sm font-arabic text-islamic-teal-300">
            {hijriDate || 'Loading...'}
          </div>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-islamic-deep-950/40 backdrop-blur-sm border-b border-white/5">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.2em] text-islamic-teal-500/80 font-bold">Current Date</span>
            <span className="text-sm text-islamic-teal-100 font-medium">{formatDate(currentTime)}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-[0.2em] text-islamic-teal-500/80 font-bold">Location</span>
            <span className="text-sm text-islamic-teal-100 font-medium">Dhaka, BD</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 pb-24 px-4 pt-4">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-6 left-4 right-4 z-50">
        <div className="mx-auto max-w-md glass-morphism rounded-2xl border border-white/10 p-2">
          <div className="flex justify-around items-center">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;

              return (
                <button
                  key={item.id}
                  className={`relative flex flex-col items-center py-2 px-4 rounded-xl transition-all duration-300 ${isActive
                      ? 'text-islamic-teal-300'
                      : 'text-gray-500 hover:text-islamic-teal-200 hover:bg-white/5'
                    }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 bg-islamic-teal-500/10 rounded-xl blur-sm" />
                  )}
                  <Icon size={20} className={`relative z-10 transition-transform duration-300 ${isActive ? 'scale-110' : 'scale-100'}`} />
                  <span className="relative z-10 text-[10px] font-bold mt-1 uppercase tracking-wider">{item.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 w-1 h-1 bg-islamic-teal-400 rounded-full shadow-[0_0_8px_rgba(20,184,166,0.8)]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Layout;
