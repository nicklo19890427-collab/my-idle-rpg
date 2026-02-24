<template>
  <!-- Battle Log Section -->
  <div
    class="h-[30%] shrink-0 bg-slate-950/80 backdrop-blur-sm border-t border-slate-800 p-3 overflow-y-auto flex flex-col">
    <!-- Log Header -->
    <div
      class="flex items-center justify-between mb-2 pb-2 border-b border-slate-800/50 sticky top-0 bg-slate-950/90 shrink-0 z-10">
      <span class="text-[10px] font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-slate-500" fill="none" viewBox="0 0 24 24"
          stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
        Battle Log
      </span>
      <button @click="gameLoop.toggleAutoBattle()"
        class="text-[10px] text-slate-500 flex items-center gap-1.5 bg-slate-900 px-2 py-0.5 rounded-full border border-slate-800 active:scale-95 transition-transform">
        <span class="w-1.5 h-1.5 rounded-full"
          :class="gameLoop.isAutoBattling.value ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'"></span>
        {{ gameLoop.isAutoBattling.value ? 'Auto-Battle Active' : 'Auto-Battle Off' }}
      </button>
    </div>

    <!-- Combat Texts -->
    <div class="space-y-1.5 font-mono text-xs flex-1">
      <template v-for="log in gameStore.logs" :key="log.id">
        <div v-if="log.type === 'reward'"
          class="mt-2 mb-2 p-2 bg-amber-900/20 border border-amber-500/20 rounded text-amber-300 font-medium w-full shadow-inner">
          <p><span class="text-amber-500/50 mr-1">[{{ log.timestamp }}]</span> {{ log.message }}</p>
        </div>
        <p v-else :class="{
          'text-slate-300': log.type === 'attack' || log.type === 'system',
          'text-rose-400': log.type === 'damage',
          'text-indigo-400 font-bold': log.type === 'critical',
          'text-emerald-400': log.type === 'heal'
        }">
          <span class="text-slate-600">[{{ log.timestamp }}]</span> {{ log.message }}
        </p>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '~/stores/gameStore'
import { useGameLoop } from '~/composables/useGameLoop'

const gameStore = useGameStore()
const gameLoop = useGameLoop()
</script>
