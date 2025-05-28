// src/components/TypingInput.js
import React, { forwardRef } from 'react';

const TypingInput = forwardRef(({ value, onChange, disabled, placeholder, className }, ref) => {
    return (
        <input
            ref={ref}
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete="off"
            spellCheck="false"
            className={className}
        />
    );
});

export default TypingInput;