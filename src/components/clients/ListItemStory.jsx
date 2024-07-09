import React from 'react';
import { Image } from "primereact/image";
import { useSelector } from 'react-redux';

export default function ListItemStory({ item, onSelectItem }) {
    const firstPara = item.paragraphs[0];
    const secondPara = item.paragraphs[1];
    const translate = useSelector(state => state.lang.translate);
    console.log(firstPara.en.length)
    const getTranslate = (text) => {
        return translate ? text.en : text.vi;
    };

    return (
        <div className='grid card mx-0' style={{ cursor: 'pointer' }} onClick={onSelectItem}>
            <div className="col-12 md:col-4">
                <Image src={item.thumbnailUrl} alt="Thumbnail" />
            </div>
            <div className="col-12 md:col-8">
                <span style={{ fontWeight: '600', fontSize:'1.25rem' }}>{getTranslate(item.title)}</span>
                {firstPara &&
                    <p style={{ textAlign: 'left' }}>
                        {getTranslate(firstPara)}
                        {firstPara.en.length < 150 && secondPara && <span> {getTranslate(secondPara)}</span>}
                        <br />
                        <span>...</span>
                    </p>}
            </div>
        </div>
    )
}
