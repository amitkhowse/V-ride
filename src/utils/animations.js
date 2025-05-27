// utils/animations.js

export const fadeIn = (delay = 0, duration = 0.6) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration, delay, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
});

export const slideUp = (delay = 0, duration = 0.6, y = 50) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0, transition: { duration, delay, ease: "easeOut" } },
  exit: { opacity: 0, y, transition: { duration: 0.3 } },
});
