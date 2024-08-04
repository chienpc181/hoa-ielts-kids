import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DoubleLangInputText from '../DoubleLangInputText';
import DoubleLangInputTextAreas from '../DoubleLangInputTextAreas';
import { Chips } from 'primereact/chips';

export default function LessonDistinguish({distinguish, onChange }) {
    const [_distinguish, setDistinguish] = useState(distinguish);

    useEffect(() => {
        onChange(_distinguish);
    }, [_distinguish]);

    const handleContentChange = (paras) => {
        setDistinguish(prev => ({
            ...prev,
            expressions: paras
        }));
    };

    const handleExamplesChange = (paras) => {
        setDistinguish(prev => ({
            ...prev,
            examples: paras
        }));
    };

    const handleTitleChange = (textLang) => {
        setDistinguish(prev => ({
            ...prev,
            title: textLang
        }));
    };


    return (
        <div className="card w-full">
            <div className="form-field block">
                <label>Title</label>
                <DoubleLangInputText textLang={distinguish.title} handleTextChange={handleTitleChange}></DoubleLangInputText>
            </div>
            <div className="form-field block">
                <label>Expressions</label>
                <DoubleLangInputTextAreas paraLang={_distinguish.expressions} handleChange={handleContentChange}></DoubleLangInputTextAreas>
            </div>
            <div className="form-field block">
                <label>Examples</label>
                <DoubleLangInputTextAreas paraLang={_distinguish.examples} handleChange={handleExamplesChange}></DoubleLangInputTextAreas>
            </div>
            
        </div>
    );
}