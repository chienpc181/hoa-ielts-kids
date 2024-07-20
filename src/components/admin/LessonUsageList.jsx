import React, { useState, useEffect } from 'react';
import LessonUsage from './LessonUsage';
import { Button } from 'primereact/button';
import PropTypes from 'prop-types';

export default function LessonUsageList({ lessonUsages, onChange }) {
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

    const handleRemoveUsage = () => {
        if (usages.length > 1) {
            setUsages(prev => prev.slice(0, -1));
        }
    };

    const handleAddUsage = () => {
        setUsages(prev => [...prev, initUsage]);
    };

    const handleLessonUsageChange = (updatedUsage, idx) => {
        const newUsages = usages.map((usage, i) => (i === idx ? updatedUsage : usage));
        setUsages(newUsages);
    };

    return (
        <div className='w-full mt-2 card'>
            <div className="form-field justify-content-between">
                <label>Usages</label>
                <div>
                    <Button label='-' outlined onClick={handleRemoveUsage} type='button' disabled={usages.length <= 1} />
                    <Button className='ml-2' label='+' outlined onClick={handleAddUsage} type='button' />
                </div>
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

LessonUsageList.propTypes = {
    lessonUsages: PropTypes.arrayOf(
        PropTypes.shape({
            usage: PropTypes.shape({
                en: PropTypes.string,
                vi: PropTypes.string
            }).isRequired,
            explain: PropTypes.shape({
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
