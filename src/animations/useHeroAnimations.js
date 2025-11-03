import { useEffect } from "react";
import gsap from "gsap";

/**
 * Custom Hook: useHeroAnimations
 * Handles all GSAP-based staggered reveal animations for the Hero section
 * 
 * @param {Object} refs - Object containing all the refs for elements to animate
 * @param {Object} refs.slideRef - Container for sliding words
 * @param {Object} refs.slideItemsRef - Array of individual sliding word elements
 * @param {Object} refs.headline1Ref - First headline ref
 * @param {Object} refs.headline2Ref - Second headline ref (glitch word)
 * @param {Object} refs.introRef - Introduction text ref
 * @param {Object} refs.descRef - Description text ref
 */
const useHeroAnimations = (refs) => {
  useEffect(() => {
    // Destructure refs for cleaner code
    const { slideRef, slideItemsRef, headline1Ref, headline2Ref, introRef, descRef } = refs;

    // Create GSAP timeline for sequencing animations
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" }  // Smooth deceleration easing
    });

    // ============================================================================
    // INITIAL HIDDEN STATE
    // Set all elements to invisible and offset before animation starts
    // ============================================================================
    gsap.set(
      [slideRef.current, headline1Ref.current, headline2Ref.current, introRef.current, descRef.current], 
      {
        opacity: 0,
        y: 30  // Start 30px below final position
      }
    );

    // Set initial state for individual sliding word items
    gsap.set(slideItemsRef.current, {
      opacity: 0,
      x: -20,      // Start 20px to the left
      scale: 0.95  // Start slightly smaller
    });

    // ============================================================================
    // STAGGERED REVEAL ANIMATION SEQUENCE
    // Timeline animations with overlapping timing (using "-=" for smooth flow)
    // ============================================================================
    tl
      // 1. Reveal the sliding words container (From Ideas, To Code, To Reality)
      .to(slideRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.3  // Initial delay before anything animates
      })
      // 2. Reveal individual sliding word items with stagger
      .to(slideItemsRef.current, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.4,
        stagger: 0.08,              // 0.1s delay between each item
        ease: "back.out(1.2)"      // Bouncy easing for playful effect
      }, "-=0.2")  // Start 0.2s before previous animation ends
      // 3. Reveal "Engineering Solutions. Delivering Results."
      .to(headline1Ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.8
      }, "-=0.4")
      // 4. Reveal the glitching word "Build" (which will later cycle)
      .to(headline2Ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.8
      }, "-=0.5")
      // 5. Reveal "Hey, I'm Shamishka,"
      .to(introRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7
      }, "-=0.4")
      // 6. Reveal role descriptions
      .to(descRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7
      }, "-=0.5");

    // Cleanup function: kill timeline on unmount
    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);  // Empty dependency array - run only once on mount
};

export default useHeroAnimations;
