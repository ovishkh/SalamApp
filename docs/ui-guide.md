# DeenApp UI Guide

This guide outlines the design principles and UI components used in DeenApp to achieve an "Elegant, Professional, and Islamic" aesthetic.

## Design Philosophy

DeenApp's design is inspired by modern digital experiences combined with traditional Islamic aesthetic elements. The goal is to create a serene, focused, and premium interface.

## Color Palette

The app uses a curated Islamic-themed color palette defined in `tailwind.config.js`:

- **Deep Blue (`islamic-deep`)**: Used for backgrounds and main surfaces, providing a calm and professional feel.
- **Islamic Green (`islamic-green`)**: Symbolizing life and peace, used for primary actions and highlights.
- **Gold (`islamic-gold`)**: Used for accents, typography highlights, and "premium" elements, reflecting traditional Islamic art.
- **Vibrant Blue (`islamic-blue`)**: Used for secondary highlights and gradients.

## Typography

- **Inter**: The primary sans-serif font for professional and readable English text.
- **Amiri / Scheherazade New**: Specialized Arabic fonts designed for beautiful Quranic and religious text rendering.
- **Noto Sans Arabic**: A modern Arabic font for UI elements and descriptions.

## Islamic Elements

- **Geometric Patterns**: CSS-based subtle patterns (e.g., `islamic-pattern`, `geometric-pattern`) are used in backgrounds to provide depth and cultural context.
- **Glassmorphism**: Components often use semi-transparent backgrounds with blur effects (`backdrop-blur`) to create a modern, layered feel.
- **Glow Effects**: `golden-glow` and `green-glow` are used sparingly to highlight active states or important information.

## Component Specifications

### Cards
- Border Radius: `rounded-2xl`
- Background: `gradient-card` (semi-transparent)
- Shadow: `islamic-shadow`

### Navigation
- Bottom Nav: Fixed at the base, uses `backdrop-blur-lg` for a premium feel.
- Status Bar: Minimal, providing essential info like time and Hijri date.

### Icons
- Primarily using `Lucide React` with a stroke width of 1.5 - 2 for a clean, consistent look.
