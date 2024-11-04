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
import { useFetchingData } from '../../../hooks/useData';
import axios from "axios";
import { Dropdown } from 'primereact/dropdown';

export default function FairyStories() {

    const [category, setCategory] = useState({
        name: 'All',
        code: ''
    });
    const [status, setStatus] = useState({name: 'Ready for publish', code: 'ReadyForPublish'});
    const categories = [
        {
            name: 'All',
            code: ''
        },
        {
            name: "Fable's Aesop",
            code: 'Aesop'
        },
        {
            name: 'Hans Christian Andersen',
            code: 'Andersen'
        },
        {
            name: 'Brothers Grimm',
            code: 'Grimm'
        },
    ]
    const statusOptions = [
        {name: 'Inprogress', code: 'Inprogress'},
        {name: 'Ready for publish', code: 'ReadyForPublish'},
        {name: 'Published', code: 'Published'},
    ]

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
                            <div className='flex pt-3' style={{gap: '1rem'}}>
                            <Dropdown value={category} onChange={(e) => setCategory(e.value)} 
                            options={categories} optionLabel='name' placeholder='Select category'/>
                            <Dropdown value={status} onChange={(e) => setStatus(e.value)} 
                            options={statusOptions} optionLabel='name' placeholder='Select status'/>
                            </div>
                            
                        </div>
                        <h1>All stories</h1>
                    </div>
                    <FairyStoryList category={category.code} status={status.code}/>
                </div>
            </div>
        </HelmetProvider>
    );
}

function FairyStoryList({category, status}){
    const limit = 10;
    const baseUrl = 'https://truyen-cua-ba.vercel.app';
    // const baseUrl = 'https://truyencuaba.vercel.app';

    
    const [stories, setStories] = useState([]);
    const [isLastPage, setIsLastPage] = useState(false);
    const [currentPage, setCurrenPage] = useState(1);
    const [isLoadingMore, setLoadingMore] = useState(false);

    const fetchingUrl = `${baseUrl}/api/fairyStories`;
    const queryOptions = () => {
        if (!category) {
            return {status: status}
        }
        return {category: category, status: status}
    }
    const {data, loadDataError: error, loadingData: isLoading} = useFetchingData(fetchingUrl, {
        params: {
            paginationOptions: { page: currentPage, limit },
            queryOptions: queryOptions()
        },
    }, [category, status]);

    const handleLoadMore = async () => {
        setCurrenPage(currentPage + 1)
        if (currentPage === data.totalPages - 1 || data.totalPages === 1) {
            setIsLastPage(true);
        }

        const fetchData = async () => {
            try {
                setLoadingMore(true);
                const response = await axios.get(fetchingUrl, {
                    params: {
                        paginationOptions: { page: currentPage + 1, limit },
                        queryOptions: queryOptions()
                    },
                });
                setStories(prevStories => [...prevStories, ...response.data.stories]);

            } catch (err) {
                if (axios.isCancel(err)) {
                    console.log('Request canceled', err.message);
                } else {
                    console.log(err);
                }
            } finally {
                setLoadingMore(false);
            }
        };

        fetchData();
    }

    useEffect(() => {
        if (data) {
            setStories(data.stories);
        }
    }, [data])

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
                    <button className="p-confirm-dialog-accept p-button p-component">
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
            <div className="col-6 md:col-4 lg:col-3 p-2" key={index}>
                <FairyStoryItem item={story} onSelectItem={() => handleClickStory(story)} />
            </div>
        )
    };

    const listTemplate = (stories) => {
        return <div className="grid grid-nogutter">{stories.map((story, index) => itemTemplate(story, index))}</div>;
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <div className='story-list'>
            <DataView value={stories} listTemplate={listTemplate(stories)} layout='grid' />
        </div>
        <div className='flex justify-content-center'>
            <Button label={isLoadingMore ? 'Loading more...' : 'More...'} type='button' 
            rounded outlined onClick={handleLoadMore} disabled={isLastPage}
            ></Button>
        </div>
        <ConfirmDialog group="templating" dismissableMask={true}
            style={{ width: '50vw', margin: '0.5rem' }} 
            breakpoints={{ '1100px': '75vw', '960px': '100vw' }}/>
        </>
    )
}
