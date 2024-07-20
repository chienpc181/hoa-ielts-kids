import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import PropTypes from 'prop-types';
import TitleWithExamples from './TitleWithExamples';

export default function LessonMistakeList({ lessonMistakes, onChange }) {
    const [mistakes, setUsages] = useState(lessonMistakes);

    const textLang = {
        en: '',
        vi: ''
    }

    const initMistake = {
        title: textLang,
        examples: [textLang]
    };


    useEffect(() => {
        onChange(mistakes);
    }, [mistakes]);

    const handleRemoveMistake = () => {
        if (mistakes.length > 1) {
            setUsages(prev => prev.slice(0, -1));
        }
    };

    const handleAddMistake = () => {
        setUsages(prev => [...prev, initMistake]);
    };

    const handleLessonMistakeChange = (updateMistake, idx) => {
        const newStructures = mistakes.map((mistake, i) => (i === idx ? updateMistake : mistake));
        setUsages(newStructures);
    };

    return (
        <div className='w-full mt-2 card'>
            <div className="form-field justify-content-between">
                <label>Common mistakes</label>
                <div>
                    <Button label='-' outlined onClick={handleRemoveMistake} type='button' disabled={mistakes.length <= 1} />
                    <Button className='ml-2' label='+' outlined onClick={handleAddMistake} type='button' />
                </div>
            </div>
            {mistakes.map((mistake, idx) => (
                <div className="form-field" key={idx}>
                    <TitleWithExamples
                        field={mistake}
                        onChange={(mistake) => handleLessonMistakeChange(mistake, idx)}
                    />
                </div>
            ))}
        </div>
    );
}

LessonMistakeList.propTypes = {
    lessonMistakes: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.shape({
                en: PropTypes.string,
                vi: PropTypes.string
            }).isRequired,
            examples: PropTypes.arrayOf({
                en: PropTypes.string,
                vi: PropTypes.string
            }).isRequired
        })
    ).isRequired,
    onChange: PropTypes.func.isRequired
};
