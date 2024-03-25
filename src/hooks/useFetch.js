import { useEffect, useState } from 'react';
import axios from 'axios';

export function useFetch(url, method) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sendData, setSendData] = useState({});
  const [isTriggered, setIsTriggered] = useState(false);

  const saveInfo = info => {
    setSendData(info);
    setIsTriggered(true);
  };

  const updateInfo = info => {
    setSendData(info);
    setIsTriggered(true);
  };

  useEffect(() => {
    const fetchData = async (url, sendData) => {
      try {
        // Show loading... message
        setLoading(true);

        // Wait for the response
        switch (method) {
          case 'POST':
            const postResponse = await axios.post(url, sendData);
            setData(postResponse.data);
            break;
          case 'PUT':
            const putResponse = await axios.put(url, sendData);
            setData(putResponse.data);
            break;
          default:
            const getResponse = await axios.get(url);
            setData(getResponse.data);
            break;
        }

        // Stop showing loading... or error messages
        setLoading(false);
        setError(null);
      } catch (error) {
        // Stop showing loading... message and start showing error message
        setLoading(false);
        setError(error.message);
      }
    };

    if (method === 'GET') {
      fetchData(url);
    } else {
      isTriggered && fetchData(url, sendData);
    }

  }, [url, method, sendData, isTriggered]);

  return { data, loading, error, saveInfo, updateInfo };
}
