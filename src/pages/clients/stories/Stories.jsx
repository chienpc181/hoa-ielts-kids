import '../client.css';
import { useCollection } from '../../../hooks/useCollection';
import { useState, useRef } from 'react';
import SwitchLang from '../../../components/clients/SwitchLang';
import { useNavigate } from 'react-router-dom';
import ListItemStory from '../../../components/clients/ListItemStory';

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
        <div className='page-client'>
            <div className='page-content'>
                <div className='my-3' >
                    <SwitchLang></SwitchLang>
                </div>
                <div className='story'>
                    {documents.map((story, index) => (
                        <ListItemStory key={index} item={story} onSelectItem={() => handleClickStory(story)}></ListItemStory>
                    ))}
                </div>
                
            </div>
        </div>
    );
}
