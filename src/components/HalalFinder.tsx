import React, { useState } from 'react';
import { Search, MapPin, Star, Phone } from 'lucide-react';

interface Restaurant {
    id: string;
    name: string;
    category: string;
    rating: number;
    distance: string;
    address: string;
    phone: string;
}

const HalalFinder: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const restaurants: Restaurant[] = [
        { id: '1', name: 'Al-Madina Grill', category: 'Middle Eastern', rating: 4.8, distance: '0.5 km', address: '123 Halal St, Dhaka', phone: '+880 123456789' },
        { id: '2', name: 'Istanbul Kebab', category: 'Turkish', rating: 4.5, distance: '1.2 km', address: '45 Blue Ave, Dhaka', phone: '+880 987654321' },
        { id: '3', name: 'Desert Oasis', category: 'Arabian', rating: 4.2, distance: '2.5 km', address: '78 Green Rd, Dhaka', phone: '+880 112233445' },
    ];

    const filteredRestaurants = restaurants.filter(r =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="px-4 py-8">
            <div className="flex items-center justify-between mb-6 px-1">
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-islamic-teal-500 font-bold">Halal Finder</h3>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-islamic-teal-500/30 to-transparent ml-4" />
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-500" />
                </div>
                <input
                    type="text"
                    placeholder="Search restaurants or cuisines..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-islamic-deep-950/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-islamic-teal-500/50 transition-all duration-300"
                />
            </div>

            <div className="space-y-4">
                {filteredRestaurants.map((restaurant) => (
                    <div key={restaurant.id} className="glass-morphism rounded-3xl p-6 border border-white/5 card-hover">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 className="text-lg font-bold text-white mb-1">{restaurant.name}</h4>
                                <div className="flex items-center space-x-2 text-xs text-gray-400">
                                    <span className="px-2 py-0.5 rounded-full bg-islamic-teal-500/10 text-islamic-teal-300 font-bold uppercase tracking-widest">{restaurant.category}</span>
                                    <span>•</span>
                                    <span>{restaurant.distance}</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-1 px-2 py-1 rounded-lg bg-islamic-gold-500/10 text-islamic-gold-300">
                                <Star size={12} fill="currentColor" />
                                <span className="text-xs font-bold">{restaurant.rating}</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center space-x-3 text-xs text-gray-400">
                                <MapPin size={14} className="text-islamic-teal-500/60" />
                                <span>{restaurant.address}</span>
                            </div>
                            <div className="flex items-center space-x-3 text-xs text-gray-400">
                                <Phone size={14} className="text-islamic-teal-500/60" />
                                <span>{restaurant.phone}</span>
                            </div>
                        </div>

                        <button className="w-full mt-6 py-3 rounded-xl bg-islamic-teal-500 text-islamic-deep-950 text-xs font-bold uppercase tracking-widest hover:bg-islamic-teal-400 transition-all duration-300 shadow-lg shadow-islamic-teal-500/20">
                            Get Directions
                        </button>
                    </div>
                ))}
                {filteredRestaurants.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-sm">No restaurants found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HalalFinder;
