import { useEffect, useState } from 'react';
import axios from 'axios';

export function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Show loading... message
        setLoading(true);

        // Wait for the response
        const response = await axios.get(url);
        setData(response.data);

        // Stop showing loading... or error messages
        setLoading(false);
        setError(null);
      } catch (error) {
        // Stop showing loading... message and start showing error message
        setLoading(false);
        setError(error.message);
      }
    };

    fetchData(url);
  }, [url]);

  return { data, loading, error };
}
