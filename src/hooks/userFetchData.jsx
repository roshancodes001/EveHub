// useFetchData.js
import { useEffect, useState } from 'react';

const useFetchData = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const token = localStorage.getItem('token'); // Retrieve token dynamically
        console.log(token);
        if (!token) {
            setError('No token available');
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch(url, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const result = await res.json();
                console.log(result);
                if (!res.ok) {
                    throw new Error(result.message);
                }

                setData(result.data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError(err.message);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
};

export default useFetchData;
