import React from 'react';
import { useSelector } from 'react-redux';



export default function ListItemStory({ item, onSelectItem }) {
    const translate = useSelector(state => state.lang.translate);
    
    const getTranslate = (text) => {
        return translate ? text.en : text.vi;
    };

    

    return (
        <div className='card thumbnail' onClick={onSelectItem}>
            <section className="image" >
                <img src={item.thumbnailUrl} alt={item.title}></img>
                <i>{item.author}</i>
            </section>
            <div className='title'>
                <span>{getTranslate(item.title)}</span>
                
            </div>
        </div>
    )
}
