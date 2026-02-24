<template>
  <!-- Bottom Navigation Bar -->
  <nav class="shrink-0 bg-slate-900 border-t border-slate-800 pb-[env(safe-area-inset-bottom,0.75rem)] pt-2 px-1 z-20">
    <ul class="flex items-center justify-around">

      <!-- Battle -->
      <li>
        <button @click="gameStore.setTab('battle')"
          class="flex flex-col items-center justify-center p-2 w-16 group outline-none">
          <div class="relative flex items-center justify-center w-10 h-10 rounded-2xl transition-colors border"
            :class="gameStore.currentTab === 'battle' ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' : 'text-slate-400 border-transparent group-hover:bg-slate-800'">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            <div v-if="gameStore.currentTab === 'battle'" class="absolute -top-1 -right-1 flex h-3 w-3">
              <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-3 w-3 bg-indigo-500 border-2 border-slate-900"></span>
            </div>
          </div>
          <span class="mt-1 text-[10px] font-bold tracking-wide transition-colors"
            :class="gameStore.currentTab === 'battle' ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'">BATTLE</span>
        </button>
      </li>

      <!-- Hero -->
      <li>
        <button @click="gameStore.setTab('hero')"
          class="flex flex-col items-center justify-center p-2 w-16 group outline-none">
          <div class="relative flex items-center justify-center w-10 h-10 rounded-2xl transition-colors border"
            :class="gameStore.currentTab === 'hero' ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' : 'text-slate-400 border-transparent group-hover:bg-slate-800'">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <div v-if="gameStore.currentTab === 'hero'" class="absolute -top-1 -right-1 flex h-3 w-3">
              <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-3 w-3 bg-indigo-500 border-2 border-slate-900"></span>
            </div>
          </div>
          <span class="mt-1 text-[10px] font-bold tracking-wide transition-colors"
            :class="gameStore.currentTab === 'hero' ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'">HERO</span>
        </button>
      </li>

      <!-- Inventory -->
      <li>
        <button @click="gameStore.setTab('items')"
          class="flex flex-col items-center justify-center p-2 w-16 group outline-none">
          <div class="relative flex items-center justify-center w-10 h-10 rounded-2xl transition-colors border"
            :class="gameStore.currentTab === 'items' ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' : 'text-slate-400 border-transparent group-hover:bg-slate-800'">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <div v-if="gameStore.currentTab === 'items'" class="absolute -top-1 -right-1 flex h-3 w-3">
              <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-3 w-3 bg-indigo-500 border-2 border-slate-900"></span>
            </div>
          </div>
          <span class="mt-1 text-[10px] font-bold tracking-wide transition-colors"
            :class="gameStore.currentTab === 'items' ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'">ITEMS</span>
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
</template>

<script setup lang="ts">
import { useGameStore } from '~/stores/gameStore'

const gameStore = useGameStore()
</script>
