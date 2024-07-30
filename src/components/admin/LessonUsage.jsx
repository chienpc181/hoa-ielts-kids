import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DoubleLangInputText from './DoubleLangInputText';
import DoubleLangInputTextAreas from './DoubleLangInputTextAreas';

export default function LessonUsage({ usage, onLessonUsageChange }) {
    const [lessonUsage, setLessonUsage] = useState(usage);

    useEffect(() => {
        onLessonUsageChange(lessonUsage);
    }, [lessonUsage]);

    const onUsageChange = (textLang) => {
        setLessonUsage(prev => ({
            ...prev,
            usage: textLang
        }));
    };

    const onExplainChange = (textLang) => {
        setLessonUsage(prev => ({
            ...prev,
            explain: textLang
        }));
    };

    const handleExamplesChange = (paras) => {
        setLessonUsage(prev => ({
            ...prev,
            examples: paras
        }));
    };

    return (
        <div className="card w-full">
            <div className="form-field block">
                <label>Usage</label>
                <DoubleLangInputText textLang={lessonUsage.usage} handleTextChange={onUsageChange}></DoubleLangInputText>
            </div>
            <div className="form-field block">
                <label>Explain</label>
                <DoubleLangInputText textLang={lessonUsage.explain} handleTextChange={onExplainChange}></DoubleLangInputText>
            </div>
            <div className="form-field block">
                <label>Examples</label>
                <DoubleLangInputTextAreas paraLang={lessonUsage.examples} handleChange={handleExamplesChange}></DoubleLangInputTextAreas>
            </div>
        </div>
    );
}

// LessonUsage.propTypes = {
//     usage: PropTypes.shape({
//         usage: PropTypes.shape({
//             en: PropTypes.string,
//             vi: PropTypes.string
//         }).isRequired,
//         explain: PropTypes.shape({
//             en: PropTypes.string,
//             vi: PropTypes.string
//         }).isRequired,
//         examples: PropTypes.arrayOf({
//             en: PropTypes.string,
//             vi: PropTypes.string
//         }).isRequired
//     }).isRequired,
//     onLessonUsageChange: PropTypes.func.isRequired,
// };
