import React, { useState, useEffect } from 'react';
import { Divider } from 'primereact/divider';
import PropTypes from 'prop-types';
import DoubleLangInputText from './DoubleLangInputText';
import MultipleInputTexts from './MultipleInputTexts';

export default function LessonUsage({ usage, onLessonUsageChange }) {
    const [lessonUsage, setLessonUsage] = useState(usage);

    useEffect(() => {
        onLessonUsageChange(lessonUsage);
    }, [lessonUsage]);

    const onContentChange = (textLang) => {
        setLessonUsage(prev => ({
            ...prev,
            content: textLang
        }));
    };

    const handleExamplesChange = (texts) => {
        setLessonUsage(prev => ({
            ...prev,
            examples: texts
        }));
    };

    return (
        <div className="card w-full">
            <div className="form-field">
                <DoubleLangInputText textLang={lessonUsage.content} handleTextChange={onContentChange}></DoubleLangInputText>
            </div>
            <Divider align='start' type='dashed'>
                <span>Examples</span>
            </Divider>
            <MultipleInputTexts inputTexts={lessonUsage.examples} handleChange={handleExamplesChange} placeholder='Example'></MultipleInputTexts>
        </div>
    );
}

LessonUsage.propTypes = {
    usage: PropTypes.shape({
        content: PropTypes.shape({
            en: PropTypes.string,
            vi: PropTypes.string
        }).isRequired,
        examples: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired,
    onLessonUsageChange: PropTypes.func.isRequired,
};
