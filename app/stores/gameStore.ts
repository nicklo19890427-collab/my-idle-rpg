import { defineStore } from 'pinia'
import type { PlayerStats, Monster, GameLog } from '~/types/game'

export const useGameStore = defineStore('game', () => {
  // State
  const player = ref<PlayerStats>({
    level: 1,
    currentExp: 0,
    requiredExp: 100,
    gold: 0,
    diamonds: 0,
    hp: 100,
    maxHp: 100,
    attack: 10,
    defense: 5,
    critRate: 0.1, // 10%
  })

  const currentMonster = ref<Monster | null>({
    id: 'm1',
    name: 'Shadow Slime',
    hp: 20,
    maxHp: 20,
    attack: 2,
    expReward: 15,
    goldReward: 5,
  })

  const logs = ref<GameLog[]>([])
  let logIdCounter = 0

  const isAutoBattling = ref(false)

  // Actions
  const addLog = (message: string, type: GameLog['type'] = 'system') => {
    const now = new Date()
    const timestamp = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
    
    logs.value.unshift({
      id: logIdCounter++,
      timestamp,
      message,
      type
    })
    
    // Keep only the last 50 logs
    if (logs.value.length > 50) {
      logs.value.pop()
    }
  }

  const levelUp = () => {
    player.value.level++
    player.value.currentExp -= player.value.requiredExp
    player.value.requiredExp = Math.floor(player.value.requiredExp * 1.5) // Increase required exp
    
    // Stat gains
    player.value.maxHp += 20
    player.value.hp = player.value.maxHp // Heal on level up
    player.value.attack += 3
    player.value.defense += 2
    
    addLog(`Level up! Reached Level ${player.value.level}!`, 'reward')
  }

  const gainExp = (amount: number) => {
    player.value.currentExp += amount
    if (player.value.currentExp >= player.value.requiredExp) {
      levelUp()
    }
  }

  const gainGold = (amount: number) => {
    player.value.gold += amount
  }

  const respawnMonster = () => {
    // In a real game, this would select from a pool of monsters based on current stage/level
    currentMonster.value = {
      id: `m_${Date.now()}`,
      name: 'Shadow Slime',
      hp: 20 + (player.value.level * 5),
      maxHp: 20 + (player.value.level * 5),
      attack: 2 + Math.floor(player.value.level / 2),
      expReward: 15 + player.value.level * 2,
      goldReward: 5 + player.value.level,
    }
    addLog(`A wild ${currentMonster.value.name} appeared!`, 'system')
  }

  const attackMonster = () => {
    if (!currentMonster.value || player.value.hp <= 0) return

    const isCrit = Math.random() < player.value.critRate
    const damage = isCrit ? player.value.attack * 2 : player.value.attack
    
    currentMonster.value.hp = Math.max(0, currentMonster.value.hp - damage)
    
    addLog(`You strike for ${damage} damage!${isCrit ? ' (Critical Hit!)' : ''}`, isCrit ? 'critical' : 'attack')

    if (currentMonster.value.hp <= 0) {
      addLog(`Defeated ${currentMonster.value.name}!`, 'reward')
      addLog(`+${currentMonster.value.goldReward} Gold, +${currentMonster.value.expReward} EXP`, 'reward')
      gainGold(currentMonster.value.goldReward)
      gainExp(currentMonster.value.expReward)
      
      // Delay before next monster appears
      setTimeout(() => {
        respawnMonster()
      }, 1000)
    }
  }

  const takeDamage = () => {
    if (!currentMonster.value || currentMonster.value.hp <= 0 || player.value.hp <= 0) return
    
    // Simple damage calculation: Monster Attack - Player defense/2 (min 1)
    const damage = Math.max(1, currentMonster.value.attack - Math.floor(player.value.defense / 2))
    
    player.value.hp = Math.max(0, player.value.hp - damage)
    addLog(`${currentMonster.value.name} hits you for ${damage} damage!`, 'damage')
    
    if (player.value.hp <= 0) {
      addLog('You have been defeated...', 'system')
      // Simple recovery for now
      setTimeout(() => {
        player.value.hp = player.value.maxHp
        addLog('You rested and recovered your HP.', 'heal')
      }, 3000)
    }
  }

  // Simple auto-battle loop hook (could be managed better using requestAnimationFrame or reliable setInterval)
  let battleTimer: ReturnType<typeof setInterval> | null = null
  
  const toggleAutoBattle = () => {
    isAutoBattling.value = !isAutoBattling.value
    
    if (isAutoBattling.value) {
      addLog('Auto-Battle Active', 'system')
      battleTimer = setInterval(() => {
        if (!currentMonster.value || currentMonster.value.hp <= 0) return
        
        attackMonster()
        
        // Let the monster attack back if still alive
        if (currentMonster.value && currentMonster.value.hp > 0) {
          setTimeout(() => {
            takeDamage()
          }, 500)
        }
      }, 1500) // Attack every 1.5s
    } else {
      addLog('Auto-Battle Paused', 'system')
      if (battleTimer) clearInterval(battleTimer)
    }
  }

  // Basic startup initialization
  const initGame = () => {
    if (logs.value.length === 0) {
      addLog('Welcome to My Idle RPG!', 'system')
      respawnMonster()
    }
  }

  return {
    player,
    currentMonster,
    logs,
    isAutoBattling,
    addLog,
    attackMonster,
    takeDamage,
    gainExp,
    gainGold,
    respawnMonster,
    toggleAutoBattle,
    initGame
  }
})
