# My Idle RPG

A fantasy-themed idle/incremental mobile game developed with Nuxt 4, designed to be deployed as a native app on iOS and Android via Capacitor.

## Tech Stack

- **Framework:** Nuxt 4 (SSR: disabled for CSR/Native compatibility)
- **State Management:** Pinia
- **Styling:** Tailwind CSS
- **Mobile Bridge:** Capacitor

## Core Features (Roadmap)

- Automated combat system and offline progression (Idle mechanics).
- Character attribute growth and equipment system.
- Mobile-first responsive UI.
- Integration with native features (e.g., iOS Dynamic Island, Push Notifications).

## Development Commands

- **Install dependencies:** `npm install`
- **Local development:** `npm run dev`
- **Static generation (for mobile build):** `npm run generate`

## Current Status

- Alpha v0.5.0 - Core Gameplay Loop & Progression Implemented.
  - Component-Based Architecture: Fully refactored into modular Vue components (`GameHeader`, `CombatStage`, `BattleLog`, `HeroView`, `BottomNav`) for better maintainability.
  - Auto-Battle System: Implemented a recurring game loop with visual combat feedback (shake effects and floating damage numbers).
  - Hero Upgrade System: A functional "Hero" tab allowing players to spend Gold to increase Attack and Defense stats.
  - Stage Progression & Scaling: Implemented a stage-based system where monster difficulty and rewards scale exponentially as players progress through stages.
