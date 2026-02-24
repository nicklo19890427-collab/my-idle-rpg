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

  const currentMonster = ref<Monster | null>(null)

  const logs = ref<GameLog[]>([])
  let logIdCounter = 0

  const isAutoBattling = ref(false)
  const currentTab = ref<'battle' | 'hero' | 'items' | 'skills' | 'settings'>('battle')
  
  // Stage Progression
  const currentStage = ref(1)
  const killsInCurrentStage = ref(0)
  const requiredKillsPerStage = ref(10)

  // Computed
  const attackUpgradeCost = computed(() => {
    // Base cost 100, scales based on how many upgrades we've done (inferred from attack value for simplicity now)
    const upgradeCount = Math.floor((player.value.attack - 10) / 2) // Assuming base 10, +2 per upgrade
    return Math.floor(100 * Math.pow(1.15, Math.max(0, upgradeCount)))
  })

  // Actions
  const setTab = (tab: typeof currentTab.value) => {
    currentTab.value = tab
  }

  const upgradeAttack = () => {
    if (player.value.gold >= attackUpgradeCost.value) {
      player.value.gold -= attackUpgradeCost.value
      player.value.attack += 2 // Give +2 ATK per upgrade
      addLog(`Upgraded ATK to ${player.value.attack}!`, 'system')
    } else {
      addLog('Not enough gold to upgrade ATK!', 'system')
    }
  }

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
    // Scaling formulas
    // HP = BaseHP * (1.15 ^ (Stage - 1))
    // Attack = BaseAttack * (1.1 ^ (Stage - 1))
    
    // Determine if next monster should be a boss (every 10th stage, on the final kill)
    const isBossStage = currentStage.value % 10 === 0
    const isBossEncounter = isBossStage && killsInCurrentStage.value === requiredKillsPerStage.value - 1
    
    const stageMultiplierHp = Math.pow(1.15, currentStage.value - 1)
    const stageMultiplierAtk = Math.pow(1.1, currentStage.value - 1)
    
    const baseHp = isBossEncounter ? 100 : 20
    const baseAtk = isBossEncounter ? 10 : 2
    
    const calculatedHp = Math.floor(baseHp * stageMultiplierHp)
    const calculatedAtk = Math.floor(baseAtk * stageMultiplierAtk)
    
    const name = isBossEncounter ? 'Shadow Demon King' : 'Shadow Slime'

    currentMonster.value = {
      id: `m_${Date.now()}`,
      name,
      hp: calculatedHp,
      maxHp: calculatedHp,
      attack: calculatedAtk,
      expReward: Math.floor((15 + player.value.level * 2) * stageMultiplierHp * (isBossEncounter ? 5 : 1)),
      goldReward: Math.floor((5 + player.value.level) * stageMultiplierHp * (isBossEncounter ? 5 : 1)),
      isBoss: isBossEncounter
    }
    
    if (isBossEncounter) {
      addLog(`WARNING: A terrifying ${currentMonster.value.name} blocks your path!`, 'system')
    } else {
      addLog(`A wild ${currentMonster.value.name} appeared!`, 'system')
    }
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
      
      // Handle stage progression
      killsInCurrentStage.value++
      
      if (killsInCurrentStage.value >= requiredKillsPerStage.value) {
        killsInCurrentStage.value = 0
        currentStage.value++
        addLog(`== Stage Cleared! Entering Stage ${currentStage.value}... ==`, 'reward')
      }
      
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

  // Basic startup initialization
  const initGame = () => {
    if (logs.value.length === 0) {
      addLog('Welcome to My Idle RPG!', 'system')
      killsInCurrentStage.value = 0
      respawnMonster()
    }
  }

  return {
    player,
    currentMonster,
    logs,
    isAutoBattling,
    currentTab,
    currentStage,
    killsInCurrentStage,
    requiredKillsPerStage,
    attackUpgradeCost,
    addLog,
    attackMonster,
    takeDamage,
    gainExp,
    gainGold,
    respawnMonster,
    initGame,
    setTab,
    upgradeAttack
  }
})
