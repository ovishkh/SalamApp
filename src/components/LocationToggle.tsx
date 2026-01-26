import React, { useState } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { Location } from '../types';

interface LocationToggleProps {
  onLocationChange: (location: Location) => void;
}

const LocationToggle: React.FC<LocationToggleProps> = ({ onLocationChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location>({
    name: 'Dhaka',
    country: 'Bangladesh',
    timezone: 'Asia/Dhaka',
    coordinates: { lat: 23.8103, lng: 90.4125 }
  });

  const locations: Location[] = [
    { name: 'Dhaka', country: 'Bangladesh', timezone: 'Asia/Dhaka', coordinates: { lat: 23.8103, lng: 90.4125 } },
    { name: 'Karachi', country: 'Pakistan', timezone: 'Asia/Karachi', coordinates: { lat: 24.8607, lng: 67.0011 } },
    { name: 'Istanbul', country: 'Turkey', timezone: 'Europe/Istanbul', coordinates: { lat: 41.0082, lng: 28.9784 } },
    { name: 'Dubai', country: 'UAE', timezone: 'Asia/Dubai', coordinates: { lat: 25.2048, lng: 55.2708 } },
    { name: 'London', country: 'UK', timezone: 'Europe/London', coordinates: { lat: 51.5074, lng: -0.1278 } },
    { name: 'New York', country: 'USA', timezone: 'America/New_York', coordinates: { lat: 40.7128, lng: -74.0060 } },
  ];

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    setIsOpen(false);
    onLocationChange(location);
  };

  return (
    <div className="px-4 py-4">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full glass-morphism rounded-2xl p-4 transition-all duration-300 card-hover border border-white/5"
        >
          <div className="flex items-center space-x-3">
            <div className="bg-islamic-teal-500/10 p-2 rounded-lg">
              <MapPin className="w-4 h-4 text-islamic-teal-400" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[10px] uppercase tracking-[0.2em] text-islamic-teal-500 font-bold">Auto Location</span>
              <div className="flex items-center space-x-2">
                <span className="text-white font-bold tracking-wide">{selectedLocation.name}</span>
                <span className="text-gray-500 text-xs font-medium">({selectedLocation.country})</span>
              </div>
            </div>
          </div>
          <div className={`p-2 rounded-full transition-all duration-300 ${isOpen ? 'bg-islamic-teal-500 text-islamic-deep-950 rotate-180' : 'bg-white/5 text-islamic-teal-400'}`}>
            <ChevronDown size={14} />
          </div>
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-4 glass-morphism rounded-3xl border border-white/10 shadow-2xl z-[100] max-h-80 overflow-y-auto no-scrollbar animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="p-2 space-y-1">
              <div className="px-4 py-2">
                <span className="text-[10px] uppercase tracking-[0.3em] text-islamic-teal-500/60 font-bold">Select City</span>
              </div>
              {locations.map((location) => (
                <button
                  key={`${location.name}-${location.country}`}
                  onClick={() => handleLocationSelect(location)}
                  className={`w-full text-left px-4 py-4 rounded-2xl transition-all duration-300 flex items-center justify-between group ${selectedLocation.name === location.name
                      ? 'bg-islamic-teal-500/10 border border-islamic-teal-500/20'
                      : 'hover:bg-white/5'
                    }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${selectedLocation.name === location.name ? 'bg-islamic-teal-400 scale-150 shadow-[0_0_8px_rgba(20,184,166,0.8)]' : 'bg-gray-700'}`} />
                    <div className="flex flex-col">
                      <div className={`font-bold tracking-wide ${selectedLocation.name === location.name ? 'text-islamic-teal-300' : 'text-gray-300 group-hover:text-white'}`}>{location.name}</div>
                      <div className="text-gray-500 text-[10px] font-medium uppercase tracking-widest">{location.country}</div>
                    </div>
                  </div>
                  {selectedLocation.name === location.name && (
                    <div className="px-2 py-0.5 rounded-full bg-islamic-teal-500/20 text-islamic-teal-300 text-[8px] font-bold uppercase tracking-tighter">Current</div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationToggle;
