<template>
  <!-- Main Stage (Combat Area) -->
  <div class="flex-1 min-h-[50%] flex flex-col items-center justify-center relative p-6">

    <!-- Stage Progress Header -->
    <div class="absolute top-4 w-full px-6 flex flex-col items-center">
      <div
        class="bg-slate-900/60 border border-slate-700/50 backdrop-blur-md px-4 py-1.5 rounded-full flex items-center gap-3 shadow-lg">
        <span class="text-xs font-bold text-slate-300 tracking-wider">STAGE {{ gameStore.currentStage }}</span>

        <!-- Kill Tracker -->
        <div class="flex items-center gap-1.5">
          <div class="text-[10px] font-mono text-slate-400">
            {{ gameStore.killsInCurrentStage }}/{{ gameStore.requiredKillsPerStage }}
          </div>
          <div class="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div class="h-full bg-emerald-500 rounded-full transition-all duration-300"
              :style="{ width: `${(gameStore.killsInCurrentStage / gameStore.requiredKillsPerStage) * 100}%` }">
            </div>
          </div>
        </div>
      </div>

      <!-- Boss Indicator -->
      <div v-if="gameStore.currentMonster?.isBoss" class="mt-2 animate-pulse">
        <span
          class="text-[10px] font-black tracking-widest text-rose-500 bg-rose-950/50 px-2 py-0.5 rounded border border-rose-900/50">BOSS
          ENCOUNTER</span>
      </div>
    </div>

    <!-- Subtle environmental glow -->
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden -z-10">
      <div class="w-64 h-64 rounded-full blur-3xl transition-colors duration-1000"
        :class="gameStore.currentMonster?.isBoss ? 'bg-rose-600/20' : 'bg-indigo-900/10'"></div>
    </div>

    <!-- Enemy Display Area -->
    <div class="relative w-48 h-48 sm:w-56 sm:h-56 animate-bounce" style="animation-duration: 3s;">
      <div class="w-full h-full" :class="{ 'animate-shake': isShaking }">
        <!-- Placeholder Monster (SVG) -->
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
          class="w-full h-full transition-all duration-500"
          :class="gameStore.currentMonster?.isBoss ? 'scale-125 drop-shadow-[0_0_25px_rgba(225,29,72,0.6)]' : 'drop-shadow-[0_0_15px_rgba(225,29,72,0.3)]'">
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            :fill="gameStore.currentMonster?.isBoss ? '#4c0519' : '#1e293b'" stroke="#e11d48" stroke-width="0.5" />
          <path
            d="M7 10C7 9.44772 7.44772 9 8 9H8.5C9.05228 9 9.5 9.44772 9.5 10V11C9.5 11.5523 9.05228 12 8.5 12H8C7.44772 12 7 11.5523 7 11V10Z"
            fill="#e11d48" />
          <path
            d="M14.5 10C14.5 9.44772 14.9477 9 15.5 9H16C16.5523 9 17 9.44772 17 10V11C17 11.5523 16.5523 12 16 12H15.5C14.9477 12 14.5 11.5523 14.5 11V10Z"
            fill="#e11d48" />
          <path d="M10.5 16C10.5 16 11.5 17 12 17C12.5 17 13.5 16 13.5 16" stroke="#e11d48" stroke-width="1.5"
            stroke-linecap="round" />
        </svg>
      </div>

      <!-- Floating Numbers Area -->
      <div class="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
        <div v-for="num in floatingNumbers" :key="num.id"
          class="absolute animate-float-up text-2xl font-black drop-shadow-md"
          :class="num.isCrit ? 'text-indigo-400 scale-125' : 'text-rose-500'">
          -{{ num.val }}
        </div>
      </div>

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
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useGameStore } from '~/stores/gameStore'

const gameStore = useGameStore()

const isShaking = ref(false)
const floatingNumbers = ref<{ id: number, val: number, isCrit: boolean }[]>([])
let floatId = 0

// Watch enemy HP for changes to trigger visuals
watch(() => gameStore.currentMonster?.hp, (newHp, oldHp) => {
  if (oldHp !== undefined && newHp !== undefined && newHp < oldHp) {
    const damage = oldHp - newHp

    // Trigger shake
    isShaking.value = true
    setTimeout(() => { isShaking.value = false }, 400)

    // Determine if it was a critical hit from the last log entry
    const lastLog = gameStore.logs[0]
    const isCrit = lastLog && lastLog.type === 'critical'

    // Add floating number
    const id = floatId++
    floatingNumbers.value.push({ id, val: damage, isCrit })

    // Cleanup floating number after animation
    setTimeout(() => {
      floatingNumbers.value = floatingNumbers.value.filter(n => n.id !== id)
    }, 1000)
  }
})
</script>
