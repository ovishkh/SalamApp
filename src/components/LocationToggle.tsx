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
    <div className="px-4 mb-4">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full bg-gradient-card rounded-xl p-3 hover:bg-opacity-80 transition-all duration-200"
        >
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-primary-400" />
            <span className="text-white font-medium">{selectedLocation.name}</span>
            <span className="text-gray-400 text-sm">({selectedLocation.country})</span>
          </div>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-dark-800 rounded-xl border border-dark-700 shadow-lg z-50 max-h-60 overflow-y-auto">
            {locations.map((location) => (
              <button
                key={`${location.name}-${location.country}`}
                onClick={() => handleLocationSelect(location)}
                className={`w-full text-left px-4 py-3 hover:bg-dark-700 transition-colors duration-200 ${
                  selectedLocation.name === location.name ? 'bg-primary-500 bg-opacity-20' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">{location.name}</div>
                    <div className="text-gray-400 text-sm">{location.country}</div>
                  </div>
                  {selectedLocation.name === location.name && (
                    <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationToggle;
