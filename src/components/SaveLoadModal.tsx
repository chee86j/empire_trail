import React, { useState, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SaveSystem } from "../services/saveSystem";
import {
  SaveGame,
  Player,
  InvestmentProperty,
  Event,
  City,
  GameState,
} from "../types";
import { toast } from "react-toastify";
import "../styles/SaveLoadModal.css";
import {
  createButtonTransition,
  createModalPopVariants,
  createOverlayFadeVariants,
} from "../animations/motionPresets";

interface SaveLoadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadGame: (saveGame: SaveGame) => void;
  currentGameState: {
    player: Player | null;
    currentMonth: number;
    portfolio: InvestmentProperty[];
    currentEvent: Event | null;
    currentBankBalance: number;
    currentCity: City;
    gameState: GameState;
  };
}

const SaveLoadModal: React.FC<SaveLoadModalProps> = ({
  isOpen,
  onClose,
  onLoadGame,
  currentGameState,
}) => {
  const reduceMotion = useReducedMotion();
  const overlayVariants = createOverlayFadeVariants(reduceMotion);
  const modalVariants = createModalPopVariants(reduceMotion);
  const buttonTransition = createButtonTransition(reduceMotion);

  const [activeTab, setActiveTab] = useState<"save" | "load">("save");
  const [saveSlots, setSaveSlots] = useState<Record<string, any>>({});
  const [newSaveName, setNewSaveName] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      refreshSaveSlots();
    }
  }, [isOpen]);

  const refreshSaveSlots = () => {
    const slots = SaveSystem.getSaveSlots();
    setSaveSlots(slots);
  };

  /* Get auto-save if it exists */
  const getAutoSave = () => {
    return SaveSystem.loadAutoSave();
  };

  const handleSaveGame = async () => {
    if (!newSaveName.trim()) {
      toast.error("Please enter a save name");
      return;
    }

    if (!selectedSlot) {
      toast.error("Please select a save slot");
      return;
    }

    setIsLoading(true);

    try {
      // Check if save name already exists in a different slot
      const nameCheck = SaveSystem.isSaveNameExists(newSaveName.trim());
      if (nameCheck.exists && nameCheck.slotId !== selectedSlot) {
        const confirmMessage = `A save named "${newSaveName.trim()}" already exists in slot ${nameCheck.slotId?.replace(
          "slot_",
          ""
        )}. Do you want to create another save with the same name?`;
        if (!window.confirm(confirmMessage)) {
          setIsLoading(false);
          return;
        }
      }

      // Check if slot is occupied
      const existingSave = SaveSystem.getSaveSlotInfo(selectedSlot);
      if (existingSave) {
        const confirmMessage = `Slot ${selectedSlot.replace(
          "slot_",
          ""
        )} already contains "${existingSave.name}". Do you want to overwrite it?`;
        if (!window.confirm(confirmMessage)) {
          setIsLoading(false);
          return;
        }
      }

      // Simulate save delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));

      const success = SaveSystem.saveGame(
        selectedSlot,
        newSaveName.trim(),
        currentGameState
      );
      
      if (success) {
        const slotNumber = selectedSlot.replace("slot_", "");
        toast.success(`Game saved to slot ${slotNumber}`);
        setNewSaveName("");
        setSelectedSlot("");
        refreshSaveSlots();
      } else {
        toast.error("Failed to save game");
      }
    } catch (error) {
      toast.error("An error occurred while saving the game");
      console.error("Save error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadGame = async (slotId: string) => {
    setIsLoading(true);
    
    try {
      // Simulate load delay for better UX
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const saveGame = SaveSystem.loadGame(slotId);
      if (saveGame) {
        onLoadGame(saveGame);
        onClose();
        toast.success(`Game loaded: ${saveGame.name}`);
      } else {
        toast.error("Failed to load game");
      }
    } catch (error) {
      toast.error("An error occurred while loading the game");
      console.error("Load error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadAutoSave = () => {
    const autoSave = getAutoSave();
    if (autoSave) {
      onLoadGame(autoSave);
      onClose();
      toast.success(`Auto-save loaded: ${autoSave.name}`);
    } else {
      toast.error("Auto-save not found");
    }
  };

  const handleDeleteSave = (slotId: string) => {
    if (window.confirm("Are you sure you want to delete this save?")) {
      const success = SaveSystem.deleteSaveSlot(slotId);
      if (success) {
        toast.success("Save deleted");
        refreshSaveSlots();
      } else {
        toast.error("Failed to delete save");
      }
    }
  };

  const handleDeleteAutoSave = () => {
    if (
      window.confirm(
        "Are you sure you want to delete the auto-save? This will remove your last saved game state."
      )
    ) {
      const success = SaveSystem.clearAutoSave();
      if (success) {
        toast.success("Auto-save deleted");
        // Force re-render to update the UI
        setSaveSlots({ ...saveSlots });
      } else {
        toast.error("Failed to delete auto-save");
      }
    }
  };

  const handleQuickSave = () => {
    if (!newSaveName.trim()) {
      toast.error("Please enter a save name");
      return;
    }

    const result = SaveSystem.quickSave(newSaveName.trim(), currentGameState);
    if (result.success) {
      toast.success(result.message);
      setNewSaveName("");
      setSelectedSlot("");
      refreshSaveSlots();
    } else {
      toast.error(result.message);
    }
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="save-load-modal-overlay"
          variants={overlayVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.div
            className="save-load-modal"
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="save-load-modal-header">
              <h2>Save & Load Game</h2>
              <motion.button
                className="btn btn-secondary close-button"
                onClick={onClose}
                aria-label="Close save/load modal"
                whileHover={reduceMotion ? undefined : { scale: 1.05 }}
                whileTap={reduceMotion ? undefined : { scale: 0.95 }}
                transition={buttonTransition}
              >
                ×
              </motion.button>
            </div>

            <div className="save-load-modal-tabs">
              <motion.button
                className={`btn ${
                  activeTab === "save" ? "btn-primary" : "btn-secondary"
                } tab-button`}
                onClick={() => setActiveTab("save")}
                aria-label="Switch to save game tab"
                aria-pressed={activeTab === "save"}
                whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                transition={buttonTransition}
              >
                Save Game
              </motion.button>
              <motion.button
                className={`btn ${
                  activeTab === "load" ? "btn-primary" : "btn-secondary"
                } tab-button`}
                onClick={() => setActiveTab("load")}
                aria-label="Switch to load game tab"
                aria-pressed={activeTab === "load"}
                whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                transition={buttonTransition}
              >
                Load Game
              </motion.button>
            </div>

        {activeTab === "save" && (
          <div className="save-tab">
            <div className="save-form">
              <div className="form-group">
                <label htmlFor="saveName">Save Name:</label>
                <input
                  type="text"
                  id="saveName"
                  className="form-input"
                  value={newSaveName}
                  onChange={(e) => setNewSaveName(e.target.value)}
                  placeholder="Enter save name..."
                  maxLength={30}
                  aria-describedby="saveName-help"
                />
              </div>

              <div className="form-group">
                <label htmlFor="saveSlot">Save Slot:</label>
                <select
                  id="saveSlot"
                  className="form-input"
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  aria-label="Select save slot"
                >
                  <option value="">Select a slot...</option>
                  {Array.from({ length: 5 }, (_, i) => {
                    const slotId = `slot_${i + 1}`;
                    const slotInfo = SaveSystem.getSaveSlotInfo(slotId);
                    return (
                      <option key={slotId} value={slotId}>
                        Slot {i + 1}{" "}
                        {slotInfo ? `(${slotInfo.name})` : "(Empty)"}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="save-buttons">
                <motion.button
                  className={`btn btn-success ${isLoading ? 'btn-loading' : ''}`}
                  onClick={handleSaveGame}
                  disabled={!newSaveName.trim() || !selectedSlot || isLoading}
                  aria-label={selectedSlot && SaveSystem.getSaveSlotInfo(selectedSlot)
                    ? "Overwrite existing save"
                    : "Save game to selected slot"}
                  whileHover={
                    reduceMotion ||
                    !newSaveName.trim() ||
                    !selectedSlot ||
                    isLoading
                      ? undefined
                      : { scale: 1.02 }
                  }
                  whileTap={
                    reduceMotion ||
                    !newSaveName.trim() ||
                    !selectedSlot ||
                    isLoading
                      ? undefined
                      : { scale: 0.98 }
                  }
                  transition={buttonTransition}
                >
                  {isLoading ? 'Saving...' : (selectedSlot && SaveSystem.getSaveSlotInfo(selectedSlot)
                    ? "Overwrite Save"
                    : "Save Game")}
                </motion.button>

                <motion.button
                  className="btn btn-primary"
                  onClick={handleQuickSave}
                  disabled={!newSaveName.trim()}
                  aria-label="Quick save to next available slot"
                  whileHover={
                    reduceMotion || !newSaveName.trim()
                      ? undefined
                      : { scale: 1.02 }
                  }
                  whileTap={
                    reduceMotion || !newSaveName.trim()
                      ? undefined
                      : { scale: 0.98 }
                  }
                  transition={buttonTransition}
                >
                  Quick Save
                </motion.button>
              </div>
            </div>

            <div className="save-slots-info">
              <h3>Save Slots</h3>
              <div className="save-slots-grid">
                {Array.from({ length: 5 }, (_, i) => {
                  const slotId = `slot_${i + 1}`;
                  const slotInfo = SaveSystem.getSaveSlotInfo(slotId);

                  return (
                    <div
                      key={slotId}
                      className={`save-slot ${slotInfo ? "occupied" : "empty"}`}
                    >
                      <div className="slot-header">
                        <span className="slot-number">{i + 1}</span>
                        {slotInfo && (
                          <motion.button
                            className="delete-slot-button"
                            onClick={() => handleDeleteSave(slotId)}
                            title="Delete save"
                            aria-label={`Delete save in slot ${i + 1}`}
                            whileHover={reduceMotion ? undefined : { scale: 1.1 }}
                            whileTap={reduceMotion ? undefined : { scale: 0.95 }}
                            transition={buttonTransition}
                          >
                            ×
                          </motion.button>
                        )}
                      </div>
                      <div className="slot-content">
                        {slotInfo ? (
                          <>
                            <div className="slot-name">{slotInfo.name}</div>
                            <div className="slot-timestamp">
                              {formatTimestamp(slotInfo.timestamp)}
                            </div>
                          </>
                        ) : (
                          <div className="slot-empty">Empty</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === "load" && (
          <div className="load-tab">
            <div className="load-slots">
              <h3>Available Saves</h3>

              {/* Auto-save section */}
              {(() => {
                const autoSave = getAutoSave();
                if (autoSave) {
                  return (
                    <div className="auto-save-section">
                      <h4>Auto-Save</h4>
                      <div className="load-slot-item auto-save-item">
                        <div className="load-slot-info">
                          <div className="load-slot-name">
                            {autoSave.name}
                            <span className="auto-save-badge">Auto</span>
                          </div>
                          <div className="load-slot-details">
                            <span>
                              Last saved: {formatTimestamp(autoSave.timestamp)}
                            </span>
                            <span>•</span>
                            <span>Month {autoSave.currentMonth}</span>
                            <span>•</span>
                            <span>
                              ${autoSave.currentBankBalance.toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <div className="load-slot-actions">
                          <motion.button
                            className="load-button auto-save-load"
                            onClick={handleLoadAutoSave}
                            whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                            transition={buttonTransition}
                          >
                            Load Auto-Save
                          </motion.button>
                          <motion.button
                            className="delete-button"
                            onClick={handleDeleteAutoSave}
                            whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                            transition={buttonTransition}
                          >
                            Delete
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              })()}

              {/* Manual save slots */}
              {Object.keys(saveSlots).length === 0 ? (
                <div className="no-saves">No manual saves found</div>
              ) : (
                <div className="manual-saves-section">
                  <h4>Manual Saves</h4>
                  <div className="load-slots-list">
                    {Object.entries(saveSlots).map(([slotId, saveGame]) => (
                      <div key={slotId} className="load-slot-item">
                        <div className="load-slot-info">
                          <div className="load-slot-name">{saveGame.name}</div>
                          <div className="load-slot-details">
                            <span>Slot {slotId.replace("slot_", "")}</span>
                            <span>•</span>
                            <span>{formatTimestamp(saveGame.timestamp)}</span>
                            <span>•</span>
                            <span>Month {saveGame.currentMonth}</span>
                            <span>•</span>
                            <span>
                              ${saveGame.currentBankBalance.toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <div className="load-slot-actions">
                          <motion.button
                            className="btn btn-primary"
                            onClick={() => handleLoadGame(slotId)}
                            aria-label={`Load save: ${saveGame.name}`}
                            whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                            transition={buttonTransition}
                          >
                            Load
                          </motion.button>
                          <motion.button
                            className="btn btn-danger"
                            onClick={() => handleDeleteSave(slotId)}
                            aria-label={`Delete save: ${saveGame.name}`}
                            whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                            transition={buttonTransition}
                          >
                            Delete
                          </motion.button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="save-load-modal-footer">
          <motion.button 
            className="btn btn-secondary"
            onClick={onClose}
            aria-label="Cancel and close modal"
            whileHover={reduceMotion ? undefined : { scale: 1.02 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            transition={buttonTransition}
          >
            Cancel
          </motion.button>
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SaveLoadModal;
