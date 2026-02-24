<template>
  <!-- Top Header (Status Bar) -->
  <header class="pt-[env(safe-area-inset-top,1rem)] bg-slate-900 border-b border-slate-800 shrink-0 z-10">
    <!-- Stats Row -->
    <div class="flex items-center justify-between px-4 py-3">
      <!-- Level & Identity -->
      <div class="flex items-center gap-3">
        <div
          class="bg-indigo-900 border border-indigo-500 rounded-full h-11 w-11 flex items-center justify-center font-bold text-lg shadow-sm shadow-indigo-500/50">
          {{ gameStore.player.level }}
        </div>
        <div class="flex flex-col">
          <span class="text-xs text-slate-400 font-semibold uppercase tracking-wider">Hero</span>
          <span class="text-sm font-bold text-indigo-300 leading-none">Lvl</span>
        </div>
      </div>

      <!-- Resources Container -->
      <div class="flex items-center gap-2">
        <!-- Gold -->
        <div class="bg-slate-800/80 rounded-full pl-2 pr-3 py-1 flex items-center gap-2 border border-slate-700/50">
          <span
            class="bg-amber-500/20 text-amber-400 rounded-full w-6 h-6 flex items-center justify-center text-xs">🪙</span>
          <span class="font-mono font-medium text-amber-50 text-sm">{{ gameStore.player.gold }}</span>
        </div>
        <!-- Gems -->
        <div class="bg-slate-800/80 rounded-full pl-2 pr-3 py-1 flex items-center gap-2 border border-slate-700/50">
          <span
            class="bg-emerald-500/20 text-emerald-400 rounded-full w-6 h-6 flex items-center justify-center text-xs">💎</span>
          <span class="font-mono font-medium text-emerald-50 text-sm">{{ gameStore.player.diamonds }}</span>
        </div>
      </div>
    </div>

    <!-- Experience Bar -->
    <div class="px-4 pb-3">
      <div class="h-2 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700 relative">
        <div :style="{ width: `${Math.min(100, (gameStore.player.currentExp / gameStore.player.requiredExp) * 100)}%` }"
          class="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full relative transition-all duration-300">
          <div class="absolute inset-0 bg-white/20 animate-pulse"></div>
        </div>
      </div>
      <div class="flex justify-between mt-1 px-1">
        <span class="text-[10px] text-slate-500 font-medium">EXP</span>
        <span class="text-[10px] text-slate-400 font-mono">{{ gameStore.player.currentExp }} / {{
          gameStore.player.requiredExp }}</span>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useGameStore } from '~/stores/gameStore'

const gameStore = useGameStore()
</script>
