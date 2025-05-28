# React Fast Typing Game 🚀

## 🎮 Live Demo

[**Play the Game Here!**](https://DarwinDevelop1.github.io/Typing-Game)

## 🌟 Overview

A dynamic and engaging fast typing game built with React. Test and improve your typing speed and accuracy with a clean, modern interface, fun animations, and a persistent local leaderboard. This project was developed to showcase modern React practices, state management, and responsive UI design.


## ✨ Features

*   **Dynamic Word Generation:** Fetches random words for a new challenge each time.
*   **Real-time Feedback:** Instant visual cues for correct and incorrect keystrokes.
*   **Timer & Scoring:** Classic game mechanics with a countdown timer and a scoring system based on typed characters.
*   **WPM Calculation:** Calculates and displays Words Per Minute at the end of the game.
*   **Adjustable Game Duration:** Users can select game durations (30s, 60s, 90s, 120s) for varying difficulty.
*   **Engaging Animations:** Smooth CSS animations for word transitions, input feedback, and UI elements.
*   **Sound Effects:** Subtle audio feedback for typing, errors, word completion, and game over (can be toggled).
*   **Local Leaderboard:** Saves top scores locally using `localStorage`, encouraging replayability.
*   **Responsive Design:** Adapts наказаниеto different screen sizes for a good experience on desktop and mobile (though primarily designed for keyboard input).
*   **Component-Based Architecture:** Built with a clean, modular structure using React components.

## 🛠️ Tech Stack

*   **Frontend:** React (Hooks: `useState`, `useEffect`, `useCallback`, `useRef`)
*   **Styling:** CSS3 (with Flexbox, Grid, Animations, Transitions)
*   **APIs:** Web Audio API (for sound effects), `localStorage` (for leaderboard)
*   **Development Tools:** VS Code, Git, npm

## 💭 Design & Development Decisions

This section outlines some of the key decisions made during the development process:

*   **State Management:** Primarily used React's built-in `useState` hook for managing component-level and application-level state. For a game of this scale, it provided sufficient control and clarity without the overhead of a global state management library like Redux or Zustand. `useCallback` was employed to memoize functions passed as props or used in `useEffect` dependencies to optimize performance and prevent unnecessary re-renders.
*   **Component Structure:** The application was broken down into smaller, reusable components (`TimerDisplay`, `WordDisplay`, `GameControls`, etc.) to enhance maintainability, readability, and separation of concerns. This follows standard React best practices.
*   **Audio Feedback:** The Web Audio API was chosen for generating simple, dynamic sound effects directly in the browser without needing external audio files. This keeps the application lightweight and avoids issues with asset loading for basic UI sounds. A toggle switch was implemented to respect user preferences for audio.
*   **Error Handling (Input):** Visual feedback (input shake, character highlighting) was prioritized for incorrect keystrokes to immediately inform the user. Sound effects complement this.
*   **Persistence:** `localStorage` was selected for the leaderboard due to its simplicity for client-side storage in a single-player game context. For a multi-user or more complex application, a backend database would be necessary.
*   **Animations:** CSS animations and transitions were used to create a more engaging and "live" user experience. Animations were designed to be smooth and not overly distracting, focusing on feedback for user actions (e.g., word completion, new word entry).
*   **Focus Management:** `useRef` and `useEffect` were used to programmatically manage focus on the typing input, ensuring a seamless experience for the user, especially after a new word is presented or the game restarts. This is crucial for a typing-intensive application.
*   **Accessibility (Basic Considerations):** While not exhaustively audited, considerations like `autoFocus` (managed programmatically), clear visual distinctions, and keyboard-centric design were kept in mind. Further improvements could include ARIA attributes for screen readers.

## 🚀 Getting Started Locally

To get a local copy up and running, follow these simple steps:

### Prerequisites

*   Node.js (v14 or later recommended)
*   npm (usually comes with Node.js) or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/DarwinDevelop1/Typing-Game
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd YOUR_REPO_NAME
    ```
3.  **Install NPM packages:**
    ```bash
    npm install
    ```
    (or `yarn install`)

### Running the Application

1.  **Start the development server:**
    ```bash
    npm start
    ```
    (or `yarn start`)
2.  Open [http://localhost:3000](http://localhost:3000) in your browser to view the game.

## 🔮 Future Enhancements (Ideas)

*   **Difficulty Levels:** Introduce different word sets (e.g., longer words, programming terms, punctuation).
*   **Themes:** Allow users to select different visual themes (e.g., dark/light mode, different color palettes).
*   **Online Leaderboard:** Integrate a backend service (like Firebase) for a global leaderboard.
*   **Enhanced Accessibility:** Further improvements for ARIA roles and screen reader compatibility.
*   **Unit & Integration Tests:** Implement testing with Jest and React Testing Library for core logic and components.
*   **TypeScript Migration:** Convert the project to TypeScript for improved type safety and maintainability.

## 🙏 Acknowledgements (Optional)

*   Inspired by various typing games online.
*   Guidance from online React documentation and community resources.
*   *(If you used specific assets or libraries you want to credit, list them here)*

## 📄 License

This project is licensed under the MIT License - see the `LICENSE` file for details.

---
*Built with ❤️ and React*