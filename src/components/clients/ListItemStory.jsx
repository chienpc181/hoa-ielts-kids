import React from 'react';
import { Image } from "primereact/image";
import { useSelector } from 'react-redux';
import { Badge } from 'primereact/badge';

export default function ListItemStory({ item, onSelectItem }) {
    const firstPara = item.paragraphs[0];
    const secondPara = item.paragraphs[1];
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
        <div className='grid card mx-0' style={{ cursor: 'pointer' }} onClick={onSelectItem}>
            <div className="col-12 md:col-4">
                <Image src={item.thumbnailUrl} alt="Thumbnail" />
            </div>
            <div className="col-12 md:col-8">
                <div className='flex' style={{justifyContent: 'space-between', alignItems: 'center'}}>
                <span style={{ fontWeight: '600', fontSize:'1.25rem' }}>{getTranslate(item.title)}</span>
                {/* <span>{item.ages}</span> */}
                <Badge value={item.ages} style={ageColorStyle(item)}></Badge>
                </div>
                
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
