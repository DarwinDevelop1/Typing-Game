// src/App.js
import React, { useState, useEffect, useRef } from 'react';
import './App.css'; // El mismo App.css de antes funciona bien

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

const GAME_DURATION = 60;
const LEADERBOARD_KEY = 'typingGameLeaderboard';
const MAX_LEADERBOARD_ENTRIES = 5;

function App() {
    const [currentWord, setCurrentWord] = useState('');
    const [typedText, setTypedText] = useState('');
    const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
    const [score, setScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [inputErrorShake, setInputErrorShake] = useState(false);
    const [wordCompleted, setWordCompleted] = useState(false);
    const [newWordEntry, setNewWordEntry] = useState(false);
    const [leaderboard, setLeaderboard] = useState([]); // Estado para el leaderboard

    const inputRef = useRef(null);
    const wordDisplayRef = useRef(null);

    // Cargar leaderboard desde localStorage al montar
    useEffect(() => {
        const loadedScores = JSON.parse(localStorage.getItem(LEADERBOARD_KEY)) || [];
        setLeaderboard(loadedScores);
    }, []);

    const getRandomWord = () => {
        const randomIndex = Math.floor(Math.random() * ENGLISH_WORDS.length);
        return ENGLISH_WORDS[randomIndex];
    };

    const resetWordAnimations = () => {
        setWordCompleted(false);
        setNewWordEntry(false);
    };

    const prepareNewWord = () => {
        const newWord = getRandomWord();
        setCurrentWord(newWord);
        setTypedText('');
        setNewWordEntry(true);
        setTimeout(() => setNewWordEntry(false), 500 + newWord.length * 30);
    };

    const startGame = () => {
        resetWordAnimations();
        setTimeLeft(GAME_DURATION);
        setScore(0);
        setGameStarted(true);
        setGameOver(false);
        prepareNewWord();
        // NO VAMOS A PONER inputRef.current.focus() AQUÍ AÚN para simular el error
    };

    const calculateWPM = () => {
        if (score === 0) return 0; // Si no hay score, WPM es 0
        // Si el juego no ha terminado, calculamos sobre el tiempo transcurrido
        // Si el juego terminó, calculamos sobre la duración total del juego
        const timeSpentInMinutes = gameOver ? (GAME_DURATION / 60) : (GAME_DURATION - timeLeft) / 60;
        if (timeSpentInMinutes === 0) return 0;
        const wordsTyped = score / 5; // Asumiendo 5 caracteres por palabra
        return Math.round(wordsTyped / timeSpentInMinutes);
    };

    // Guardar puntuación en el leaderboard
    const saveScoreToLeaderboard = (playerName, finalScore, finalWPM) => {
        const newEntry = {
            name: playerName,
            score: finalScore,
            wpm: finalWPM,
            date: new Date().toLocaleDateString()
        };
        const updatedLeaderboard = [...leaderboard, newEntry]
            .sort((a, b) => b.score - a.score || b.wpm - a.wpm) // Ordenar por score, luego por WPM
            .slice(0, MAX_LEADERBOARD_ENTRIES); // Mantener solo los mejores N

        setLeaderboard(updatedLeaderboard);
        localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updatedLeaderboard));
    };

    useEffect(() => {
        let timerId;
        if (gameStarted && timeLeft > 0 && !gameOver) {
            timerId = setTimeout(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0 && gameStarted && !gameOver) { // Asegurarse que no se ejecute si ya es gameOver
            setGameOver(true);
            setGameStarted(false);
            resetWordAnimations();

            // Retrasar un poco el prompt para que el estado de gameOver se actualice en la UI
            setTimeout(() => {
                const finalScore = score; // Capturar el score actual
                const finalWPM = calculateWPM(); // Calcular WPM con el estado actual
                if (finalScore > 0) {
                    const playerName = prompt(`Game Over!\nYour Score: ${finalScore}, WPM: ${finalWPM}\nEnter your name for the leaderboard:`, "Player");
                    if (playerName) {
                        saveScoreToLeaderboard(playerName, finalScore, finalWPM);
                    }
                } else {
                    alert(`Game Over!\nYour Score: ${finalScore}, WPM: ${finalWPM}`);
                }
            }, 100); // Pequeño delay
        }
        return () => clearTimeout(timerId);
        // OJO: Añadimos 'score' a las dependencias para que 'finalScore' y 'finalWPM' se capturen correctamente
        // al final del juego.
    }, [timeLeft, gameStarted, gameOver, score, saveScoreToLeaderboard]); // Añadir saveScoreToLeaderboard como dependencia

    const handleInputChange = (e) => {
        if (!gameStarted || gameOver || wordCompleted) return;

        const newTypedText = e.target.value;

        if (newTypedText.length > 0 && newTypedText.length <= currentWord.length) {
            const lastTypedChar = newTypedText[newTypedText.length - 1];
            const correspondingWordChar = currentWord[newTypedText.length - 1];
            if (lastTypedChar !== correspondingWordChar) {
                setInputErrorShake(true);
                setTimeout(() => setInputErrorShake(false), 400);
            }
        }

        setTypedText(newTypedText);

        if (newTypedText === currentWord) {
            setScore(prevScore => prevScore + currentWord.length);
            setWordCompleted(true);

            setTimeout(() => {
                resetWordAnimations();
                prepareNewWord();
                // NO VAMOS A PONER inputRef.current.focus() AQUÍ AÚN
            }, 600);
        }
    };

    // No se añade el useEffect para enfocar el input deliberadamente para esta parte

    return (
        <div className={`App ${wordCompleted ? 'word-completed-animation' : ''} ${newWordEntry ? 'new-word-entry' : ''}`}>
            <header className="App-header">
                <h1>Fast Typing Game</h1>
            </header>
            <main>
                {(!gameStarted && !gameOver) && ( // Botón de inicio o Leaderboard si no hay juego activo
                    <>
                        <button onClick={startGame} className="start-button">
                            Start Game
                        </button>
                        {leaderboard.length > 0 && (
                            <div className="leaderboard-container">
                                <h3>Leaderboard (Top {MAX_LEADERBOARD_ENTRIES})</h3>
                                <ol className="leaderboard-list">
                                    {leaderboard.map((entry, index) => (
                                        <li key={index}>
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
                )}

                {gameStarted && !gameOver && (
                    <div className="game-area">
                        <div className="stats-container">
                            <p className={`timer ${timeLeft <= 10 && timeLeft > 0 ? 'low-time' : ''}`}>Time: {timeLeft}s</p>
                            <p className="score">Score: {score}</p>
                        </div>
                        <div ref={wordDisplayRef} className={`word-display ${gameStarted ? 'active-word' : ''}`}>
                            {currentWord.split('').map((char, index) => {
                                let charClass = '';
                                const isTyped = index < typedText.length;
                                const isCurrentChar = index === typedText.length;

                                if (isTyped) {
                                    charClass += ' typed';
                                    if (typedText[index] === char) {
                                        charClass += ' correct';
                                    } else {
                                        charClass += ' incorrect';
                                    }
                                }
                                if (isCurrentChar && gameStarted && !gameOver) {
                                    charClass += ' cursor';
                                }

                                const style = newWordEntry ? { '--char-index': index } : {};

                                return <span key={`${currentWord}-${index}`} className={charClass.trim()} style={style}>{char}</span>;
                            })}
                        </div>
                        <input
                            ref={inputRef}
                            type="text"
                            value={typedText}
                            onChange={handleInputChange}
                            placeholder="Type the word here..."
                            disabled={!gameStarted || gameOver || wordCompleted}
                            // autoFocus // Podríamos quitarlo temporalmente si queremos forzar el error de enfoque
                            autoComplete="off"
                            spellCheck="false"
                            className={inputErrorShake ? 'input-error-shake' : ''}
                        />
                    </div>
                )}

                {gameOver && ( // Pantalla de Game Over y Leaderboard
                    <>
                        <div className="game-over">
                            <h2>Game Over!</h2>
                            <p>Your Final Score: <strong>{score}</strong></p>
                            <p>WPM: <strong>{calculateWPM()}</strong></p>
                            <button onClick={startGame} className="restart-button">
                                Play Again
                            </button>
                        </div>
                        {leaderboard.length > 0 && (
                            <div className="leaderboard-container">
                                <h3>Leaderboard (Top {MAX_LEADERBOARD_ENTRIES})</h3>
                                <ol className="leaderboard-list">
                                    {leaderboard.map((entry, index) => (
                                        <li key={index}>
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
                )}
            </main>
        </div>
    );
}

export default App;