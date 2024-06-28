import './client.css';
import './Stories.css';
import { useCollection } from '../../hooks/useCollection';
import { useState, useRef } from 'react';
import SwitchLang from '../../components/clients/SwitchLang';
import { useNavigate } from 'react-router-dom';

export default function Stories() {
    const navigate = useNavigate();
    const { documents, error } = useCollection(
        "HikStories",
        // ["IsActive", "==", true], 
        // ["CreatedAt", "desc"] 
    );

    const [translate, setTranslate] = useState(false);

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
                <div className='pt-3' >
                    <SwitchLang translate={translate} setTranslate={setTranslate}></SwitchLang>
                </div>
                <div className='list-stories'>
                    {documents.map((story, index) => (
                        <div key={index} className='story-route card' onClick={() => handleClickStory(story)}>
                            {translate ? <h2>{story.title.en}</h2> : <h2>{story.title.vi}</h2>}
                        </div>
                    ))}
                </div>
                
            </div>
        </div>
    );
}
