import '../client.css';
import { useState, useEffect, useRef } from 'react';
import SwitchLang from '../../../components/clients/SwitchLang';
import { useNavigate } from 'react-router-dom';
import ListItemStory from '../../../components/clients/ListItemStory';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import axios from 'axios';
import './Story.css';
import { Button } from 'primereact/button';

export default function Stories() {
    const navigate = useNavigate();
    const [stories, setStories] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isLoadingMore, setLoadingMore] = useState(false);
    const [isLastPage, setIsLastPage] = useState(false);
    const [error, setError] = useState('');
    const currentPage = useRef(1);


    // const baseUrl = 'http://localhost:5000';
    // const baseUrl = 'https://truyen-cua-ba.onrender.com';
    const baseUrl = 'https://truyen-cua-ba.vercel.app';
    useEffect(() => {
        const controller = new AbortController(); // Create an AbortController instance

        const fetchData = async () => {
            try {
                setLoading(true);
                
                const response = await axios.get(`${baseUrl}/api/stories`, {
                    params: {
                        page: currentPage,
                        limit: 3,
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

    const handleLoadMore = async () => {
        currentPage.current++;
        
        try {
            setLoadingMore(true);
            
            const response = await axios.get(`${baseUrl}/api/stories`, {
                params: {
                    page: currentPage.current,
                    limit: 3,
                },
            });
            const nextPage = response.data.stories;
            setStories(prevStories => [...prevStories, ...nextPage]);
            if (currentPage.current === response.data.totalPages) {
                setIsLastPage(true);
            }
        } catch (err) {
            if (axios.isCancel(err)) {
                console.log('Request canceled', err.message);
            } else {
                setError(err.message);
            }
        } finally {
            setLoadingMore(false);
        }
    }

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
                    {(stories && stories.length) && <div className='story-list'>
                        {stories.map((story, index) => (
                            <ListItemStory key={index} item={story} onSelectItem={() => handleClickStory(story)} />
                        ))}
                    </div>}
                    <div className='flex justify-content-center'>
                        <Button label={isLoadingMore ? 'Loading...' : 'Load more...'} type='button' 
                        rounded outlined onClick={handleLoadMore} disabled={isLastPage}
                        ></Button>
                    </div>
                </div>
            </div>
        </HelmetProvider>
    );
}
