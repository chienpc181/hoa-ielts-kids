import React from 'react';
import { useSelector } from 'react-redux';
import { Badge } from 'primereact/badge';


export default function ListItemStory({ item, onSelectItem }) {
    const translate = useSelector(state => state.lang.translate);
    
    const getTranslate = (text) => {
        return translate ? text.en : text.vi;
    };

    const ageColorStyle = (story) => {
        if (story.ages === '3+') {
            return {background: 'orangered'}
        }
        if (story.ages === '4+') {
            return {background: '#06b6d4'}
        }
        if (story.ages === '5+') {
            return {background: '#22c55e'}
        }
        if (story.ages === '6+') {
            return {background: '#06b6d4'}
        }
        if (story.ages === '7+') {
            return {background: '#64748b'}
        }

        return {background: 'orangered'}
    }

    return (
        // <article className='grid card mx-0 mt-0 thumbnail' style={{ cursor: 'pointer' }} onClick={onSelectItem}>
        //     <section className="col-12 md:col-4" style={{ padding: 0 }}>
        //         <Image src={item.thumbnailUrl} alt="Thumbnail" />
        //     </section>
        //     <section className="col-12 md:col-8 story-description">
        //         <hgroup >
        //             <h2 style={{textAlign: 'center'}}>{getTranslate(item.title)}</h2>
        //             <address style={{textAlign: 'right'}}>{item.author}</address>
        //             <div className='flex justify-content-between' >
                        
        //             </div>
                    
        //         </hgroup>
        //         {(item.description && item.description.length) &&
        //             <div>
        //                 <p>{getTranslate(item.description[0])}</p>
        //             </div>
        //         }
        //         <hr></hr>
        //         <div>
        //             <Badge value={item.ages} style={ageColorStyle(item)}></Badge>
        //         </div>
        //     </section>
        // </article>
        <article className='card thumbnail' onClick={onSelectItem}>
            
            <section className="image" >
                <img src={item.thumbnailUrl} alt={item.title}></img>
            </section>
            <hgroup >
                <h2 style={{ textAlign: 'center' }}>{getTranslate(item.title)}</h2>
                <address style={{ textAlign: 'right' }}>{item.author}</address>
            </hgroup>
            <section className="description">
                {(item.description && item.description.length) &&
                    <p>{getTranslate(item.description[0])}</p>
                }
            </section>
            <hr></hr>
            <div>
                <Badge value={item.ages} style={ageColorStyle(item)}></Badge>
            </div>
        </article>

    )
}
