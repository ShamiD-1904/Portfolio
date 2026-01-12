import { useEffect, useRef, useState } from "react";

const GLITCH_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`";

const useGlitchEffect = (
  targetWords = ["Build", "Innovate", "Deliver"],
  holdDuration = 2000,
  glitchDuration = 900
) => {
  const [currentWord, setCurrentWord] = useState(targetWords[0]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const glitchIntervalRef = useRef(null);
  const targetWordsRef = useRef(targetWords);

  useEffect(() => {
    targetWordsRef.current = targetWords;
  }, [targetWords]);

  useEffect(() => {
    const scrambleText = (targetWord, currentIteration, maxIterations) => {
      if (currentIteration >= maxIterations) return targetWord;
      
      const progress = currentIteration / maxIterations;
      
      return targetWord.split('').map((char, index) => {
        if (index < targetWord.length * progress) {
          return targetWord[index];
        }
        return Math.random() < 0.5 
          ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
          : ""
      }).join('');
    };

    const transitionToNextWord = () => {
      const nextIndex = (currentWordIndex + 1) % targetWordsRef.current.length;
      const nextWord = targetWordsRef.current[nextIndex];
      
      let iteration = 0;
      const maxIterations = Math.floor(glitchDuration / 60);
      
      if (glitchIntervalRef.current) {
        clearInterval(glitchIntervalRef.current);
      }
      
      glitchIntervalRef.current = setInterval(() => {
        if (iteration < maxIterations) {
          setCurrentWord(scrambleText(nextWord, iteration, maxIterations));
          iteration++;
        } else {
          setCurrentWord(nextWord);
          setCurrentWordIndex(nextIndex);
          clearInterval(glitchIntervalRef.current);
        }
      }, 60);
    };

    const startCyclingTimeout = setTimeout(() => {
      transitionToNextWord();
    }, holdDuration);

    return () => {
      clearTimeout(startCyclingTimeout);
      if (glitchIntervalRef.current) {
        clearInterval(glitchIntervalRef.current);
      }
    };
  }, [currentWordIndex, holdDuration, glitchDuration]);

  return currentWord;
};

export default useGlitchEffect;
