import { useEffect, useState } from "react";

export const useDebounce = (searchValue, deplay) => {
  const [debounceValue, setDebounceValue] = useState(searchValue);

  useEffect(() => {
    const handler = setTimeout(() => setDebounceValue(searchValue), deplay);
    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);
  return debounceValue;
};
