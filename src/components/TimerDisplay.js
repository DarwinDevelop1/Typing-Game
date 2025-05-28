// src/components/TimerDisplay.js
import React from 'react';

const TimerDisplay = ({ timeLeft }) => {
  return (
    <p className={`timer ${timeLeft <= 10 && timeLeft > 0 ? 'low-time' : ''}`}>
      Time: {timeLeft}s
    </p>
  );
};

export default TimerDisplay;