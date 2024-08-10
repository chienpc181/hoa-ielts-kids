import '../client.css';
import { useState, useEffect } from 'react';
import SwitchLang from '../../../components/clients/SwitchLang';
import { useNavigate } from 'react-router-dom';
import ListItemStory from '../../../components/clients/ListItemStory';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import axios from 'axios';

export default function Stories() {
    const navigate = useNavigate();
    const [stories, setStories] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const controller = new AbortController(); // Create an AbortController instance

        const fetchData = async () => {
            try {
                setLoading(true);
                // const baseUrl = 'http://localhost:5000';
                // const baseUrl = 'https://truyen-cua-ba.onrender.com';
                const baseUrl = 'https://truyen-cua-ba.vercel.app';
                const response = await axios.get(`${baseUrl}/api/stories`, {
                    params: {
                        limit: 10,
                    },
                    signal: controller.signal, // Pass the signal to the request
                });
                setStories(response.data.stories);
            } catch (err) {
                if (axios.isCancel(err)) {
                    console.log('Request canceled', err.message);
                } else {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        // Cleanup function to cancel the request if the component unmounts
        return () => {
            controller.abort();
        };
    }, []); // Empty dependency array ensures the effect runs only once on mount

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleClickStory = (story) => {
        navigate(`/stories/${story._id}`);
    };

    return (
        <HelmetProvider>
            <div className='page-client'>
                <Helmet>
                    <title>HOA IELTS KiDs - All stories</title>
                    <meta name="description" content='HOA IELTS KiDs - All stories' />
                </Helmet>
                <div className='story-container'>
                    <div className='py-3'>
                        <SwitchLang />
                        <h1>All stories</h1>
                    </div>
                    <div className='story-list'>
                        {stories.map((story, index) => (
                            <ListItemStory key={index} item={story} onSelectItem={() => handleClickStory(story)} />
                        ))}
                    </div>
                </div>
            </div>
        </HelmetProvider>
    );
}
