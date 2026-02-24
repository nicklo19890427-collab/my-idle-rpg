<template>
  <div class="h-screen w-full bg-black flex justify-center items-center font-sans overflow-hidden">
    <!-- Mobile Container -->
    <div
      class="h-full w-full max-w-md bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden ring-1 ring-white/10 shadow-2xl">

      <!-- Top Header -->
      <GameHeader />

      <!-- Main Stage (Combat Area & Battle Log) -->
      <main
        class="flex-1 flex flex-col relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">

        <!-- Battle Interface -->
        <div v-show="gameStore.currentTab === 'battle'" class="w-full h-full flex flex-col">
          <CombatStage />
          <BattleLog />
        </div>

        <!-- Hero Interface -->
        <HeroView v-if="gameStore.currentTab === 'hero'" />

      </main>

      <!-- Bottom Navigation -->
      <BottomNav />

    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useGameStore } from '~/stores/gameStore'
import { useGameLoop } from '~/composables/useGameLoop'

const gameStore = useGameStore()
const gameLoop = useGameLoop()

onMounted(() => {
  gameStore.initGame()
  // Automatically start game loop on mount
  gameLoop.startLoop()
})
</script>
