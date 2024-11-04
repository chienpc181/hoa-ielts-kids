import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

function useLazyLoad(url, option) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasLoaded, setHasLoaded] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    if (!hasLoaded) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(url, option);
        setData(response.data);
      } catch (err) {
        setError(err.message || 'Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [hasLoaded]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setHasLoaded(true);
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasLoaded]);

  return { data, isLoading, error, observerRef };
}

export default useLazyLoad;
