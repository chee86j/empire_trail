import React, { useState, useEffect } from 'react';
import { Achievement, AchievementCategory } from '../types';
import { AchievementService } from '../services/achievementService';
import { achievementCategories, rarityColors } from '../assets/achievements';
import '../styles/AchievementScreen.css';

interface Props {
  onClose: () => void;
}

const AchievementScreen: React.FC<Props> = ({ onClose }) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<AchievementCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'rarity' | 'progress' | 'unlocked'>('progress');
  const [showUnlockedOnly, setShowUnlockedOnly] = useState(false);
  const [achievementService] = useState(() => AchievementService.getInstance());

  useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements = () => {
    const allAchievements = achievementService.getCurrentAchievements();
    setAchievements(allAchievements);
  };

  const getFilteredAndSortedAchievements = (): Achievement[] => {
    let filtered = achievements;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(achievement => achievement.category === selectedCategory);
    }

    // Filter by unlocked status
    if (showUnlockedOnly) {
      filtered = filtered.filter(achievement => achievement.isUnlocked);
    }

    // Sort achievements
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rarity':
          const rarityOrder = { common: 0, uncommon: 1, rare: 2, epic: 3, legendary: 4 };
          return rarityOrder[b.rarity] - rarityOrder[a.rarity];
        case 'progress':
          return b.progress - a.progress;
        case 'unlocked':
          if (a.isUnlocked === b.isUnlocked) {
            return b.progress - a.progress;
          }
          return a.isUnlocked ? -1 : 1;
        default:
          return 0;
      }
    });

    return filtered;
  };

  const getProgressPercentage = (achievement: Achievement): number => {
    return Math.round((achievement.progress / achievement.maxProgress) * 100);
  };

  const getRarityIcon = (rarity: string): string => {
    switch (rarity) {
      case 'common': return '⚪';
      case 'uncommon': return '🟢';
      case 'rare': return '🔵';
      case 'epic': return '🟣';
      case 'legendary': return '🟡';
      default: return '⚪';
    }
  };

  const getProgressSummary = () => {
    const total = achievements.length;
    const unlocked = achievements.filter(a => a.isUnlocked).length;
    const percentage = total > 0 ? Math.round((unlocked / total) * 100) : 0;
    return { total, unlocked, percentage };
  };

  const progressSummary = getProgressSummary();
  const filteredAchievements = getFilteredAndSortedAchievements();

  return (
    <div className="achievement-screen">
      <div className="achievement-header">
        <h2>🏆 Achievements</h2>
        <div className="progress-summary">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progressSummary.percentage}%` }}
            ></div>
          </div>
          <span className="progress-text">
            {progressSummary.unlocked} / {progressSummary.total} ({progressSummary.percentage}%)
          </span>
        </div>
      </div>

      <div className="achievement-controls">
        <div className="filter-controls">
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value as AchievementCategory | 'all')}
            className="category-filter"
          >
            <option value="all">All Categories</option>
            {Object.entries(achievementCategories).map(([key, category]) => (
              <option key={key} value={key}>{category.name}</option>
            ))}
          </select>

          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value as any)}
            className="sort-filter"
          >
            <option value="progress">Sort by Progress</option>
            <option value="unlocked">Sort by Unlocked</option>
            <option value="rarity">Sort by Rarity</option>
            <option value="name">Sort by Name</option>
          </select>

          <label className="checkbox-label">
            <input 
              type="checkbox" 
              checked={showUnlockedOnly}
              onChange={(e) => setShowUnlockedOnly(e.target.checked)}
            />
            Show unlocked only
          </label>
        </div>
      </div>

      <div className="achievement-grid">
        {filteredAchievements.map((achievement) => {
          const progressPercentage = getProgressPercentage(achievement);
          const categoryInfo = achievementCategories[achievement.category];
          
          return (
            <div 
              key={achievement.id} 
              className={`achievement-card ${achievement.isUnlocked ? 'unlocked' : 'locked'} ${achievement.rarity}`}
            >
              <div className="achievement-header-card">
                <div className="achievement-icon">
                  {achievement.isUnlocked ? achievement.emoji : '🔒'}
                </div>
                <div className="achievement-info">
                  <h3 className="achievement-name">{achievement.name}</h3>
                  <div className="achievement-meta">
                    <span 
                      className="rarity-badge" 
                      style={{ backgroundColor: rarityColors[achievement.rarity] }}
                    >
                      {getRarityIcon(achievement.rarity)} {achievement.rarity}
                    </span>
                    <span 
                      className="category-badge"
                      style={{ backgroundColor: categoryInfo.color }}
                    >
                      {categoryInfo.name}
                    </span>
                  </div>
                </div>
              </div>

              <p className="achievement-description">{achievement.description}</p>

              <div className="achievement-progress">
                <div className="progress-bar-small">
                  <div 
                    className="progress-fill-small" 
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <span className="progress-text-small">
                  {achievement.progress.toLocaleString()} / {achievement.maxProgress.toLocaleString()}
                  {progressPercentage < 100 && ` (${progressPercentage}%)`}
                </span>
              </div>

              {achievement.reward && (
                <div className="achievement-reward">
                  <span className="reward-label">Reward:</span>
                  <span className="reward-value">
                    {achievement.reward.type === 'cash' && '$'}
                    {achievement.reward.value.toLocaleString()}
                    {achievement.reward.type === 'cash' && ' bonus'}
                  </span>
                </div>
              )}

              {achievement.isUnlocked && achievement.unlockedAt && (
                <div className="achievement-unlocked-date">
                  Unlocked: {new Date(achievement.unlockedAt).toLocaleDateString()}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredAchievements.length === 0 && (
        <div className="no-achievements">
          <p>No achievements found matching your filters.</p>
        </div>
      )}

      <div className="achievement-footer">
        <button onClick={onClose} className="close-button">
          Close (ESC)
        </button>
      </div>
    </div>
  );
};

export default AchievementScreen;
