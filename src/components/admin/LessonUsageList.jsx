import React, { useState, useEffect } from 'react';
import LessonUsage from './LessonUsage';
import { Button } from 'primereact/button';
import PropTypes from 'prop-types';

export default function LessonUsageList({ lessonUsages, onChange }) {
    const [usages, setUsages] = useState(lessonUsages);

    const initUsage = {
        content: {
            en: '',
            vi: ''
        },
        examples: ['', '', '']
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
        <div className='w-full mt-2'>
            <div className="form-field justify-content-end">
                <Button label='Remove usage' outlined onClick={handleRemoveUsage} type='button' disabled={usages.length <= 1} />
                <Button className='ml-2' label='Add usage' outlined onClick={handleAddUsage} type='button' />
            </div>
            {usages.map((usage, idx) => (
                <div className="form-field" key={idx}>
                    <LessonUsage
                        usage={usage}
                        index={idx}
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
            content: PropTypes.shape({
                en: PropTypes.string,
                vi: PropTypes.string
            }).isRequired,
            examples: PropTypes.arrayOf(PropTypes.string).isRequired
        })
    ).isRequired,
    onChange: PropTypes.func.isRequired
};
