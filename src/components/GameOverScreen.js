// src/components/GameOverScreen.js
import React from 'react';

const GameOverScreen = ({
  score,
  wpm,
  onRestartGame,
  leaderboard,
  maxLeaderboardEntries
}) => {
  return (
    <>
      <div className="game-over">
        <h2>Game Over!</h2>
        <p>Your Final Score: <strong>{score}</strong></p>
        <p>WPM: <strong>{wpm}</strong></p>
        <button onClick={onRestartGame} className="restart-button">
          Play Again
        </button>
      </div>
      {leaderboard.length > 0 && (
        <div className="leaderboard-container">
          <h3>Leaderboard (Top {maxLeaderboardEntries})</h3>
          <ol className="leaderboard-list">
            {leaderboard.map((entry, index) => (
              <li key={`${entry.name}-${index}-gameover`}>
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

export default GameOverScreen;