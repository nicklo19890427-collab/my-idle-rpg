# Changelog

All notable changes to this project will be documented in this file.
## [v0.5.0] - Stage Progression & Scaling

### Added
- Stage Progression & Scaling: Implemented a stage-based system where monster difficulty and rewards scale exponentially as players progress through stages.
- Boss Mechanics: Added boss encounters every 10th stage with significantly increased difficulty and rewards.

## [v0.4.0] - Hero Upgrades & UI Refactor

### Added
- Component-Based Architecture: Fully refactored `app.vue` into modular Vue components (`GameHeader`, `CombatStage`, `BattleLog`, `HeroView`, `BottomNav`) for better maintainability.
- Hero Upgrade System: Added a functional "Hero" tab allowing players to spend Gold to increase Attack and Defense stats.

## [v0.3.0] - Auto-Battle & Visuals

### Added
- Auto-Battle System: Implemented a recurring game loop using a generic composable (`useGameLoop`).
- Visual Combat Feedback: Added CSS keyframe animations for 'shake' effects and floating damage numbers on enemy hits.

## [v0.2.0] - The Game Brain

### Added
- Implemented TypeScript Data Models (`app/types/game.ts`).
- Created Pinia Game Store (`app/stores/gameStore.ts`) with core combat and level-up logic.
- Fully reactive and connected UI using the game state data.


## [v0.1.0] - Initial Skeleton

### Added
- Project initialized using Nuxt 4.
- Configured Tailwind CSS for mobile-first UI.
- Implemented core UI skeleton (Header stats, Combat area, Battle log, and Navigation).
- Established project structure (stores, types, composables).
- **Synchronized local repository to the remote GitHub origin successfully.**
