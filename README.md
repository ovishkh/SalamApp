# DeenApp - Islamic Prayer & Learning App

## Overview
DeenApp is a comprehensive Next.js Islamic application designed to provide Muslims with essential tools for daily worship and learning. The app features prayer times, Quran reading, Hadith collection, Dua library, Qibla direction, and much more in a beautiful, modern interface.

## Features

### 🕌 Core Features
- **Prayer Times**: Real-time prayer times with countdown timers
- **Prayer Tracker**: Track your daily prayers with completion status
- **Qibla Direction**: Find the direction of Kaaba from anywhere
- **Daily Ayah**: Inspirational verses from the Quran
- **Tasbih Counter**: Digital prayer beads for dhikr
- **Hijri Calendar**: Islamic calendar integration

### 📚 Learning & Knowledge
- **Al-Quran**: Complete Quran with translation and tafsir
- **Hadith Collection**: Authentic hadiths with search functionality
- **Dua Library**: Comprehensive collection of supplications
- **Islamic Knowledge**: Educational content and articles

### 🌍 Community & Social
- **Community Features**: Connect with fellow Muslims
- **Mosque Finder**: Locate nearby mosques
- **Donation Platform**: Support Islamic causes
- **Zakat Calculator**: Calculate your zakat obligations

## Project Structure
```
DeenApp/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Layout.tsx       # Main app layout with navigation
│   │   ├── PrayerTimes.tsx  # Prayer times display and countdown
│   │   ├── FeatureGrid.tsx  # 12-feature grid layout
│   │   ├── PrayerTracker.tsx # Prayer completion tracker
│   │   ├── DailyAyah.tsx    # Daily verse display
│   │   └── LocationToggle.tsx # Location selection
│   ├── pages/
│   │   └── index.tsx        # Main homepage
│   ├── styles/
│   │   └── globals.css      # Global styles and Tailwind imports
│   └── types/
│       └── index.ts         # TypeScript type definitions
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project documentation
```

## Tech Stack
- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom dark theme
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **State Management**: React Hooks
- **Responsive Design**: Mobile-first approach

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone git@github.com:ovishkh/DeenApp.git
   cd DeenApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application.

## Usage Guidelines

### Prayer Times
- View current prayer time with countdown timer
- Toggle between different locations
- Track prayer completion status
- View fasting times (Suhur/Iftar)

### Feature Navigation
- Access 12 core Islamic features through the grid
- Each feature is designed for specific Islamic needs
- Responsive design works on all devices

### Location Management
- Select from predefined locations
- Prayer times automatically update based on location
- Easy location switching with dropdown

## Changelog

### Version 1.0.0 (Latest) - Complete App Implementation
**Release Date**: September 12, 2025

#### ✨ New Features
- **Complete UI Implementation**: Full recreation of the mobile app interface
- **Prayer Times System**: Real-time prayer times with countdown timers
- **Feature Grid**: 12 comprehensive Islamic app features
- **Prayer Tracker**: Daily prayer completion tracking
- **Location Toggle**: Multi-location support for prayer times
- **Daily Ayah**: Inspirational Quranic verses
- **Responsive Design**: Mobile-first approach with modern UI

#### 🎨 UI/UX Improvements
- **Dark Theme**: Beautiful dark blue gradient theme
- **Modern Layout**: Status bar, navigation, and card-based design
- **Interactive Elements**: Hover effects and smooth transitions
- **Typography**: Clean, readable fonts with proper hierarchy
- **Icons**: Comprehensive icon set using Lucide React

#### 🛠️ Technical Improvements
- **TypeScript Integration**: Full type safety throughout the app
- **Tailwind CSS**: Modern utility-first styling
- **Component Architecture**: Modular, reusable components
- **Performance**: Optimized rendering and state management
- **Code Quality**: Clean, maintainable code structure

#### 📱 Mobile Features
- **Status Bar**: Battery, signal, and time display
- **Bottom Navigation**: 5-tab navigation system
- **Touch-Friendly**: Optimized for mobile interactions
- **Responsive Grid**: Adaptive layout for different screen sizes

#### 🔧 Dependencies Added
- `lucide-react`: Modern icon library
- `date-fns`: Date manipulation utilities
- `tailwindcss`: Utility-first CSS framework
- `clsx`: Conditional class name utility

#### 📁 File Structure
- Created comprehensive component library
- Added global styles with custom theme
- Implemented TypeScript interfaces
- Set up Tailwind CSS configuration

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

### Development Guidelines
1. Follow TypeScript best practices
2. Use Tailwind CSS for styling
3. Maintain component modularity
4. Test on mobile devices
5. Follow Islamic design principles

## License
This project is licensed under the MIT License.

## Support
For support, feature requests, or bug reports, please open an issue on GitHub.

---

**Made with ❤️ for the Muslim community**