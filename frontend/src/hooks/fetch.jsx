import React, { useCallback, useState } from "react";

function useFetch() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = useCallback(async (url,body,method = "GET",headers) => {
    try {
      setLoading(true);
      setError(false);
      setData(null);
      const response = await fetch(url, {
        method: method,
        headers: { ...headers },
        body,
        credentials:"include"
      });
      
      if (!response.ok) {
        
        const errorData = await response.json();
        throw new Error(errorData.error || `Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      console.log(data);
      
      setData(data);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchData };
}

export default useFetch;
