export const slideDown = {
  initial: { opacity: 0, y: -5 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      duration: 0.3,
      stiffness: 100,
      damping: 5,
    },
  },
};
