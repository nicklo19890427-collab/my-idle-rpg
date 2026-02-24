<template>
  <div class="h-screen w-full bg-black flex justify-center items-center font-sans overflow-hidden">
    <!-- Mobile Container -->
    <div
      class="h-full w-full max-w-md bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden ring-1 ring-white/10 shadow-2xl">

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
            <div
              :style="{ width: `${Math.min(100, (gameStore.player.currentExp / gameStore.player.requiredExp) * 100)}%` }"
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

      <!-- Main Stage (Combat Area) -->
      <main
        class="flex-1 flex flex-col relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">

        <!-- Environment & Monsters -->
        <div class="flex-1 min-h-[50%] flex flex-col items-center justify-center relative p-6">
          <!-- Subtle environmental glow -->
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <div class="w-64 h-64 bg-rose-900/10 rounded-full blur-3xl"></div>
          </div>

          <!-- Enemy Display Area -->
          <div class="relative w-48 h-48 sm:w-56 sm:h-56 animate-bounce" style="animation-duration: 3s;">
            <!-- Placeholder Monster (SVG) -->
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
              class="w-full h-full drop-shadow-[0_0_15px_rgba(225,29,72,0.3)]">
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                fill="#1e293b" stroke="#e11d48" stroke-width="0.5" />
              <path
                d="M7 10C7 9.44772 7.44772 9 8 9H8.5C9.05228 9 9.5 9.44772 9.5 10V11C9.5 11.5523 9.05228 12 8.5 12H8C7.44772 12 7 11.5523 7 11V10Z"
                fill="#e11d48" />
              <path
                d="M14.5 10C14.5 9.44772 14.9477 9 15.5 9H16C16.5523 9 17 9.44772 17 10V11C17 11.5523 16.5523 12 16 12H15.5C14.9477 12 14.5 11.5523 14.5 11V10Z"
                fill="#e11d48" />
              <path d="M10.5 16C10.5 16 11.5 17 12 17C12.5 17 13.5 16 13.5 16" stroke="#e11d48" stroke-width="1.5"
                stroke-linecap="round" />
            </svg>

            <!-- Enemy Health Bar (Absolute positioned) -->
            <div class="absolute -bottom-6 w-full px-4" v-if="gameStore.currentMonster">
              <div class="text-center text-xs font-bold text-rose-400 mb-1 drop-shadow-md tracking-wider">
                {{ gameStore.currentMonster.name }}
              </div>
              <div class="h-1.5 w-full bg-slate-900 rounded-full border border-slate-700/50 overflow-hidden relative">
                <div
                  :style="{ width: `${Math.max(0, (gameStore.currentMonster.hp / gameStore.currentMonster.maxHp) * 100)}%` }"
                  class="h-full bg-rose-500 rounded-full relative transition-all duration-300">
                  <div class="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
            <button @click="gameStore.toggleAutoBattle()"
              class="text-[10px] text-slate-500 flex items-center gap-1.5 bg-slate-900 px-2 py-0.5 rounded-full border border-slate-800 active:scale-95 transition-transform">
              <span class="w-1.5 h-1.5 rounded-full"
                :class="gameStore.isAutoBattling ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'"></span>
              {{ gameStore.isAutoBattling ? 'Auto-Battle Active' : 'Auto-Battle Off' }}
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
      </main>

      <!-- Bottom Navigation Bar -->
      <nav
        class="shrink-0 bg-slate-900 border-t border-slate-800 pb-[env(safe-area-inset-bottom,0.75rem)] pt-2 px-1 z-20">
        <ul class="flex items-center justify-around">

          <!-- Battle (Active state) -->
          <li>
            <button @click="gameStore.attackMonster()"
              class="flex flex-col items-center justify-center p-2 w-16 group outline-none">
              <div
                class="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 active:bg-indigo-500/40 transition-colors border border-indigo-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <div class="absolute -top-1 -right-1 flex h-3 w-3">
                  <span
                    class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span
                    class="relative inline-flex rounded-full h-3 w-3 bg-indigo-500 border-2 border-slate-900"></span>
                </div>
              </div>
              <span class="mt-1 text-[10px] font-bold text-indigo-400 tracking-wide">ATTACK</span>
            </button>
          </li>

          <!-- Hero -->
          <li>
            <button class="flex flex-col items-center justify-center p-2 w-16 group outline-none">
              <div
                class="relative flex items-center justify-center w-10 h-10 rounded-2xl text-slate-400 group-hover:bg-slate-800 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span
                class="mt-1 text-[10px] font-medium text-slate-500 group-hover:text-slate-300 transition-colors tracking-wide">HERO</span>
            </button>
          </li>

          <!-- Inventory -->
          <li>
            <button class="flex flex-col items-center justify-center p-2 w-16 group outline-none">
              <div
                class="relative flex items-center justify-center w-10 h-10 rounded-2xl text-slate-400 group-hover:bg-slate-800 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <span
                class="mt-1 text-[10px] font-medium text-slate-500 group-hover:text-slate-300 transition-colors tracking-wide">ITEMS</span>
            </button>
          </li>

          <!-- Skills -->
          <li>
            <button class="flex flex-col items-center justify-center p-2 w-16 group outline-none">
              <div
                class="relative flex items-center justify-center w-10 h-10 rounded-2xl text-slate-400 group-hover:bg-slate-800 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <span
                class="mt-1 text-[10px] font-medium text-slate-500 group-hover:text-slate-300 transition-colors tracking-wide">SKILLS</span>
            </button>
          </li>

          <!-- Settings -->
          <li>
            <button class="flex flex-col items-center justify-center p-2 w-16 group outline-none">
              <div
                class="relative flex items-center justify-center w-10 h-10 rounded-2xl text-slate-400 group-hover:bg-slate-800 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span
                class="mt-1 text-[10px] font-medium text-slate-500 group-hover:text-slate-300 transition-colors tracking-wide">SETTING</span>
            </button>
          </li>

        </ul>
      </nav>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '~/stores/gameStore'

const gameStore = useGameStore()

onMounted(() => {
  gameStore.initGame()
})
</script>
