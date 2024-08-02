import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DoubleLangInputText from '../DoubleLangInputText';
import DoubleLangInputTextAreas from '../DoubleLangInputTextAreas';
import { Chips } from 'primereact/chips';

export default function LessonRecognization({ signsToRecognize, onChange }) {
    const [_signsToRecognize, setSignsToRecognize] = useState(signsToRecognize);

    useEffect(() => {
        onChange(_signsToRecognize);
    }, [_signsToRecognize]);

    const handleTitleChange = (textLang) => {
        setSignsToRecognize(prev => ({
            ...prev,
            title: textLang
        }));
    };

    const handleExamplesChange = (paras) => {
        setSignsToRecognize(prev => ({
            ...prev,
            examples: paras
        }));
    };

    const handleUpdateSigns = (items) => {
        setSignsToRecognize(prev => ({
            ...prev,
            signs: items
        }));
    }

    return (
        <div className="card w-full">
            <div className="form-field block">
                <label>Title</label>
                <DoubleLangInputText textLang={_signsToRecognize.title} handleTextChange={handleTitleChange}></DoubleLangInputText>
            </div>
            <div className="form-field block">
                <label>Signs</label>
                <div className='mt-2 p-fluid'>
                    <Chips className='flex' value={_signsToRecognize.signs} onChange={(e) => handleUpdateSigns(e.value)} separator="," />
                </div>
                
            </div>
            <div className="form-field block">
                <label>Examples</label>
                <DoubleLangInputTextAreas paraLang={_signsToRecognize.examples} handleChange={handleExamplesChange}></DoubleLangInputTextAreas>
            </div>
        </div>
    );
}