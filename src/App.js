// src/App.js
import React, { useState, useEffect, useRef } from 'react';
import './App.css'; // El mismo App.css de antes funciona bien

const ENGLISH_WORDS = [
    "hello", "world", "react", "game", "speed", "keyboard", "code", "computer",
    "javascript", "component", "state", "effect", "programming", "development",
    "interface", "user", "portfolio", "github", "visual", "studio", "challenge",
    "practice", "learn", "build", "deploy", "function", "variable", "array",
    "object", "class", "style", "margin", "padding", "border", "color", "font",
    "background", "animation", "transition", "responsive", "design", "application"
];

const GAME_DURATION = 60; // seconds

function App() {
    const [currentWord, setCurrentWord] = useState('');
    const [typedText, setTypedText] = useState('');
    const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
    const [score, setScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const inputRef = useRef(null);

    // Function to get a random word
    const getRandomWord = () => {
        const randomIndex = Math.floor(Math.random() * ENGLISH_WORDS.length);
        return ENGLISH_WORDS[randomIndex];
    };

    // Start or restart the game
    const startGame = () => {
        setCurrentWord(getRandomWord());
        setTypedText('');
        setTimeLeft(GAME_DURATION);
        setScore(0);
        setGameStarted(true);
        setGameOver(false);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    // Timer logic
    useEffect(() => {
        let timerId;
        if (gameStarted && timeLeft > 0 && !gameOver) {
            timerId = setTimeout(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0 && gameStarted) {
            setGameOver(true);
            setGameStarted(false);
        }
        return () => clearTimeout(timerId); // Cleanup
    }, [timeLeft, gameStarted, gameOver]);


    // Handle input change
    const handleInputChange = (e) => {
        if (!gameStarted || gameOver) return;

        const newTypedText = e.target.value;
        setTypedText(newTypedText);

        // If the word is typed correctly
        if (newTypedText === currentWord) {
            setScore(prevScore => prevScore + currentWord.length); // Score by characters, or +1 for word
            setCurrentWord(getRandomWord());
            setTypedText('');
        }
    };

    // Calculate WPM (Words Per Minute)
    // Assumes an average word length of 5 characters for WPM calculation
    const calculateWPM = () => {
        if (score === 0 || timeLeft === GAME_DURATION) return 0;
        const timeSpentInMinutes = (GAME_DURATION - timeLeft) / 60;
        if (timeSpentInMinutes === 0) return 0;
        const wordsTyped = score / 5; // Assuming 5 chars per word for WPM
        return Math.round(wordsTyped / timeSpentInMinutes);
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Fast Typing Game</h1>
            </header>
            <main>
                {!gameStarted && !gameOver && (
                    <button onClick={startGame} className="start-button">
                        Start Game
                    </button>
                )}

                {gameStarted && !gameOver && (
                    <div className="game-area">
                        <p className="timer">Time Left: {timeLeft}s</p>
                        <p className="score">Score: {score}</p>
                        <div className="word-display">
                            {currentWord.split('').map((char, index) => {
                                let charClass = '';
                                if (typedText[index] === char) {
                                    charClass = 'correct';
                                } else if (typedText[index] !== undefined) {
                                    charClass = 'incorrect';
                                }
                                return <span key={index} className={charClass}>{char}</span>;
                            })}
                        </div>
                        <input
                            ref={inputRef}
                            type="text"
                            value={typedText}
                            onChange={handleInputChange}
                            placeholder="Type the word here..."
                            disabled={!gameStarted || gameOver}
                            autoFocus
                            autoComplete="off" // Prevent browser suggestions
                            spellCheck="false"  // Disable spellcheck highlighting
                        />
                    </div>
                )}

                {gameOver && (
                    <div className="game-over">
                        <h2>Game Over!</h2>
                        <p>Your Final Score: {score}</p>
                        <p>WPM: {calculateWPM()}</p>
                        <button onClick={startGame} className="restart-button">
                            Play Again
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;