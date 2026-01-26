# DeenApp Architecture

DeenApp is a modern Islamic application built with Next.js, TypeScript, and Tailwind CSS. It focuses on providing a clean, responsive, and feature-rich experience for daily Islamic practices.

## Project Structure

The project follows a standard Next.js directory structure:

- `src/components/`: Reusable React components.
- `src/pages/`: Next.js pages and API routes.
- `src/styles/`: Global CSS and Tailwind configurations.
- `src/types/`: TypeScript interfaces and types.
- `public/`: Static assets like icons and patterns.

## Component Overview

### Core Components

- **Layout**: The main shell of the application, handling the status bar, header, and bottom navigation.
- **PrayerTimes**: Fetches and displays prayer times based on the selected location. Includes a countdown timer for the next prayer.
- **FeatureGrid**: A responsive grid containing links to various app features (Quran, Hadith, Qibla, etc.).
- **PrayerTracker**: Allows users to track their daily prayer performance locally.
- **DailyAyah**: Displays an inspirational verse from the Quran.
- **LocationToggle**: Provides a way for users to switch between predefined locations to update prayer times.

## Data Flow

The application primarily manages state through React Hooks (`useState`, `useEffect`).

1. **Location State**: Managed in `src/pages/index.tsx`, coordinates location throughout the app.
2. **Prayer Times**: Calculated or fetched based on the `selectedLocation`.
3. **Local Storage**: Currently, prayer tracking data is intended to be stored locally (browser storage).

## Technology Stack

- **Next.js**: Framework for server-rendered React applications.
- **TypeScript**: Ensures type safety and improves developer experience.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Lucide React**: Comprehensive icon library for a modern look.
- **Date-fns**: Robust date manipulation and formatting.
