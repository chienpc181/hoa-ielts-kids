import '../client.css';
import { useCollection } from '../../../hooks/useCollection';
import { useState, useRef } from 'react';
import SwitchLang from '../../../components/clients/SwitchLang';
import { useNavigate } from 'react-router-dom';
import ListItemStory from '../../../components/clients/ListItemStory';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Stories() {
    const navigate = useNavigate();
    const { documents, error } = useCollection(
        "HikStories",
        // ["IsActive", "==", true], 
        // ["CreatedAt", "desc"] 
    );

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!documents) {
        return <div>Loading...</div>;
    }

    const handleClickStory = (story) => {
        navigate(`/stories/${story.id}`);
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
                        <SwitchLang ></SwitchLang>
                        <h1>All stories</h1>
                    </div>
                    <div className='story-list'>
                        {documents.map((story, index) => (
                            <ListItemStory key={index} item={story} onSelectItem={() => handleClickStory(story)}></ListItemStory>
                        ))}
                    </div>

                </div>
            </div>
        </HelmetProvider>

    );
}
