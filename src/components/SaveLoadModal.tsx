import React, { useState, useEffect } from "react";
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
  const [activeTab, setActiveTab] = useState<"save" | "load">("save");
  const [saveSlots, setSaveSlots] = useState<Record<string, any>>({});
  const [newSaveName, setNewSaveName] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<string>("");

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

  const handleSaveGame = () => {
    if (!newSaveName.trim()) {
      toast.error("Please enter a save name");
      return;
    }

    if (!selectedSlot) {
      toast.error("Please select a save slot");
      return;
    }

    // Check if save name already exists in a different slot
    const nameCheck = SaveSystem.isSaveNameExists(newSaveName.trim());
    if (nameCheck.exists && nameCheck.slotId !== selectedSlot) {
      const confirmMessage = `A save named "${newSaveName.trim()}" already exists in slot ${nameCheck.slotId?.replace(
        "slot_",
        ""
      )}. Do you want to create another save with the same name?`;
      if (!window.confirm(confirmMessage)) {
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
        return;
      }
    }

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
  };

  const handleLoadGame = (slotId: string) => {
    const saveGame = SaveSystem.loadGame(slotId);
    if (saveGame) {
      onLoadGame(saveGame);
      onClose();
      toast.success(`Game loaded: ${saveGame.name}`);
    } else {
      toast.error("Failed to load game");
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

  if (!isOpen) return null;

  return (
    <div className="save-load-modal-overlay">
      <div className="save-load-modal">
        <div className="save-load-modal-header">
          <h2>Save & Load Game</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="save-load-modal-tabs">
          <button
            className={`tab-button ${activeTab === "save" ? "active" : ""}`}
            onClick={() => setActiveTab("save")}
          >
            Save Game
          </button>
          <button
            className={`tab-button ${activeTab === "load" ? "active" : ""}`}
            onClick={() => setActiveTab("load")}
          >
            Load Game
          </button>
        </div>

        {activeTab === "save" && (
          <div className="save-tab">
            <div className="save-form">
              <div className="form-group">
                <label htmlFor="saveName">Save Name:</label>
                <input
                  type="text"
                  id="saveName"
                  value={newSaveName}
                  onChange={(e) => setNewSaveName(e.target.value)}
                  placeholder="Enter save name..."
                  maxLength={30}
                />
              </div>

              <div className="form-group">
                <label htmlFor="saveSlot">Save Slot:</label>
                <select
                  id="saveSlot"
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  className="slot-selector"
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
                <button
                  className="save-button"
                  onClick={handleSaveGame}
                  disabled={!newSaveName.trim() || !selectedSlot}
                >
                  {selectedSlot && SaveSystem.getSaveSlotInfo(selectedSlot)
                    ? "Overwrite Save"
                    : "Save Game"}
                </button>

                <button
                  className="quick-save-button"
                  onClick={handleQuickSave}
                  disabled={!newSaveName.trim()}
                >
                  Quick Save
                </button>
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
                          <button
                            className="delete-slot-button"
                            onClick={() => handleDeleteSave(slotId)}
                            title="Delete save"
                          >
                            ×
                          </button>
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
                          <button
                            className="load-button auto-save-load"
                            onClick={handleLoadAutoSave}
                          >
                            Load Auto-Save
                          </button>
                          <button
                            className="delete-button"
                            onClick={handleDeleteAutoSave}
                          >
                            Delete
                          </button>
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
                          <button
                            className="load-button"
                            onClick={() => handleLoadGame(slotId)}
                          >
                            Load
                          </button>
                          <button
                            className="delete-button"
                            onClick={() => handleDeleteSave(slotId)}
                          >
                            Delete
                          </button>
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
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveLoadModal;
