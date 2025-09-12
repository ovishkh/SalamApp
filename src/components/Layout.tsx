import React from 'react';
import { Home, BarChart3, BookOpen, User, Settings } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage = 'home' }) => {
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const currentDate = new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const batteryLevel = 54;
  const signalStrength = 3;

  const navigationItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'stats', icon: BarChart3, label: 'Stats' },
    { id: 'quran', icon: BookOpen, label: 'Quran' },
    { id: 'learn', icon: User, label: 'Learn' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-gradient-dark text-white">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-2 text-sm">
        <span className="font-medium">{currentTime}</span>
        <div className="flex items-center space-x-2">
          {/* Signal Strength */}
          <div className="flex space-x-1">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`w-1 h-3 rounded-sm ${
                  i < signalStrength ? 'bg-white' : 'bg-gray-500'
                }`}
              />
            ))}
          </div>
          {/* WiFi Icon */}
          <div className="w-4 h-4">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.07 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
            </svg>
          </div>
          {/* Battery */}
          <div className="flex items-center space-x-1">
            <div className="w-6 h-3 border border-white rounded-sm">
              <div
                className="h-full bg-white rounded-sm"
                style={{ width: `${batteryLevel}%` }}
              />
            </div>
            <span className="text-xs">{batteryLevel}%</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center px-4 py-2 text-sm">
        <span className="text-gray-300">{currentDate}</span>
        <span className="text-gray-300">Dhaka</span>
      </div>

      {/* Main Content */}
      <main className="flex-1 pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-dark-800 border-t border-dark-700">
        <div className="flex justify-around py-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                className={`flex flex-col items-center space-y-1 py-2 px-3 ${
                  isActive ? 'text-primary-400' : 'text-gray-400'
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
