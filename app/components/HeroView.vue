<template>
  <div class="flex-1 flex flex-col p-4 overflow-y-auto w-full">
    <!-- Hero Header Profile -->
    <div
      class="bg-indigo-900/40 border border-indigo-500/30 rounded-2xl p-4 mb-6 flex items-center gap-4 shadow-lg backdrop-blur-sm relative overflow-hidden">
      <!-- Glow effect -->
      <div class="absolute -right-8 -top-8 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl"></div>

      <div
        class="bg-indigo-950 border-2 border-indigo-400 rounded-xl w-16 h-16 flex items-center justify-center text-3xl shadow-inner shadow-indigo-900">
        🧙‍♂️
      </div>
      <div>
        <h2 class="text-xl font-bold tracking-wide text-white drop-shadow-sm">The Hero</h2>
        <p class="text-indigo-300 text-xs font-semibold uppercase tracking-widest mt-0.5">Level {{
          gameStore.player.level }} Adventurer</p>
      </div>
    </div>

    <!-- Stats Grid -->
    <h3 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 pl-1">Combat Statistics</h3>
    <div class="grid grid-cols-2 gap-3 mb-6">

      <!-- HP Stat -->
      <div class="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div
            class="bg-emerald-500/20 text-emerald-400 rounded-md w-7 h-7 flex items-center justify-center text-sm shadow-sm">
            ❤️</div>
          <span class="text-xs text-slate-400 font-medium">Max HP</span>
        </div>
        <span class="font-mono font-bold text-slate-200">{{ gameStore.player.maxHp }}</span>
      </div>

      <!-- ATK Stat -->
      <div class="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div
            class="bg-rose-500/20 text-rose-400 rounded-md w-7 h-7 flex items-center justify-center text-sm shadow-sm">
            ⚔️</div>
          <span class="text-xs text-slate-400 font-medium">Attack</span>
        </div>
        <span class="font-mono font-bold text-slate-200">{{ gameStore.player.attack }}</span>
      </div>

      <!-- DEF Stat -->
      <div class="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div
            class="bg-blue-500/20 text-blue-400 rounded-md w-7 h-7 flex items-center justify-center text-sm shadow-sm">
            🛡️</div>
          <span class="text-xs text-slate-400 font-medium">Defense</span>
        </div>
        <span class="font-mono font-bold text-slate-200">{{ gameStore.player.defense }}</span>
      </div>

      <!-- CRIT Stat -->
      <div class="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div
            class="bg-amber-500/20 text-amber-400 rounded-md w-7 h-7 flex items-center justify-center text-sm shadow-sm">
            ⚡</div>
          <span class="text-xs text-slate-400 font-medium">Crit %</span>
        </div>
        <span class="font-mono font-bold text-slate-200">{{ (gameStore.player.critRate * 100).toFixed(0) }}%</span>
      </div>
    </div>

    <!-- Upgrades Section -->
    <h3 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 pl-1">Training & Upgrades</h3>
    <div class="space-y-3">

      <!-- Upgrade Action Card -->
      <div class="bg-slate-900 border border-slate-700/50 rounded-xl p-1 shadow-md">
        <button @click="gameStore.upgradeAttack()" :disabled="gameStore.player.gold < gameStore.attackUpgradeCost"
          class="w-full flex items-center justify-between p-3 rounded-lg transition-all" :class="gameStore.player.gold >= gameStore.attackUpgradeCost
            ? 'bg-slate-800 hover:bg-slate-700 active:scale-[0.98]'
            : 'opacity-50 cursor-not-allowed bg-slate-900'">

          <div class="flex flex-col text-left">
            <span class="font-bold text-sm text-slate-200 flex items-center gap-2">
              Train Strength <span class="text-xs font-normal text-rose-400 bg-rose-500/10 px-1.5 rounded">+2 ATK</span>
            </span>
            <span class="text-xs text-slate-500 font-medium mt-0.5">Increases base physical damage</span>
          </div>

          <!-- Cost Display -->
          <div class="flex flex-col items-end">
            <span class="text-[10px] font-semibold tracking-wider text-slate-500 uppercase mb-0.5">Cost</span>
            <div class="flex items-center gap-1.5"
              :class="gameStore.player.gold >= gameStore.attackUpgradeCost ? 'text-amber-400' : 'text-rose-500'">
              <span class="text-xs">🪙</span>
              <span class="font-mono font-bold text-sm">{{ gameStore.attackUpgradeCost }}</span>
            </div>
          </div>
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '~/stores/gameStore'

const gameStore = useGameStore()
</script>
