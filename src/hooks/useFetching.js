import { useState } from "react";

export const useFetching = (callback) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  function timeout(ms) { return new Promise(resolve => setTimeout(resolve, ms)) }

  const fetching = async (...args) => {
    try {
      setIsLoading(true);
      await timeout(700);
      await callback(...args);
    } catch(e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }

  return [fetching, isLoading, error];
}