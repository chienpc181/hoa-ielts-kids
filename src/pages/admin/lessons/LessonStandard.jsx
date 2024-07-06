import '../admin.css';
import React, { useState, useEffect } from "react";
import { Splitter, SplitterPanel } from 'primereact/splitter';
import FileUploadImage from '../../../components/admin/FileUploadImage';
import useFirebaseStorage from '../../../hooks/useFirebaseStorage';
import { useFirestore } from '../../../hooks/useFirestore';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import LessonUsage from '../../../components/admin/LessonUsage';

export default function LessonStandard() {
    const { addDocument } = useFirestore('HikLessons');
    const { uploadFile, fileUrl } = useFirebaseStorage();

    const [images, setImages] = useState([]);
    const [formError, setFormError] = useState('');

    const initUsage = {
        title: '',
        examples: ['', '', '']
    };

    const [initLesson, setInitLesson] = useState({
        title: '',
        introduce: '',
        structures: [],
        usages: [
            { ...initUsage },
            { ...initUsage }
        ],
        thumbnailUrl: ''
    });

    const handleOnSelectFiles = async (files) => {
        setImages(files);
        
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInitLesson(prevLesson => ({
            ...prevLesson,
            [name]: value
        }));
    };

    const handleLessonUsageChange = (index, updatedUsage) => {
        const newUsages = initLesson.usages.map((usage, i) => {
            if (i === index) {
                return updatedUsage;
            }
            return usage;
        });

        setInitLesson(prevLesson => ({
            ...prevLesson,
            usages: newUsages
        }));
    };

    const onAddUsage = () => {
        setInitLesson(prev => ({
            ...prev,
            usages: [...prev.usages, { ...initUsage }]
        }));
    };

    const onRemoveUsage = () => {
        if (initLesson.usages.length > 1) {
            setInitLesson(prev => ({
                ...prev,
                usages: prev.usages.slice(0, -1)
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');
        console.log('start to save lesson...')
        try {
            
            if (images.length) {
                const thumbnail = images[0];
                await uploadFile(thumbnail, 'Lessons');
                setInitLesson(prev => ({
                    ...prev,
                    thumbnailUrl: fileUrl
                }))
                
                console.log(initLesson)
            }
            await addDocument({ ...initLesson });
            
            setInitLesson({
                title: '',
                introduce: '',
                structures: [],
                usages: [
                    { ...initUsage },
                    { ...initUsage }
                ],
                thumbnailUrl: ''
            });
            setImages([]);
            
        } catch (error) {
            setFormError('Failed to submit the lesson.');
        }
    };

    return (
        <div className='page-admin'>
            <Splitter className='card' style={{ minHeight: '800px' }}>
                <SplitterPanel className="block p-3" size={75} minSize={10}>
                    <form onSubmit={handleSubmit} className='form-content'>
                        <h3 className="text-center">Create lesson</h3>
                        <div className='form-error'>
                            {formError && <p>Invalid: {formError}</p>}
                        </div>

                        <div className="form-field">
                            <FileUploadImage handleOnSelectFiles={handleOnSelectFiles} />
                        </div>

                        <div className="form-field">
                            <label className='col-3'>Title</label>
                            <InputText className='col-9' name='title' value={initLesson.title} onChange={handleChange} />
                        </div>
                        <div className="form-field">
                            <label className='col-3'>Introduce</label>
                            <InputText className='col-9' name='introduce' value={initLesson.introduce} onChange={handleChange} />
                        </div>
                        <div className="form-field">
                            <label className='col-3'>Usages</label>
                            <div className='col-9'>
                                {initLesson.usages.map((usage, index) => (
                                    <LessonUsage
                                        key={index}
                                        usage={usage}
                                        index={index}
                                        onLessonUsageChange={handleLessonUsageChange}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="form-field justify-content-end">
                            <Button label='Remove usage' outlined onClick={onRemoveUsage} type='button' />
                            <Button className='ml-2' label='Add usage' outlined onClick={onAddUsage} type='button' />
                        </div>

                        <div className='form-actions'>
                            <Button label="Add" type='submit' className='mx-2' icon="pi pi-save" />
                        </div>
                    </form>
                </SplitterPanel>
                <SplitterPanel className="block p-3" size={25}>
                    <h3 className="text-center">Preview</h3>
                </SplitterPanel>
            </Splitter>
        </div>
    );
}
