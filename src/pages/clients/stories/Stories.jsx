import '../client.css';
import { useState, useEffect, useRef } from 'react';
import SwitchLang from '../../../components/clients/SwitchLang';
import { useNavigate } from 'react-router-dom';
import ListItemStory from '../../../components/clients/ListItemStory';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import axios from 'axios';
import './Story.css';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { NavLink } from 'react-router-dom';

export default function Stories() {
    const navigate = useNavigate();
    const [stories, setStories] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isLoadingMore, setLoadingMore] = useState(false);
    const [isLastPage, setIsLastPage] = useState(false);
    const [error, setError] = useState('');
    const currentPage = useRef(1);
    const limit = 6;
    const [textSearch, setTextSearch] = useState('');

    // const baseUrl = 'http://localhost:5000';
    // const baseUrl = 'https://truyen-cua-ba.onrender.com';
    // const baseUrl = 'https://truyen-cua-ba.vercel.app';
    const baseUrl = 'https://truyencuaba.vercel.app';
    useEffect(() => {
        const controller = new AbortController(); // Create an AbortController instance

        const fetchData = async () => {
            try {
                setLoading(true);
                // const response = await axios.get(`${baseUrl}/api/stories`, {
                //     params: {
                //         paginationOptions: { page: currentPage.current, limit: limit }, // Optional
                //         // sortingOptions: { sort: 'desc' }, // Optional
                //         // queryOptions: { author: 'Brothers Grimm' } // Dynamic and can have any number of keys
                //     },
                //     signal: controller.signal, // Pass the signal to the request
                // });
                const response = await axios.get(`${baseUrl}/api/stories`, {
                    params: {
                        page: currentPage.current, limit: limit, sort: 'desc'
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

    

    const handleLoadMore = async () => {
        currentPage.current++;
        
        try {
            setLoadingMore(true);
            
            const response = await axios.get(`${baseUrl}/api/stories`, {
                params: {
                    // paginationOptions: { page: currentPage.current, limit: limit }, // Optional
                    // sortingOptions: { sort: 'desc' }, // Optional
                    // queryOptions: { author: 'Brothers Grimm' } // Dynamic and can have any number of keys

                    page: currentPage.current, limit: limit, sort: 'desc'
                }
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

    const handleSearchStory = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${baseUrl}/api/stories/search`, {
                params: {
                    paginationOptions: { page: 1, limit: 10 }, // Optional
                    // sortingOptions: { sort: 'desc' }, // Optional
                    search: textSearch
                }
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
    }

    const handleSearchKeydown = (e) => {
        if(e.key === 'Enter') {
            handleSearchStory();
        }
    }

    const dialogHeaderStyle = {
        padding: 0,
        position: 'relative'
    }


    const handleClickStory = (story) => {
        // navigate(`/stories/${story._id}`);
        confirmDialog({
            group: 'templating',
            // header: story.title.en,
            header: (
                <div style={{
                    backgroundImage: `url(${story.thumbnailUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '100%',
                    aspectRatio: '16 / 9'
                }}></div>
            ),
            headerStyle: dialogHeaderStyle,
            message: (
                <div>
                    <p style={{textIndent: '1rem'}}>{story.introduction[0].en}</p>
                </div>
            ),
            footer: (
                <div className='flex justify-content-center'>
                    <button class="p-confirm-dialog-accept p-button p-component">
                        <NavLink to={`/stories/${story._id}`} style={{textDecoration: 'none', color: 'white'}}>Read story</NavLink>
                    </button>
                    
                </div>
            )
        });
    };

    const itemTemplate = (story, index) => {
        if (!story) {
            return;
        }

        return (
            <div className="col-12 md:col-6 pb-3 md:px-2" key={index}>
                <ListItemStory item={story} onSelectItem={() => handleClickStory(story)} />
            </div>
        )
    };

    const listTemplate = (stories) => {
        return <div className="grid grid-nogutter">{stories.map((story, index) => itemTemplate(story, index))}</div>;
    };

    return (
        <HelmetProvider>
            <div className='page-client'>
                <Helmet>
                    <title>HOA IELTS KiDs - All stories</title>
                    <meta name="description" content='HOA IELTS KiDs - All stories' />
                </Helmet>
                <div className='story-container'>
                    <div className='p-3'>
                        <div>
                            <SwitchLang />
                            <div className="p-inputgroup pt-3" style={{maxWidth: '500px', margin: '0 auto'}}>
                                <InputText placeholder="Keyword" value={textSearch} onChange={(e) => setTextSearch(e.target.value)} 
                                onKeyDown={(e) => handleSearchKeydown(e)}/>
                                <Button icon="pi pi-search" onClick={handleSearchStory}/>
                            </div>
                            
                        </div>
                        
                        
                        <h1>All stories</h1>
                    </div>
                    <ConfirmDialog group="templating" dismissableMask={true}
                                    style={{ width: '50vw', margin: '0.5rem' }} 
                                    breakpoints={{ '1100px': '75vw', '960px': '100vw' }}/>
                    {(stories && stories.length) && <div className='story-list'>
                        {/* {stories.map((story, index) => (
                            <ListItemStory key={index} item={story} onSelectItem={() => handleClickStory(story)} />
                        ))} */}

                        <DataView value={stories} listTemplate={listTemplate(stories)} layout='grid' />
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
