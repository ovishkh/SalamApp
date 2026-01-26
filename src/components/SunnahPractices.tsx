import React, { useState } from 'react';
import { Heart, CheckCircle } from 'lucide-react';

interface Sunnah {
    id: string;
    name: string;
    description: string;
    category: 'Daily' | 'Food' | 'Social' | 'Prayer';
}

const SunnahPractices: React.FC = () => {
    const sunnahs: Sunnah[] = [
        { id: 'miswak', name: 'Using Miswak', description: 'Clean your teeth with a miswak before prayer.', category: 'Daily' },
        { id: 'right-hand', name: 'Right Hand', description: 'Eat and drink with your right hand.', category: 'Food' },
        { id: 'salam', name: 'Giving Salam', description: 'Greet fellow Muslims with As-salamu alaykum.', category: 'Social' },
        { id: 'dhikr', name: 'Morning Dhikr', description: 'Remember Allah after Fajr prayer.', category: 'Prayer' },
    ];

    const [completed, setCompleted] = useState<string[]>([]);

    const toggleSunnah = (id: string) => {
        setCompleted(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    return (
        <div className="px-4 py-8">
            <div className="flex items-center justify-between mb-6 px-1">
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-islamic-teal-500 font-bold">Sunnah Practices</h3>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-islamic-teal-500/30 to-transparent ml-4" />
            </div>

            <div className="grid grid-cols-1 gap-4">
                {sunnahs.map((sunnah) => (
                    <button
                        key={sunnah.id}
                        onClick={() => toggleSunnah(sunnah.id)}
                        className={`flex items-center space-x-4 p-5 rounded-3xl transition-all duration-300 card-hover ${completed.includes(sunnah.id)
                            ? 'bg-islamic-teal-500/10 border border-islamic-teal-500/30'
                            : 'glass-morphism border border-white/5'
                            }`}
                    >
                        <div className={`p-3 rounded-2xl transition-all duration-300 ${completed.includes(sunnah.id)
                            ? 'bg-islamic-teal-500 text-islamic-deep-950 scale-110'
                            : 'bg-islamic-deep-900 text-islamic-teal-400'
                            }`}>
                            {completed.includes(sunnah.id) ? <CheckCircle size={20} /> : <Heart size={20} />}
                        </div>
                        <div className="flex-1 text-left">
                            <div className="flex items-center justify-between mb-1">
                                <span className={`font-bold tracking-wide ${completed.includes(sunnah.id) ? 'text-islamic-teal-300' : 'text-white'}`}>
                                    {sunnah.name}
                                </span>
                                <span className="text-[8px] uppercase tracking-widest px-2 py-1 rounded-full bg-white/5 text-gray-500 font-bold">
                                    {sunnah.category}
                                </span>
                            </div>
                            <p className="text-xs text-gray-400 line-clamp-1">{sunnah.description}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SunnahPractices;
