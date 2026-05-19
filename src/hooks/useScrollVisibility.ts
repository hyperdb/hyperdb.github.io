import { useEffect, useRef, useState } from "react";

type UseScrollVisibilityOptions = {
  restoreDelay?: number;
};

export const useScrollVisibility = (options: UseScrollVisibilityOptions = {}) => {
  const { restoreDelay = 200 } = options;
  const [isVisible, setIsVisible] = useState(true);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(false);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = window.setTimeout(() => {
        setIsVisible(true);
      }, restoreDelay);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [restoreDelay]);

  return { isVisible };
};
