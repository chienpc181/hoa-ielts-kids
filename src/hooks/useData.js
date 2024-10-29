import { useEffect, useState } from "react";
import axios from "axios";

function useFetchingData(url, option) {
    const [loadDataError, setError] = useState('');
    const [loadingData, setLoadingData] = useState(false);
    const [data, setData] = useState();
    
    useEffect(() => {
        let loadData = true;
        const fetchData = async () => {
            try {
                setLoadingData(true);
                const response = await axios.get(url, option);
                if (loadData) {
                    setData(response.data);
                }

            } catch (err) {
                if (axios.isCancel(err)) {
                    console.log('Request canceled', err.message);
                } else {
                    setError(err.message);
                }
            } finally {
                setLoadingData(false);
            }
        };

        fetchData();

        return () => {
            loadData = false;
        }
    }, []);

    return {loadDataError, loadingData, data}
}

function useFetchingDataWithPagination(url, option, page) {
    const [loadDataError, setError] = useState('');
    const [loadingData, setLoadingData] = useState(false);
    const [data, setData] = useState();
    
    useEffect(() => {
        let loadData = true;
        const fetchData = async () => {
            try {
                setLoadingData(true);
                const response = await axios.get(url, option);
                if (loadData) {
                    setData(response.data);
                }

            } catch (err) {
                if (axios.isCancel(err)) {
                    console.log('Request canceled', err.message);
                } else {
                    setError(err.message);
                }
            } finally {
                setLoadingData(false);
            }
        };

        fetchData();

        return () => {
            loadData = false;
        }
    }, [page]);

    return {loadDataError, loadingData, data}
}

export {useFetchingData, useFetchingDataWithPagination}