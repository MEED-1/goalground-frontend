import { useState, useEffect } from 'react';
import { getTerrains } from '../api/terrain.api';

export const useTerrains = (filters = {}) => {
  const [terrains, setTerrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTerrains = async () => {
      try {
        setLoading(true);
        const data = await getTerrains(filters);
        setTerrains(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTerrains();
  }, [JSON.stringify(filters)]);

  return { terrains, loading, error };
};