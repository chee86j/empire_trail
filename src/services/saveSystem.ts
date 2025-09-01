import { SaveGame, Player, InvestmentProperty, Event, City, GameState } from '../types';
import { SAVE_SYSTEM_VERSION, MAX_SAVE_SLOTS, STORAGE_KEYS } from '../constants/gameConstants';
import { logger } from './logger';

/* Save System Service

Handles all save/load operations for the Empire Trail game
*/
export class SaveSystem {
  /* Save the current game state to a specific slot */
  static saveGame(
    slotId: string,
    gameName: string,
    gameState: {
      player: Player | null;
      currentMonth: number;
      portfolio: InvestmentProperty[];
      currentEvent: Event | null;
      currentBankBalance: number;
      currentCity: City;
      gameState: GameState;
    }
  ): boolean {
    try {
      const saveGame: SaveGame = {
        id: slotId,
        name: gameName,
        timestamp: Date.now(),
        version: SAVE_SYSTEM_VERSION,
        ...gameState
      };

      // Save to the specific slot
      const saveSlots = this.getSaveSlots();
      saveSlots[slotId] = saveGame;
      
      // Update localStorage
      localStorage.setItem(STORAGE_KEYS.SAVE_SLOTS, JSON.stringify(saveSlots));
      
      logger.saveOperation(`Game saved`, slotId);
      return true;
    } catch (error) {
      logger.errorOperation('saving game', error);
      return false;
    }
  }

  /**
   * Load a game from a specific slot
   */
  static loadGame(slotId: string): SaveGame | null {
    try {
      const saveSlots = this.getSaveSlots();
      const saveGame = saveSlots[slotId];
      
      if (!saveGame) {
        logger.info(`No save found in slot ${slotId}`);
        return null;
      }

      // Validate save version compatibility
      if (saveGame.version !== SAVE_SYSTEM_VERSION) {
        logger.warn(`Save version mismatch: ${saveGame.version} vs ${SAVE_SYSTEM_VERSION}`);
      }

      logger.loadOperation(`Game loaded from slot`, slotId);
      return saveGame;
    } catch (error) {
      logger.errorOperation('loading game', error);
      return null;
    }
  }

  /**
   * Auto-save the current game state
   */
  static autoSave(gameState: {
    player: Player | null;
    currentMonth: number;
    portfolio: InvestmentProperty[];
    currentEvent: Event | null;
    currentBankBalance: number;
    currentCity: City;
    gameState: GameState;
  }): boolean {
    try {
      const autoSave: SaveGame = {
        id: 'auto',
        name: 'Auto Save',
        timestamp: Date.now(),
        version: SAVE_SYSTEM_VERSION,
        ...gameState
      };

      localStorage.setItem(STORAGE_KEYS.AUTO_SAVE, JSON.stringify(autoSave));
      logger.saveOperation('Auto-save completed');
      return true;
    } catch (error) {
      logger.errorOperation('auto-save', error);
      return false;
    }
  }

  /**
   * Load the auto-save if it exists
   */
  static loadAutoSave(): SaveGame | null {
    try {
      const autoSaveData = localStorage.getItem(STORAGE_KEYS.AUTO_SAVE);
      if (!autoSaveData) {
        return null;
      }

      const autoSave: SaveGame = JSON.parse(autoSaveData);
      
      // Validate save version compatibility
      if (autoSave.version !== SAVE_SYSTEM_VERSION) {
        logger.warn(`Auto-save version mismatch: ${autoSave.version} vs ${SAVE_SYSTEM_VERSION}`);
      }

      logger.loadOperation('Auto-save loaded');
      return autoSave;
    } catch (error) {
      logger.errorOperation('loading auto-save', error);
      return null;
    }
  }

  /**
   * Get all available save slots
   */
  static getSaveSlots(): Record<string, SaveGame> {
    try {
      const saveSlotsData = localStorage.getItem(STORAGE_KEYS.SAVE_SLOTS);
      return saveSlotsData ? JSON.parse(saveSlotsData) : {};
    } catch (error) {
      logger.errorOperation('reading save slots', error);
      return {};
    }
  }

  /**
   * Delete a save slot
   */
  static deleteSaveSlot(slotId: string): boolean {
    try {
      const saveSlots = this.getSaveSlots();
      delete saveSlots[slotId];
      
      localStorage.setItem(STORAGE_KEYS.SAVE_SLOTS, JSON.stringify(saveSlots));
      logger.deleteOperation('Save slot deleted', slotId);
      return true;
    } catch (error) {
      logger.errorOperation('deleting save slot', error);
      return false;
    }
  }

  /**
   * Check if a save slot exists
   */
  static hasSaveSlot(slotId: string): boolean {
    const saveSlots = this.getSaveSlots();
    return !!saveSlots[slotId];
  }

  /**
   * Get the next available save slot ID
   */
  static getNextAvailableSlot(): string | null {
    const saveSlots = this.getSaveSlots();
    
    for (let i = 1; i <= MAX_SAVE_SLOTS; i++) {
      const slotId = `slot_${i}`;
      if (!saveSlots[slotId]) {
        return slotId;
      }
    }
    
    return null; // All slots are full
  }

  /**
   * Get save slot info for display
   */
  static getSaveSlotInfo(slotId: string): { name: string; timestamp: number; hasData: boolean } | null {
    const saveSlots = this.getSaveSlots();
    const saveGame = saveSlots[slotId];
    
    if (!saveGame) {
      return null;
    }
    
    return {
      name: saveGame.name,
      timestamp: saveGame.timestamp,
      hasData: true
    };
  }

  /**
   * Clear all save data (use with caution)
   */
  static clearAllSaves(): boolean {
    try {
      localStorage.removeItem(STORAGE_KEYS.AUTO_SAVE);
      localStorage.removeItem(STORAGE_KEYS.SAVE_SLOTS);
      logger.deleteOperation('All save data cleared');
      return true;
    } catch (error) {
      logger.errorOperation('clearing save data', error);
      return false;
    }
  }

  /**
   * Export save data as JSON string for backup
   */
  static exportSaveData(slotId: string): string | null {
    try {
      const saveGame = this.loadGame(slotId);
      if (!saveGame) {
        return null;
      }
      
      const exportData = {
        ...saveGame,
        exportDate: new Date().toISOString(),
        exportVersion: SAVE_SYSTEM_VERSION
      };
      
      return JSON.stringify(exportData, null, 2);
    } catch (error) {
      console.error('Error exporting save data:', error);
      return null;
    }
  }

  /**
   * Import save data from JSON string
   */
  static importSaveData(jsonData: string, slotId: string): boolean {
    try {
      const saveData = JSON.parse(jsonData);
      
      // Validate required fields
      if (!saveData.player || !saveData.currentMonth || !saveData.portfolio) {
        throw new Error('Invalid save data format');
      }
      
      // Create save game object
      const saveGame: SaveGame = {
        id: slotId,
        name: saveData.name || 'Imported Save',
        timestamp: Date.now(),
        version: SAVE_SYSTEM_VERSION,
        player: saveData.player,
        currentMonth: saveData.currentMonth,
        portfolio: saveData.portfolio,
        currentEvent: saveData.currentEvent || null,
        currentBankBalance: saveData.currentBankBalance || 0,
        currentCity: saveData.currentCity,
        gameState: saveData.gameState || 'city'
      };
      
      // Save to the specified slot
      const saveSlots = this.getSaveSlots();
      saveSlots[slotId] = saveGame;
      localStorage.setItem(STORAGE_KEYS.SAVE_SLOTS, JSON.stringify(saveSlots));
      
      logger.loadOperation(`Save data imported to slot`, slotId);
      return true;
    } catch (error) {
      logger.errorOperation('importing save data', error);
      return false;
    }
  }

  /**
   * Get save statistics for display
   */
  static getSaveStats(): {
    totalSaves: number;
    totalSlots: number;
    lastSaveTime: number | null;
    autoSaveExists: boolean;
  } {
    try {
      const saveSlots = this.getSaveSlots();
      const totalSaves = Object.keys(saveSlots).length;
      const autoSaveExists = !!localStorage.getItem(STORAGE_KEYS.AUTO_SAVE);
      
      let lastSaveTime: number | null = null;
      if (totalSaves > 0) {
        lastSaveTime = Math.max(...Object.values(saveSlots).map(save => save.timestamp));
      }
      
      return {
        totalSaves,
        totalSlots: MAX_SAVE_SLOTS,
        lastSaveTime,
        autoSaveExists
      };
    } catch (error) {
      logger.errorOperation('getting save stats', error);
      return {
        totalSaves: 0,
        totalSlots: MAX_SAVE_SLOTS,
        lastSaveTime: null,
        autoSaveExists: false
      };
    }
  }
}
