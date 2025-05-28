// src/App.js
import React, { useState, useEffect, useRef, useCallback } from 'react'; // Añadido useCallback
import './App.css';
// Importar los nuevos componentes
import TimerDisplay from './components/TimerDisplay';
import ScoreDisplay from './components/ScoreDisplay';
import WordDisplay from './components/WordDisplay';
import TypingInput from './components/TypingInput';
import GameControls from './components/GameControls';
import GameOverScreen from './components/GameOverScreen';

// --- Web Audio API Setup ---
let audioCtx;
const getAudioContext = () => {
    if (!audioCtx && (typeof window !== 'undefined')) { // Check for window for SSR safety
        try {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.error("Web Audio API is not supported or could not be initialized.", e);
            audioCtx = null; // Ensure it's null if failed
        }
    }
    return audioCtx;
};

const playTone = (frequency, duration = 100, type = 'sine', volume = 0.3) => {
    try {
        const context = getAudioContext();
        if (!context || context.state === 'suspended') {
            // Attempt to resume context if suspended (e.g., due to autoplay policies)
            context?.resume().then(() => {
                if (context.state === 'running') {
                    // Retry playing tone now that context is running
                    playToneInternal(context, frequency, duration, type, volume);
                }
            });
            if (context?.state !== 'running') return; // Don't proceed if not running
        }
        playToneInternal(context, frequency, duration, type, volume);
    } catch (error) {
        console.warn("Web Audio API error in playTone:", error);
    }
};

const playToneInternal = (context, frequency, duration, type, volume) => {
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, context.currentTime);

    gainNode.gain.setValueAtTime(volume, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + duration / 1000);

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.start();
    oscillator.stop(context.currentTime + duration / 1000);
}


const SOUNDS = {
    TYPE_CORRECT: () => playTone(880, 50, 'triangle', 0.2),
    TYPE_ERROR: () => playTone(220, 100, 'square', 0.15),
    WORD_COMPLETE: () => playTone(1200, 150, 'sine', 0.25),
    GAME_OVER: () => playTone(150, 500, 'sawtooth', 0.2),
};
// --- Fin Web Audio API Setup ---
const ENGLISH_WORDS = [
    "ability", "able", "about", "above", "accept", "according", "account", "across", "action", "activity",
    "actually", "address", "admin", "advance", "affect", "after", "again", "against", "agency", "agent",
    "agree", "ahead", "allow", "almost", "alone", "along", "already", "also", "although", "always",
    "amazing", "among", "amount", "analysis", "animal", "another", "answer", "anyone", "anything", "appear",
    "apply", "approach", "area", "argue", "around", "arrive", "article", "artist", "assume", "attack",
    "attempt", "attend", "author", "autumn", "avenue", "average", "avoid", "award", "aware", "away",
    "awful", "baby", "back", "background", "balance", "barely", "battle", "beautiful", "became", "because",
    "become", "before", "begin", "behavior", "behind", "believe", "belong", "below", "benefit", "beside",
    "better", "between", "beyond", "billion", "birth", "black", "blood", "board", "body", "book",
    "border", "bottle", "bottom", "boundary", "break", "bridge", "brief", "bright", "bring", "broad",
    "brother", "brown", "build", "building", "burden", "business", "button", "cable", "calculate", "camera",
    "campaign", "cancel", "cancer", "candidate", "capital", "capture", "career", "careful", "carry", "catch",
    "cause", "ceiling", "center", "central", "century", "certain", "chair", "challenge", "chance", "change",
    "chapter", "character", "charge", "chart", "check", "chief", "child", "choice", "choose", "church",
    "circle", "citizen", "claim", "class", "clear", "client", "climb", "clock", "close", "cloud",
    "cluster", "coach", "coast", "coffee", "cold", "collect", "college", "color", "combine", "comfort",
    "command", "comment", "commit", "common", "company", "compare", "compete", "complete", "complex", "compute",
    "concept", "concern", "concert", "condition", "conduct", "confirm", "conflict", "connect", "consider", "consist",
    "contact", "contain", "content", "context", "continue", "contract", "control", "convert", "corner", "correct",
    "could", "count", "country", "couple", "course", "court", "cover", "create", "credit", "crime",
    "crisis", "critic", "cross", "crowd", "crystal", "culture", "current", "custom", "cycle", "daily",
    "damage", "dance", "danger", "dark", "data", "database", "daughter", "debate", "decade", "decide",
    "declare", "decline", "deep", "defend", "define", "degree", "delay", "deliver", "demand", "depend",
    "deploy", "depth", "derive", "describe", "design", "desire", "despite", "destroy", "detail", "detect",
    "develop", "device", "devote", "dialog", "differ", "difficult", "digital", "direct", "discuss", "display",
    "distance", "divide", "doctor", "document", "domain", "double", "doubt", "download", "dream", "drive",
    "during", "early", "earth", "easily", "eastern", "economic", "edition", "editor", "educate", "effect",
    "effort", "either", "elect", "element", "else", "email", "emerge", "employ", "enable", "energy",
    "engage", "engine", "enjoy", "enough", "ensure", "enter", "entire", "entry", "environ", "equal",
    "error", "escape", "especial", "essay", "estate", "event", "every", "examine", "example", "except",
    "exchange", "excite", "excuse", "execute", "exist", "expect", "expense", "expert", "explain", "export",
    "express", "extend", "extent", "extra", "extreme", "factor", "faculty", "failure", "false", "family",
    "famous", "farmer", "fashion", "father", "fault", "favor", "feature", "federal", "feeling", "female",
    "field", "fight", "figure", "final", "finance", "finger", "finish", "fire", "first", "fiscal",
    "fitness", "flavor", "float", "floor", "focus", "follow", "force", "foreign", "forest", "forget",
    "formal", "format", "former", "forward", "found", "frame", "framework", "freedom", "friend", "front",
    "fruit", "fully", "function", "future", "gallery", "garden", "gather", "general", "generate", "genre",
    "giant", "global", "govern", "grade", "grand", "grant", "grass", "great", "green", "ground",
    "group", "growth", "guard", "guess", "guide", "guilty", "habit", "handle", "happen", "happy",
    "hardware", "health", "heavy", "hello", "hence", "highly", "history", "holiday", "hospital", "hotel",
    "house", "however", "human", "hundred", "husband", "ideal", "identify", "image", "imagine", "impact",
    "import", "improve", "indeed", "index", "indicate", "industry", "inform", "initial", "input", "inside",
    "install", "instance", "instead", "insure", "intend", "interact", "interest", "internal", "internet", "into",
    "invest", "invite", "involve", "issue", "itself", "javascript", "journey", "judge", "junior", "keyboard",
    "label", "labor", "language", "large", "later", "launch", "layer", "leader", "learn", "least",
    "leave", "legal", "length", "letter", "level", "library", "license", "light", "limit", "linear",
    "listen", "little", "local", "logic", "login", "longer", "lookup", "machine", "magazine", "mainly",
    "maintain", "major", "manage", "manner", "manual", "margin", "market", "master", "match", "material",
    "matter", "maybe", "measure", "media", "medical", "medium", "member", "memory", "mental", "mention",
    "message", "method", "middle", "might", "military", "million", "minute", "mirror", "miss", "mission",
    "mobile", "model", "modern", "module", "moment", "money", "monitor", "month", "moral", "morning",
    "mother", "motion", "motor", "mount", "mouse", "mouth", "movie", "music", "mutual", "myself",
    "narrow", "nation", "native", "natural", "nearly", "network", "never", "notice", "novel", "number",
    "object", "observe", "obtain", "obvious", "occur", "ocean", "offer", "office", "often", "online",
    "onto", "open", "operate", "opinion", "option", "order", "organ", "original", "other", "ought",
    "output", "outside", "overall", "owner", "package", "paint", "panel", "paper", "parent", "parking",
    "partner", "party", "passage", "patient", "pattern", "payment", "peace", "people", "percent", "perform",
    "period", "permit", "person", "phase", "phone", "photo", "phrase", "physical", "piano", "picture",
    "piece", "pilot", "place", "plain", "planet", "plant", "plastic", "plate", "platform", "player",
    "please", "plenty", "pocket", "point", "police", "policy", "polish", "polite", "portal", "portion",
    "positive", "possess", "possible", "postal", "power", "practice", "prefer", "prepare", "present", "press",
    "pretty", "prevent", "price", "pride", "prime", "print", "prior", "private", "prize", "problem",
    "proceed", "process", "produce", "product", "profile", "profit", "program", "project", "promise", "promote",
    "prompt", "proof", "proper", "propose", "protect", "protein", "provide", "public", "publish", "purchase",
    "purpose", "python", "quality", "quarter", "question", "quick", "quiet", "quite", "radio", "raise",
    "random", "range", "rapid", "rather", "reach", "react", "reader", "ready", "real", "reason",
    "receive", "recent", "record", "recover", "reduce", "refer", "reflect", "reform", "regard", "region",
    "regular", "reject", "relate", "release", "rely", "remain", "remember", "remote", "remove", "render",
    "repair", "repeat", "replace", "reply", "report", "request", "require", "rescue", "research", "reserve",
    "resist", "resolve", "resort", "respect", "respond", "rest", "result", "return", "reveal", "review",
    "reward", "right", "river", "robot", "robust", "rocket", "route", "routine", "royal", "running",
    "sample", "satisfy", "scale", "scene", "scheme", "school", "science", "scope", "score", "screen",
    "script", "search", "season", "second", "secret", "section", "secure", "select", "senior", "sense",
    "sensor", "series", "serious", "server", "service", "session", "settle", "seven", "severe", "shadow",
    "shake", "shall", "shape", "share", "sharp", "sheet", "shelf", "shift", "shine", "short",
    "should", "shout", "shower", "shrink", "shuffle", "signal", "silent", "silver", "similar", "simple",
    "since", "single", "sister", "skill", "sleep", "slight", "slope", "small", "smart", "smile",
    "smooth", "social", "socket", "soft", "solar", "solid", "solve", "some", "sorry", "sound",
    "source", "south", "space", "speak", "special", "specify", "speed", "spend", "spirit", "split",
    "sport", "spread", "spring", "square", "stable", "staff", "stage", "stand", "standard", "start",
    "state", "static", "status", "steel", "stick", "still", "stock", "stone", "store", "storm",
    "story", "straight", "strange", "stream", "street", "stress", "strict", "string", "stroke", "strong",
    "struct", "student", "studio", "study", "stuff", "style", "subject", "submit", "subtle", "success",
    "such", "sudden", "suffer", "sugar", "suggest", "suite", "summer", "super", "supply", "support",
    "suppose", "surface", "survey", "sustain", "switch", "symbol", "system", "table", "tackle", "talent",
    "target", "taste", "teach", "team", "tech", "tell", "tenant", "tender", "tense", "terminal",
    "terms", "terror", "thank", "theme", "theory", "there", "these", "thick", "thing", "think",
    "third", "those", "though", "thread", "threat", "three", "throw", "thumb", "ticket", "tight",
    "timer", "title", "today", "token", "tooth", "topic", "total", "touch", "tough", "toward",
    "trace", "track", "trade", "traffic", "train", "transfer", "transit", "travel", "treat", "trend",
    "trial", "trigger", "tropical", "trouble", "truck", "truly", "trust", "truth", "tunnel", "twice",
    "twist", "typing", "under", "union", "unique", "unit", "united", "unless", "until", "update",
    "upload", "upper", "urban", "useful", "usual", "value", "various", "vehicle", "vendor", "verbal",
    "verify", "version", "versus", "vessel", "video", "virtual", "virus", "vision", "visit", "visual",
    "vital", "voice", "volume", "voting", "waiting", "wander", "warning", "watch", "water", "wealth",
    "weather", "website", "weight", "welcome", "western", "whatever", "wheel", "where", "whether", "which",
    "while", "white", "whole", "whose", "widget", "width", "willing", "window", "winter", "wireless",
    "wisdom", "within", "without", "woman", "wonder", "wooden", "worker", "world", "worry", "worth",
    "would", "wound", "writer", "wrong", "yellow", "yield", "young", "yourself", "youth", "zone"
];

const LEADERBOARD_KEY = 'typingGameLeaderboard';
const MAX_LEADERBOARD_ENTRIES = 5;
const AVAILABLE_DURATIONS = [30, 60, 90, 120];

function App() {
    const [selectedDuration, setSelectedDuration] = useState(60);
    const [timeLeft, setTimeLeft] = useState(selectedDuration);
    const [score, setScore] = useState(0);
    const [currentWord, setCurrentWord] = useState('');
    const [typedText, setTypedText] = useState('');
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [inputErrorShake, setInputErrorShake] = useState(false);
    const [wordCompleted, setWordCompleted] = useState(false);
    const [newWordEntry, setNewWordEntry] = useState(false);
    const [leaderboard, setLeaderboard] = useState([]);
    const [soundsEnabled, setSoundsEnabled] = useState(true);

    const inputRef = useRef(null);
    const audioContextInitialized = useRef(false);

    const initializeAudio = useCallback(() => {
        if (!audioContextInitialized.current) {
            const context = getAudioContext();
            if (context && context.state === 'suspended') {
                context.resume().catch(err => console.warn("Error resuming AudioContext on demand:", err));
            }
            audioContextInitialized.current = true;
        }
    }, []);

    useEffect(() => {
        const loadedScores = JSON.parse(localStorage.getItem(LEADERBOARD_KEY)) || [];
        setLeaderboard(loadedScores);
    }, []);

    const getRandomWord = useCallback(() => {
        const randomIndex = Math.floor(Math.random() * ENGLISH_WORDS.length);
        return ENGLISH_WORDS[randomIndex];
    }, []);

    const resetWordAnimations = () => {
        setWordCompleted(false);
        setNewWordEntry(false);
    };

    const prepareNewWord = useCallback(() => {
        const newWord = getRandomWord();
        setCurrentWord(newWord);
        setTypedText('');
        setNewWordEntry(true);
        const animationDuration = 500 + newWord.length * 30;
        setTimeout(() => setNewWordEntry(false), animationDuration);
    }, [getRandomWord]);

    const saveScoreToLeaderboard = useCallback((playerName, finalScore, finalWPM) => {
        const newEntry = { name: playerName, score: finalScore, wpm: finalWPM, date: new Date().toLocaleDateString() };
        setLeaderboard(prevLeaderboard => {
            const updatedLeaderboard = [...prevLeaderboard, newEntry]
                .sort((a, b) => b.score - a.score || b.wpm - a.wpm)
                .slice(0, MAX_LEADERBOARD_ENTRIES);
            localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updatedLeaderboard));
            return updatedLeaderboard;
        });
    }, []);

    const handleActualGameStart = () => {
        initializeAudio();
        resetWordAnimations();
        setTimeLeft(selectedDuration);
        setScore(0);
        setTypedText(''); // Asegurar que el input esté limpio
        setGameStarted(true);
        setGameOver(false);
        prepareNewWord();
    };

    const returnToSetup = () => {
        setGameOver(false);
        setGameStarted(false);
        // No es necesario resetear timeLeft aquí, ya que se hará al elegir la duración o al iniciar
    };

    const calculateWPM = useCallback(() => {
        if (score === 0) return 0;
        const timeSpentSoFar = selectedDuration - timeLeft;
        if (timeSpentSoFar <= 0 && timeLeft < selectedDuration && gameStarted) return 0;
        const durationInMinutes = gameOver ? (selectedDuration / 60) : (timeSpentSoFar / 60);
        if (durationInMinutes === 0) return 0;
        const wordsTyped = score / 5;
        return Math.round(wordsTyped / durationInMinutes);
    }, [score, timeLeft, gameOver, gameStarted, selectedDuration]);

    useEffect(() => {
        let timerId;
        if (gameStarted && timeLeft > 0 && !gameOver) {
            timerId = setTimeout(() => setTimeLeft(prevTime => prevTime - 1), 1000);
        } else if (timeLeft === 0 && gameStarted && !gameOver) {
            if (soundsEnabled) SOUNDS.GAME_OVER();
            setGameOver(true);
            setGameStarted(false);
            resetWordAnimations();
            (async () => {
                await new Promise(resolve => setTimeout(resolve, 100));
                const finalScore = score;
                const finalWPM = calculateWPM();
                if (finalScore > 0) {
                    const playerName = prompt(`Game Over!\nYour Score: ${finalScore}, WPM: ${finalWPM}\nEnter your name:`, "Player");
                    if (playerName) saveScoreToLeaderboard(playerName.trim() || "Player", finalScore, finalWPM);
                } else {
                    alert(`Game Over!\nYour Score: ${finalScore}, WPM: ${finalWPM}`);
                }
            })();
        }
        return () => clearTimeout(timerId);
    }, [timeLeft, gameStarted, gameOver, score, saveScoreToLeaderboard, calculateWPM, soundsEnabled, selectedDuration]);


    useEffect(() => {
        if (gameStarted && !gameOver && !wordCompleted && inputRef.current) {
            inputRef.current.focus();
        }
    }, [gameStarted, gameOver, wordCompleted, currentWord]);

    const handleInputChange = (e) => {
        if (!gameStarted || gameOver || wordCompleted) return;
        const newTypedText = e.target.value;
        const prevTypedText = typedText;

        initializeAudio();

        if (newTypedText.length > 0 && newTypedText.length <= currentWord.length) {
            const charIndex = newTypedText.length - 1;
            const typedChar = newTypedText[charIndex];
            const expectedChar = currentWord[charIndex];
            if (newTypedText.length > prevTypedText.length) {
                if (typedChar === expectedChar) {
                    if (soundsEnabled) SOUNDS.TYPE_CORRECT();
                } else {
                    if (soundsEnabled) SOUNDS.TYPE_ERROR();
                    setInputErrorShake(true);
                    setTimeout(() => setInputErrorShake(false), 400);
                }
            }
        }
        setTypedText(newTypedText);
        if (newTypedText === currentWord) {
            if (soundsEnabled) SOUNDS.WORD_COMPLETE();
            setScore(prevScore => prevScore + currentWord.length);
            setWordCompleted(true);
            setTimeout(() => {
                resetWordAnimations();
                prepareNewWord();
            }, 600);
        }
    };

    return (
        <div className={`App ${wordCompleted ? 'word-completed-animation' : ''} ${newWordEntry ? 'new-word-entry' : ''}`}>
            <header className="App-header">
                <h1>Fast Typing Game</h1>
                <button
                    onClick={() => {
                        initializeAudio();
                        setSoundsEnabled(!soundsEnabled);
                    }}
                    className="sound-toggle-button"
                    title={soundsEnabled ? "Disable Sounds" : "Enable Sounds"}
                >
                    {soundsEnabled ? '🔊' : '🔇'}
                </button>
            </header>
            <main>
                {(!gameStarted && !gameOver) && (
                    <GameControls
                        selectedDuration={selectedDuration}
                        onDurationChange={(newDuration) => {
                            setSelectedDuration(newDuration);
                            setTimeLeft(newDuration); // Actualizar timeLeft inmediatamente al cambiar la duración
                        }}
                        availableDurations={AVAILABLE_DURATIONS}
                        onStartGame={handleActualGameStart}
                        gameStarted={false}
                        leaderboard={leaderboard}
                        maxLeaderboardEntries={MAX_LEADERBOARD_ENTRIES}
                    />
                )}

                {gameStarted && !gameOver && (
                    <div className="game-area">
                        <div className="stats-container">
                            <TimerDisplay timeLeft={timeLeft} />
                            <ScoreDisplay score={score} />
                        </div>
                        <WordDisplay
                            currentWord={currentWord}
                            typedText={typedText}
                            gameStarted={gameStarted}
                            gameOver={gameOver}
                            newWordEntry={newWordEntry}
                        />
                        <TypingInput
                            ref={inputRef}
                            value={typedText}
                            onChange={handleInputChange}
                            placeholder="Type the word here..."
                            disabled={!gameStarted || gameOver || wordCompleted}
                            className={inputErrorShake ? 'input-error-shake' : ''}
                        />
                    </div>
                )}

                {gameOver && (
                    <GameOverScreen
                        score={score}
                        wpm={calculateWPM()}
                        onRestartGame={returnToSetup}
                        leaderboard={leaderboard}
                        maxLeaderboardEntries={MAX_LEADERBOARD_ENTRIES}
                    />
                )}
            </main>
        </div>
    );
}

export default App;