import { useState, useEffect } from "react";
import debounce from 'lodash/debounce';

export default function useScroll() {
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  function handleScroll() {
    const win: Window = window;
    setScrollPosition(win.scrollY);
  }

  useEffect(() => {
    const debounceWrapper = debounce(handleScroll, 300)
    document.addEventListener("scroll", debounceWrapper);
    return () => document.removeEventListener("scroll", debounceWrapper);
  }, []);

  return scrollPosition;
}