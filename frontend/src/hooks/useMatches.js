import { useState, useEffect } from 'react';
import { getMatches } from '../api/match.api';

export const useMatches = (filters = {}) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        const data = await getMatches(filters);
        setMatches(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [JSON.stringify(filters)]);

  return { matches, loading, error };
};