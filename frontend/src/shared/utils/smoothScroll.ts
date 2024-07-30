import { RefObject } from "react";

function ease(t: number, b: number, c: number, d: number): number {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t + b;
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
}

export function smoothScrollAlmostToBottom(duration: number, offset: number): void {
  const start: number = window.pageYOffset;
  const end: number = document.body.scrollHeight - window.innerHeight - offset;
  const distance: number = end - start;
  let startTime: number | null = null;

  function animation(currentTime: number): void {
      if (startTime === null) startTime = currentTime;
      const timeElapsed: number = currentTime - startTime;
      const run: number = ease(timeElapsed, start, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  requestAnimationFrame(animation);
}

export function smoothScrollToElement(ref: RefObject<HTMLElement>, duration: number): void {
  if (!ref.current) return;

  const element = ref.current;
  const start = window.pageYOffset;
  const end = element.getBoundingClientRect().top + window.pageYOffset;
  const distance = end - start;
  let startTime: number | null = null;

  function animation(currentTime: number): void {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, start, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  requestAnimationFrame(animation);
}