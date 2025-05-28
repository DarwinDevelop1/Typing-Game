// src/components/GameControls.js
import React from 'react';

const GameControls = ({
  selectedDuration,
  onDurationChange,
  availableDurations,
  onStartGame,
  gameStarted,
  leaderboard,
  maxLeaderboardEntries
}) => {
  return (
    <>
      <div className="duration-selector">
        <label htmlFor="duration">Game Duration (seconds): </label>
        <select
          id="duration"
          value={selectedDuration}
          onChange={(e) => onDurationChange(Number(e.target.value))}
          disabled={gameStarted}
        >
          {availableDurations.map(duration => (
            <option key={duration} value={duration}>
              {duration}s
            </option>
          ))}
        </select>
      </div>

      <button onClick={onStartGame} className="start-button">
        Start Game
      </button>

      {leaderboard.length > 0 && (
        <div className="leaderboard-container">
          <h3>Leaderboard (Top {maxLeaderboardEntries})</h3>
          <ol className="leaderboard-list">
            {leaderboard.map((entry, index) => (
              <li key={`${entry.name}-${index}`}>
                <span>{index + 1}. {entry.name}</span>
                <span>Score: {entry.score}</span>
                <span>WPM: {entry.wpm}</span>
                <span className="leaderboard-date">{entry.date}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </>
  );
};

export default GameControls;