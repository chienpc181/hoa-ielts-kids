import React from 'react';

export default function FairyStoryItem({ item, onSelectItem }) {

    return (
        <div className='card thumbnail' onClick={onSelectItem}>
            <section className="image" >
                <img src={item.thumbnailUrl} alt={item.title} style={{aspectRatio: '210 / 297'}}></img>
                <i>{item.author}</i>
            </section>
        </div>
    )
}
