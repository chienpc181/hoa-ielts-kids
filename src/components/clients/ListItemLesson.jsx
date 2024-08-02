import React from 'react';
import { Image } from "primereact/image";
import { useSelector } from 'react-redux';

export default function ListItemLesson({ item, onSelectItem }) {
    const translate = useSelector(state => state.lang.translate);

    const translateTextLang = (text) => {
        return translate ? text.en : text.vi;
    };
    

    return (
        <article className='grid card mx-0' style={{ cursor: 'pointer' }} onClick={onSelectItem}>
            <section className="col-12 md:col-4" style={{padding: 0}}>
                <Image src={item.thumbnailUrl} alt="Thumbnail picture lesson" />
            </section>
            <section className="col-12 md:col-8">
                <h2>{translateTextLang(item.title)}</h2>
                <div>
                <span >{translateTextLang(item.introduce[0])}</span>
                <span>...</span>
                </div>
            </section>
        </article>
    )
}
