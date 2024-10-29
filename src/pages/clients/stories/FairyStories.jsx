import '../client.css';
import { useState, useEffect } from 'react';
import SwitchLang from '../../../components/clients/SwitchLang';
import FairyStoryItem from '../../../components/clients/FairyStoryItem';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import './Story.css';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { DataView } from 'primereact/dataview';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { NavLink } from 'react-router-dom';
import { useFetchingData, useFetchingDataWithPagination } from '../../../hooks/useData';

export default function FairyStories() {
    const [stories, setStories] = useState([]);
    const [isLastPage, setIsLastPage] = useState(false);
    const [currentPage, setCurrenPage] = useState(1);
    const [textSearch, setTextSearch] = useState('');

    const limit = 2;
    const baseUrl = 'https://truyen-cua-ba.vercel.app';
    // const baseUrl = 'https://truyencuaba.vercel.app';

    const fetchingUrl = `${baseUrl}/api/fairyStories`;
    const fetchingOption = {
        params: {
            paginationOptions: { page: currentPage, limit },
            // queryOptions: {category: 'Aesop', status: 'Inprogress'}
        },
    }
    const {data, loadDataError: error, loadingData: isLoading} = useFetchingData(fetchingUrl, fetchingOption);
    const {data: moreData, loadingData: isLoadingMore} = useFetchingDataWithPagination(fetchingUrl, fetchingOption, currentPage);

    useEffect(() => {
        if (currentPage > 1 && moreData) {
            setStories(prevStories => [...prevStories, ...moreData.stories]);
        }
    }, [moreData])
    
    
    useEffect(() => {
        if (data) {
            setStories(data.stories);
        }
    }, [data])
   

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    

    const handleLoadMore = async () => {
        setCurrenPage(currentPage + 1);
        if (currentPage === data.totalPages - 1) {
            setIsLastPage(true);
        }
    }

    const handleSearchStory = async () => {
        // try {
        //     setLoading(true);
        //     const response = await axios.get(`${baseUrl}/api/stories/search`, {
        //         params: {
        //             paginationOptions: { page: 1, limit: 10 }, // Optional
        //             // sortingOptions: { sort: 'desc' }, // Optional
        //             search: textSearch
        //         }
        //     });
        //     setStories(response.data.stories);
        // } catch (err) {
        //     if (axios.isCancel(err)) {
        //         console.log('Request canceled', err.message);
        //     } else {
        //         setError(err.message);
        //     }
        // } finally {
        //     setLoading(false);
        // }
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
        confirmDialog({
            group: 'templating',
            // header: story.title.en,
            header: (
                <div style={{
                    // backgroundImage: `url(${story.thumbnailUrl})`,
                    backgroundImage: `url(${story.illustrationUrl})`,
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
                        <NavLink to={`/fairy-stories/${story._id}`} style={{textDecoration: 'none', color: 'white'}}>Read story</NavLink>
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
            <div className="col-6 md:col-4 lg:col-3 p-3" key={index}>
                <FairyStoryItem item={story} onSelectItem={() => handleClickStory(story)} />
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
                    {stories && stories.length && <div className='story-list'>
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
