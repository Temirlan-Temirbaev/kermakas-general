import { RefObject, useEffect } from 'react';

export const useOutsideClick = (callback : () => void, refs : RefObject<HTMLElement>[]) => {
  useEffect(() => {
    const handleClickOutside = (event : MouseEvent) => {
      if (refs.every(ref => ref.current && !ref.current.contains(event.target as Node))) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [refs, callback]);
};