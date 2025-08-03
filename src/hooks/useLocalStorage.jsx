import { useEffect, useState } from "react";

export const useLocalStorage = (key, initialValue) => {
  const stored = localStorage.getItem(key);
  let parsed;

  try {
    parsed = stored ? JSON.parse(stored) : initialValue;
  } catch {
    parsed = initialValue;
  }

  const [value, setValue] = useState(parsed);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
