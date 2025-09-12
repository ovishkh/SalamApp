import React, { useState } from 'react';
import Layout from '../components/Layout';
import PrayerTimes from '../components/PrayerTimes';
import FeatureGrid from '../components/FeatureGrid';
import PrayerTracker from '../components/PrayerTracker';
import DailyAyah from '../components/DailyAyah';
import LocationToggle from '../components/LocationToggle';
import ErrorBoundary from '../components/ErrorBoundary';
import { Location } from '../types';

const Home: React.FC = () => {
    const [selectedLocation, setSelectedLocation] = useState<Location>({
        name: 'Dhaka',
        country: 'Bangladesh',
        timezone: 'Asia/Dhaka',
        coordinates: { lat: 23.8103, lng: 90.4125 }
    });

    const handleLocationChange = (location: Location) => {
        setSelectedLocation(location);
    };

    return (
        <ErrorBoundary>
            <Layout currentPage="home">
                <div className="min-h-screen">
                    {/* Location Toggle */}
                    <LocationToggle onLocationChange={handleLocationChange} />
                    
                    {/* Prayer Times Section */}
                    <PrayerTimes location={selectedLocation} />
                    
                    {/* Feature Grid */}
                    <FeatureGrid />
                    
                    {/* Prayer Tracker */}
                    <PrayerTracker />
                    
                    {/* Daily Ayah */}
                    <DailyAyah />
                </div>
            </Layout>
        </ErrorBoundary>
    );
};

export default Home;