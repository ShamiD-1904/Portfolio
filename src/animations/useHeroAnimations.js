import { useEffect } from "react";
import gsap from "gsap";

const useHeroAnimations = (refs) => {
  useEffect(() => {
    const { slideRef, slideItemsRef, headline1Ref, headline2Ref, introRef, descRef } = refs;

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" }
    });

    gsap.set(
      [slideRef.current, headline1Ref.current, headline2Ref.current, introRef.current, descRef.current], 
      {
        opacity: 0,
        y: 30
      }
    );

    gsap.set(slideItemsRef.current, {
      opacity: 0,
      x: -20,
      scale: 0.95
    });

    tl
      .to(slideRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.3
      })
      .to(slideItemsRef.current, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.4,
        stagger: 0.08,
        ease: "back.out(1.2)"
      }, "-=0.2")
      .to(headline1Ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.8
      }, "-=0.4")
      .to(headline2Ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.8
      }, "-=0.5")
      .to(introRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7
      }, "-=0.4")
      .to(descRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7
      }, "-=0.5");

    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useHeroAnimations;
