import React, { useState, useEffect } from 'react';
import LessonUsage from './LessonUsage';
import AddnRemoveListItem from './common/AddnRemoveListItem';
import PropTypes from 'prop-types';

export default function LessonUsageList({title, lessonUsages, onChange }) {
    const [usages, setUsages] = useState(lessonUsages);

    const textLang = {
        en: '',
        vi: ''
    }

    const initUsage = {
        usage: textLang,
        explain: textLang,
        examples: [textLang]
    };

    useEffect(() => {
        onChange(usages);
    }, [usages]);

    const handleLessonUsageChange = (updatedUsage, idx) => {
        const newUsages = usages.map((usage, i) => (i === idx ? updatedUsage : usage));
        setUsages(newUsages);
    };

    return (
        <div className='w-full mt-2 card'>
            <div className="form-field justify-content-between">
                <label>{title}</label>
                <AddnRemoveListItem items={usages} initItem={initUsage} onChange={(items) => setUsages(items)}></AddnRemoveListItem>
            </div>
            {usages.map((usage, idx) => (
                <div className="form-field" key={idx}>
                    <LessonUsage
                        usage={usage}
                        onLessonUsageChange={(usage) => handleLessonUsageChange(usage, idx)}
                    />
                </div>
            ))}
        </div>
    );
}

// LessonUsageList.propTypes = {
//     lessonUsages: PropTypes.arrayOf(
//         PropTypes.shape({
//             usage: PropTypes.shape({
//                 en: PropTypes.string,
//                 vi: PropTypes.string
//             }).isRequired,
//             explain: PropTypes.shape({
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
