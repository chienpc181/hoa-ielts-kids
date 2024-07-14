import '../admin.css';
import React, { useState } from "react";
import { Splitter, SplitterPanel } from 'primereact/splitter';
import FileUploadImage from '../../../components/admin/FileUploadImage';
import useFirebaseStorage from '../../../hooks/useFirebaseStorage';
import { useFirestore } from '../../../hooks/useFirestore';
import { Button } from 'primereact/button';
import DoubleLangInputText from '../../../components/admin/DoubleLangInputText';
import MultipleInputTexts from '../../../components/admin/MultipleInputTexts';
import LessonUsageList from '../../../components/admin/LessonUsageList';

export default function CreateLessonStandard() {
    const { addDocument } = useFirestore('HikLessons');
    const { uploadFile, fileUrl } = useFirebaseStorage();

    const [images, setImages] = useState([]);
    const [formError, setFormError] = useState('');
    const [resetKey, setResetKey] = useState(Date.now());

    const initUsage = {
        content: {
            en: '',
            vi: ''
        },
        examples: ['', '', '']
    };

    const initLesson = {
        title: {
            en: '', 
            vi: ''
        },
        introduce: {
            en: '',
            vi: ''
        },
        structures: ['', ''],
        usages: [
            { ...initUsage },
            { ...initUsage }
        ],
        thumbnailUrl: ''
    };

    const [lesson, setLesson] = useState(initLesson);

    const handleOnSelectFiles = async (files) => {
        setImages(files);
    };

    const handleUsagesChange = (newUsages) => {
        setLesson(prevLesson => ({
            ...prevLesson,
            usages: newUsages
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');
        try {
            if (images.length) {
                // const thumbnail = images[0];
                // await uploadFile(thumbnail, 'Lessons');
                // const updatedLesson = {
                //     ...lesson,
                //     thumbnailUrl: fileUrl
                // };
                // await addDocument(updatedLesson);
                // setLesson(initLesson);
                // setImages([]);
                // console.log('Lesson saved successfully:', updatedLesson);
            } else {
                // await addDocument(lesson);
                console.log('Lesson saved successfully:', lesson);
            }
            // Reset form fields
            setLesson(initLesson);
            setImages([]);
            setResetKey(Date.now()); // Update key to force remount
        } catch (error) {
            setFormError('Failed to submit the lesson.');
            console.error('Error submitting the lesson:', error);
        }
    };

    const handleTitleChange = (textLang) => {
        setLesson(prev => ({
            ...prev,
            title: textLang
        }));
    };

    const handleIntroduceChange = (textLang) => {
        setLesson(prev => ({
            ...prev,
            introduce: textLang
        }));
    };

    const handleStructuresChange = (texts) => {
        setLesson(prev => ({
            ...prev,
            structures: texts
        }));
    }

    return (
        <div className='page-admin'>
            <Splitter className='card' style={{ minHeight: '800px' }}>
                <SplitterPanel className="block p-3" size={75} minSize={10}>
                    <form onSubmit={handleSubmit} className='form-content' key={resetKey}>
                        <h1 className="text-center">Create lesson</h1>
                        <div className='form-error'>
                            {formError && <p>Invalid: {formError}</p>}
                        </div>
                        <div className="form-field">
                            <FileUploadImage handleOnSelectFiles={handleOnSelectFiles} />
                        </div>

                        <div className="form-field" style={{ display: 'block' }}>
                            <label>Title</label>
                            <DoubleLangInputText textLang={lesson.title} handleTextChange={handleTitleChange} />
                        </div>
                        <div className="form-field" style={{ display: 'block' }}>
                            <label>Introduce</label>
                            <DoubleLangInputText textLang={lesson.introduce} handleTextChange={handleIntroduceChange} />
                        </div>
                        <div className="form-field" style={{ display: 'block' }}>
                            <label>Structures</label>
                            <MultipleInputTexts inputTexts={lesson.structures} handleChange={handleStructuresChange} placeholder='Structure'></MultipleInputTexts>
                        </div>
                        <div className="form-field" style={{ display: 'block' }}>
                            <label>Usages</label>
                            <LessonUsageList lessonUsages={lesson.usages} onChange={handleUsagesChange}></LessonUsageList>
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
