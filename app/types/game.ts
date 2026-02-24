export interface PlayerStats {
  level: number;
  currentExp: number;
  requiredExp: number;
  gold: number;
  diamonds: number;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  critRate: number;
}

export interface Monster {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  attack: number;
  expReward: number;
  goldReward: number;
}

export interface GameLog {
  id: number;
  timestamp: string;
  message: string;
  type: 'attack' | 'damage' | 'heal' | 'reward' | 'system' | 'critical';
}

export interface GameState {
  player: PlayerStats;
  currentMonster: Monster | null;
  logs: GameLog[];
  isAutoBattling: boolean;
}
