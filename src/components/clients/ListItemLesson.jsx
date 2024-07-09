import React from 'react';
import { Image } from "primereact/image";
import { useSelector } from 'react-redux';

export default function ListItemLesson({ item, onSelectItem }) {
    const translate = useSelector(state => state.lang.translate);

    const getTranslate = (text) => {
        return translate ? text : text;
    };
    

    return (
        <div className='grid card mx-0' style={{ cursor: 'pointer' }} onClick={onSelectItem}>
            <div className="col-12 md:col-4">
                <Image src={item.thumbnailUrl} alt="Thumbnail" />
            </div>
            <div className="col-12 md:col-8">
                <span style={{ fontWeight: '600', fontSize:'1.25rem' }}>{getTranslate(item.title)}</span>
                <p style={{ textAlign: 'left' }}>{getTranslate(item.introduce)}</p>
            </div>
        </div>
    )
}
