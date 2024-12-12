'use client';
import { useEffect, RefObject } from 'react';

type Callback = () => void;

function useClickOutside(ref: RefObject<HTMLElement>, callback: Callback) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}

export { useClickOutside };
