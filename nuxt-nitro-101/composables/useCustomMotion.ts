import { useMotion } from "@vueuse/motion";

export const useSlideDownMotion = () => {
  const el = ref<HTMLElement>();
  useMotion(el, {
    initial: { opacity: 0, y: "-3px" },
    enter: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 5 },
    },
  });
  return el;
};
