import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import PropTypes from 'prop-types';
import TitleWithExamples from './TitleWithExamples';

export default function LessonStructureList({ lessonStructures, onChange }) {
    const [structures, setUsages] = useState(lessonStructures);

    const textLang = {
        en: '',
        vi: ''
    }

    const initStructure = {
        title: textLang,
        examples: [textLang]
    };


    useEffect(() => {
        onChange(structures);
    }, [structures]);

    const handleRemoveStructure = () => {
        if (structures.length > 1) {
            setUsages(prev => prev.slice(0, -1));
        }
    };

    const handleAddStructure = () => {
        setUsages(prev => [...prev, initStructure]);
    };

    const handleLessonStructureChange = (updatedStructure, idx) => {
        const newStructures = structures.map((structure, i) => (i === idx ? updatedStructure : structure));
        setUsages(newStructures);
    };

    return (
        <div className='w-full mt-2 card'>
            <div className="form-field justify-content-between">
                <label>Structures</label>
                <div>
                    <Button label='-' outlined onClick={handleRemoveStructure} type='button' disabled={structures.length <= 1} />
                    <Button className='ml-2' label='+' outlined onClick={handleAddStructure} type='button' />
                </div>
                
            </div>
            {structures.map((structure, idx) => (
                <div className="form-field" key={idx}>
                    <TitleWithExamples
                        field={structure}
                        onChange={(structure) => handleLessonStructureChange(structure, idx)}
                    />
                </div>
            ))}
        </div>
    );
}

LessonStructureList.propTypes = {
    lessonStructures: PropTypes.arrayOf(
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
