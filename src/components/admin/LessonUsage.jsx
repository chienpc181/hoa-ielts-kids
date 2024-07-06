import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';

const LessonUsage = ({ usage, onLessonUsageChange, index }) => {
    const [lessonUsage, setLessonUsage] = useState(usage);

    useEffect(() => {
        onLessonUsageChange(index, lessonUsage);
    }, [lessonUsage]);

    const onAddExample = () => {
        setLessonUsage(prev => ({
            ...prev,
            examples: [...prev.examples, '']
        }));
    };

    const onRemoveExample = () => {
        if (lessonUsage.examples.length > 1) {
            setLessonUsage(prev => ({
                ...prev,
                examples: prev.examples.slice(0, -1)
            }));
        }
    };

    const onTitleChange = (e) => {
        setLessonUsage(prev => ({
            ...prev,
            title: e.target.value
        }));
    };

    const onExampleChange = (e, exampleIndex) => {
        const newExamples = lessonUsage.examples.map((example, i) => {
            if (i === exampleIndex) {
                return e.target.value;
            }
            return example;
        });
        setLessonUsage(prev => ({
            ...prev,
            examples: newExamples
        }));
    };

    return (
        <div className="card w-full">
            <div className="form-field">
                <InputText className='w-full' placeholder='Title' name='title' value={lessonUsage.title} onChange={onTitleChange} />
            </div>
            <Divider align='center' type='dashed'>
                <span>Examples</span>
            </Divider>
            {lessonUsage.examples.map((example, exampleIndex) => (
                <div className="form-field" key={exampleIndex}>
                    <InputText
                        className='w-full'
                        placeholder='Example'
                        value={example}
                        onChange={(e) => onExampleChange(e, exampleIndex)}
                    />
                </div>
            ))}
            <div className="form-field justify-content-end">
                <Button label='-' outlined onClick={onRemoveExample} type='button' />
                <Button className='ml-2' label='+' outlined onClick={onAddExample} type='button' />
            </div>
        </div>
    );
};

export default LessonUsage;
