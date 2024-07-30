import React, { useState, useEffect } from 'react';
import AddnRemoveListItem from './common/AddnRemoveListItem';
import PropTypes from 'prop-types';
import TitleWithExamples from './TitleWithExamples';

export default function LessonMistakeList({title, lessonMistakes, onChange }) {
    const [mistakes, setMistakes] = useState(lessonMistakes);

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

    const handleLessonMistakeChange = (updateMistake, idx) => {
        const newStructures = mistakes.map((mistake, i) => (i === idx ? updateMistake : mistake));
        setMistakes(newStructures);
    };

    return (
        <div className='w-full mt-2 card'>
            <div className="form-field justify-content-between">
                <label>{title}</label>
                <AddnRemoveListItem items={mistakes} initItem={initMistake} onChange={(items) => setMistakes(items)}></AddnRemoveListItem>
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

// LessonMistakeList.propTypes = {
//     lessonMistakes: PropTypes.arrayOf(
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
