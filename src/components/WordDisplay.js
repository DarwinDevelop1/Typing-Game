// src/components/WordDisplay.js
import React from 'react';

const WordDisplay = ({ currentWord, typedText, gameStarted, gameOver, newWordEntry }) => {
    // --- AÑADIR ESTA GUARDA ---
    if (typeof currentWord !== 'string' || currentWord === null || currentWord === undefined) {
        // Si currentWord no es un string válido, renderiza un div vacío o un placeholder.
        // Esto previene el error .split() en un valor no válido.
        // Puedes retornar null si no quieres que se renderice nada en este caso.
        return <div className="word-display"></div>;
    }
    // --- FIN DE LA GUARDA ---

    return (
        <div className={`word-display ${gameStarted ? 'active-word' : ''}`}>
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

                return (
                    <span key={`${currentWord}-${index}`} className={charClass.trim()} style={style}>
                        {char}
                    </span>
                );
            })}
        </div>
    );
};

export default WordDisplay;