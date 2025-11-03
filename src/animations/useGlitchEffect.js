import { useEffect, useRef, useState } from "react";

// Character sets for glitch effect
const GLITCH_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`";


/**
 * Custom Hook: useGlitchEffect
 * Handles the continuous cycling glitch effect for words
 * 
 * @param {Array} targetWords - Array of words to cycle through
 * @param {number} holdDuration - How long to hold each word before transitioning (ms)
 * @param {number} glitchDuration - How long the glitch transition takes (ms)
 * @returns {string} currentWord - The current word being displayed
 */
const useGlitchEffect = (
  targetWords = ["Build", "Innovate", "Deliver"],
  holdDuration = 2000,
  glitchDuration = 900
) => {
  // ============================================================================
  // STATE - Track current word
  // ============================================================================
  const [currentWord, setCurrentWord] = useState(targetWords[0]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const glitchIntervalRef = useRef(null);
  const targetWordsRef = useRef(targetWords);  // Store in ref to avoid dependency issues

  // Update ref when targetWords changes
  useEffect(() => {
    targetWordsRef.current = targetWords;
  }, [targetWords]);

  useEffect(() => {
    /**
     * FUNCTION: scrambleText
     * Creates the glitch effect by scrambling characters
     * Characters are gradually revealed from left to right
     * 
     * @param {string} targetWord - The final word to reveal
     * @param {number} currentIteration - Current animation frame
     * @param {number} maxIterations - Total animation frames
     * @returns {string} - Scrambled version of the word
     */
    const scrambleText = (targetWord, currentIteration, maxIterations) => {
      if (currentIteration >= maxIterations) return targetWord;
      
      const progress = currentIteration / maxIterations;
      
      return targetWord.split('').map((char, index) => {
        // If this character position should be revealed (left-to-right reveal)
        if (index < targetWord.length * progress) {
          return targetWord[index];  // Show correct character
        }
        // Otherwise, show random glitch character
        return Math.random() < 0.5 
          ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
          : ""
      }).join('');
    };

    /**
     * FUNCTION: transitionToNextWord
     * Handles the glitch transition from current word to next word
     * 
     * ANIMATION SEQUENCE:
     * 1. Calculate next word index (wraps around using modulo %)
     * 2. Clear any existing glitch animation
     * 3. Start interval that runs every 60ms
     * 4. Each frame: scramble the word with increasing progress
     * 5. After iterations complete: show final word and update index
     */
    const transitionToNextWord = () => {
      const nextIndex = (currentWordIndex + 1) % targetWordsRef.current.length;  // Cycle: 0→1→2→0
      const nextWord = targetWordsRef.current[nextIndex];
      
      let iteration = 0;
      const maxIterations = Math.floor(glitchDuration / 60);  // Calculate iterations based on duration
      
      // Clean up any existing glitch animation
      if (glitchIntervalRef.current) {
        clearInterval(glitchIntervalRef.current);
      }
      
      // Start the glitch animation interval
      glitchIntervalRef.current = setInterval(() => {
        if (iteration < maxIterations) {
          // Update word with scrambled version
          setCurrentWord(scrambleText(nextWord, iteration, maxIterations));
          iteration++;
        } else {
          // Animation complete: set final word and update index
          setCurrentWord(nextWord);
          setCurrentWordIndex(nextIndex);  // This triggers useEffect again for next cycle
          clearInterval(glitchIntervalRef.current);
        }
      }, 60);  // 60ms per frame
    };

    // Schedule the next word transition after hold duration
    const startCyclingTimeout = setTimeout(() => {
      transitionToNextWord();
    }, holdDuration);

    // Cleanup function: clear timers when component unmounts or effect re-runs
    return () => {
      clearTimeout(startCyclingTimeout);
      if (glitchIntervalRef.current) {
        clearInterval(glitchIntervalRef.current);
      }
    };
  }, [currentWordIndex, holdDuration, glitchDuration]);  // Removed targetWords from dependencies

  return currentWord;
};

export default useGlitchEffect;
