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
    <div className="min-h-screen bg-gradient-dark text-white islamic-pattern">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-3 text-sm bg-gradient-to-r from-islamic-deep-900/50 to-islamic-blue-900/50 backdrop-blur-sm border-b border-islamic-gold-500/20">
        <span className="font-medium text-islamic-gold-300">{formatTime(currentTime)}</span>
        <div className="text-xs text-islamic-gold-200 arabic-text">
          {hijriDate || 'Loading...'}
        </div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 text-sm bg-gradient-to-r from-islamic-green-900/30 to-islamic-blue-900/30 backdrop-blur-sm border-b border-islamic-green-500/20">
        <span className="text-islamic-gold-200">{formatDate(currentTime)}</span>
        <span className="text-islamic-gold-200 font-medium">Dhaka</span>
      </div>

      {/* Main Content */}
      <main className="flex-1 pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-islamic-deep-900 to-islamic-blue-900/80 backdrop-blur-lg border-t border-islamic-gold-500/30 islamic-shadow">
        <div className="flex justify-around py-3">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-all duration-300 ${
                  isActive 
                    ? 'text-islamic-gold-300 golden-glow bg-islamic-green-800/30' 
                    : 'text-islamic-gold-200 hover:text-islamic-gold-300 hover:bg-islamic-green-800/20'
                }`}
              >
                <Icon size={20} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Layout;
