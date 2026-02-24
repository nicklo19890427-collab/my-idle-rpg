import { useGameStore } from '~/stores/gameStore'

export const useGameLoop = () => {
  const gameStore = useGameStore()
  const { isAutoBattling } = storeToRefs(gameStore)
  let battleTimer: ReturnType<typeof setInterval> | null = null

  const startLoop = () => {
    if (battleTimer) return
    isAutoBattling.value = true
    gameStore.addLog('Auto-Battle Active', 'system')

    battleTimer = setInterval(() => {
      // Exit conditions
      if (!gameStore.currentMonster || gameStore.currentMonster.hp <= 0) return
      
      gameStore.attackMonster()
      
      // Let the monster attack back if still alive
      if (gameStore.currentMonster && gameStore.currentMonster.hp > 0) {
        setTimeout(() => {
          gameStore.takeDamage()
        }, 500)
      }
    }, 1500) // Attack every 1.5s
  }

  const stopLoop = () => {
    isAutoBattling.value = false
    gameStore.addLog('Auto-Battle Paused', 'system')
    if (battleTimer) {
      clearInterval(battleTimer)
      battleTimer = null
    }
  }

  const toggleAutoBattle = () => {
    if (isAutoBattling.value) {
      stopLoop()
    } else {
      startLoop()
    }
  }

  return {
    startLoop,
    stopLoop,
    toggleAutoBattle,
    isAutoBattling
  }
}
