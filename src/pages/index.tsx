import React from 'react';
import Layout from '../components/Layout';
import PrayerTimes from '../components/PrayerTimes';
import FeatureGrid from '../components/FeatureGrid';
import PrayerTracker from '../components/PrayerTracker';
import DailyAyah from '../components/DailyAyah';
import LocationToggle from '../components/LocationToggle';

const Home: React.FC = () => {
    return (
        <Layout currentPage="home">
            <div className="min-h-screen">
                {/* Location Toggle */}
                <LocationToggle />
                
                {/* Prayer Times Section */}
                <PrayerTimes />
                
                {/* Feature Grid */}
                <FeatureGrid />
                
                {/* Prayer Tracker */}
                <PrayerTracker />
                
                {/* Daily Ayah */}
                <DailyAyah />
            </div>
        </Layout>
    );
};

export default Home;