# Empire Trail - Save System

## Overview

The Empire Trail game now includes a comprehensive save system that allows players to save and load their game progress using localStorage. The system provides multiple save slots, auto-save functionality, and a user-friendly interface for managing saves.

## Features

### 🎮 **Auto-Save**
- Automatically saves game progress when important changes occur
- Saves are triggered by:
  - Player actions (travel, rest, property purchases)
  - Portfolio changes
  - Bank balance updates
  - City changes
- Auto-save is loaded on game startup if available

### 💾 **Manual Save Slots**
- 5 save slots available for manual saves
- Each slot can store a complete game state
- Save slots show:
  - Save name
  - Timestamp
  - Game progress information
- Automatic slot management (finds next available slot)

### 📂 **Load System**
- Load any saved game from available slots
- View detailed information about each save
- Delete unwanted saves
- Continue from exactly where you left off

### 🔧 **Advanced Features**
- Save data export/import for backup purposes
- Save statistics and management tools
- Version compatibility checking
- Error handling and recovery

## How to Use

### **Saving Your Game**

1. **Quick Save (F5)**: Press F5 while playing to open the Save/Load modal
2. **Manual Save**: Click the "💾 Save/Load (F5)" button in the city screen
3. **Auto-Save**: Your game is automatically saved as you play

### **Loading Your Game**

1. **On Startup**: If an auto-save exists, you'll be prompted to continue
2. **During Gameplay**: Press F5 or use the Save/Load button
3. **Select Save**: Choose from available save slots
4. **Load**: Click "Load" to restore your game state

### **Managing Saves**

- **Delete Saves**: Remove unwanted saves to free up slots
- **Save Names**: Give your saves descriptive names
- **Multiple Slots**: Use different slots for different playthroughs

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| **F1** | Show/Hide Help |
| **F5** | Open Save/Load Modal |
| **ESC** | Go back/Close |

## Technical Details

### **Save Data Structure**
The save system stores:
- Player information (profession, salary, location)
- Current game month and year
- Portfolio (all owned properties)
- Current bank balance
- Current city and game state
- Timestamps and version information

### **Storage Location**
- Saves are stored in browser localStorage
- Data persists between browser sessions
- No server-side storage required
- Data is tied to the specific browser/domain

### **File Size**
- Typical save files: 5-50 KB
- Depends on portfolio size and game progress
- localStorage limit: ~5-10 MB (plenty for saves)

## Troubleshooting

### **Save Not Working**
- Check browser localStorage support
- Ensure sufficient storage space
- Try refreshing the page
- Check browser console for errors

### **Can't Load Save**
- Verify save file integrity
- Check for version compatibility
- Try deleting and recreating the save
- Ensure save data is complete

### **Lost Progress**
- Check for auto-save recovery
- Look for recent manual saves
- Verify localStorage is enabled
- Check browser privacy settings

## Best Practices

1. **Regular Saves**: Save frequently to avoid losing progress
2. **Multiple Slots**: Use different slots for different strategies
3. **Descriptive Names**: Name saves clearly (e.g., "Pre-Property Purchase")
4. **Backup Important Saves**: Export critical saves for backup
5. **Clean Up**: Delete old saves to keep organized

## Future Enhancements

- Cloud save support
- Save sharing between devices
- Save file compression
- Advanced save analytics
- Save comparison tools

## Support

If you encounter issues with the save system:
1. Check the browser console for error messages
2. Verify localStorage is enabled in your browser
3. Try clearing browser data and starting fresh
4. Report bugs with specific steps to reproduce

---

**Happy Gaming! 🎮**

The save system ensures your Empire Trail journey can continue exactly where you left off, allowing you to build your real estate empire at your own pace.
