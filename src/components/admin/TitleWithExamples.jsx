import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DoubleLangInputText from './DoubleLangInputText';
import DoubleLangInputTextAreas from './DoubleLangInputTextAreas';

export default function TitleWithExamples({ field, onChange }) {
    const [_field, setTitle] = useState(field);

    useEffect(() => {
        onChange(_field);
    }, [_field]);

    const handleTitleChange = (textLang) => {
        setTitle(prev => ({
            ...prev,
            title: textLang
        }));
    };

    const handleExamplesChange = (paras) => {
        setTitle(prev => ({
            ...prev,
            examples: paras
        }));
    };

    return (
        <div className="card w-full">
            <div className="form-field block">
                <label>Title</label>
                <DoubleLangInputText textLang={_field.title} handleTextChange={handleTitleChange}></DoubleLangInputText>
            </div>
            <div className="form-field block">
                <label>Examples</label>
                <DoubleLangInputTextAreas paraLang={_field.examples} handleChange={handleExamplesChange}></DoubleLangInputTextAreas>
            </div>
        </div>
    );
}