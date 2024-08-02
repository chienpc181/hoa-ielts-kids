import React, { useState, useEffect } from 'react';
import AddnRemoveListItem from '../common/AddnRemoveListItem';
import PropTypes from 'prop-types';
import LessonRecognization from './LessonRecognization';


export default function LessonRecognizationList({signsToRecognizes, onChange }) {
    const [_signsToRecognizes, setSignsToRecognizes] = useState(signsToRecognizes);

    const textLang = {
        en: '',
        vi: ''
    }

    const initSign = {
        title: textLang,
        signs: [],
        examples: [textLang]
    };


    useEffect(() => {
        onChange(_signsToRecognizes);
        
    }, [_signsToRecognizes]);

    const handleLessonSignChange = (updateSign, idx) => {
        const newSigns = _signsToRecognizes.map((sign, i) => (i === idx ? updateSign : sign));
        setSignsToRecognizes(newSigns);
    };


    return (
        <div className='w-full mt-2 card'>
            <div className="form-field justify-content-between">
                <label>Signs to recognize</label>
                <AddnRemoveListItem items={_signsToRecognizes} initItem={initSign} onChange={(items) => setSignsToRecognizes(items)}></AddnRemoveListItem>
            </div>
            {_signsToRecognizes.map((sign, idx) => (
                <div className="form-field" key={idx}>

                    <LessonRecognization signsToRecognize={sign} onChange={(sign) => handleLessonSignChange(sign, idx)}/>

                </div>
            ))}
        </div>
    );
}
