import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TitleWithExamples from './TitleWithExamples';
import AddnRemoveListItem from './common/AddnRemoveListItem';

export default function LessonStructureList({title, lessonStructures, onChange }) {
    const [structures, setStructures] = useState(lessonStructures);

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

    const handleLessonStructureChange = (updatedStructure, idx) => {
        const newStructures = structures.map((structure, i) => (i === idx ? updatedStructure : structure));
        setStructures(newStructures);
    };

    return (
        <div className='w-full mt-2 card'>
            <div className="form-field justify-content-between">
                <label>{title}</label>
                <AddnRemoveListItem items={structures} initItem={initStructure} onChange={(items) => setStructures(items)}></AddnRemoveListItem>
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

// LessonStructureList.propTypes = {
//     lessonStructures: PropTypes.arrayOf(
//         PropTypes.shape({
//             title: PropTypes.shape({
//                 en: PropTypes.string,
//                 vi: PropTypes.string
//             }).isRequired,
//             examples: PropTypes.arrayOf({
//                 en: PropTypes.string,
//                 vi: PropTypes.string
//             }).isRequired
//         })
//     ).isRequired,
//     onChange: PropTypes.func.isRequired
// };
