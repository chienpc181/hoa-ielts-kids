import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DoubleLangInputText from '../DoubleLangInputText';
import DoubleLangInputTextAreas from '../DoubleLangInputTextAreas';

export default function LessonStructure({ structure, onChange }) {
    const [_structure, setStructure] = useState(structure);

    useEffect(() => {
        onChange(_structure);
    }, [_structure]);

    const onTitleChange = (textLang) => {
        setStructure(prev => ({
            ...prev,
            title: textLang
        }));
    };

    const onDescriptionChange = (textLang) => {
        setStructure(prev => ({
            ...prev,
            description: textLang
        }));
    };

    const handleExamplesChange = (paras) => {
        setStructure(prev => ({
            ...prev,
            examples: paras
        }));
    };

    return (
        <div className="card w-full">
            <div className="form-field block">
                <label>Title</label>
                <DoubleLangInputText textLang={_structure.title} handleTextChange={onTitleChange}></DoubleLangInputText>
            </div>
            <div className="form-field block">
                <label>Description</label>
                <DoubleLangInputText textLang={_structure.description} handleTextChange={onDescriptionChange}></DoubleLangInputText>
            </div>
            <div className="form-field block">
                <label>Examples</label>
                <DoubleLangInputTextAreas paraLang={_structure.examples} handleChange={handleExamplesChange}></DoubleLangInputTextAreas>
            </div>
        </div>
    );
}
