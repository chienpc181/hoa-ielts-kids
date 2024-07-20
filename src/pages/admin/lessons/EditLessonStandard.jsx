import '../admin.css';
import React, { useState, useEffect } from "react";
import { Splitter, SplitterPanel } from 'primereact/splitter';
import FileUploadImage from '../../../components/admin/FileUploadImage';
import useFirebaseStorage from '../../../hooks/useFirebaseStorage';
import { useFirestore } from '../../../hooks/useFirestore';
import { Button } from 'primereact/button';
import DoubleLangInputText from '../../../components/admin/DoubleLangInputText';
import LessonUsageList from '../../../components/admin/LessonUsageList';
import DoubleLangInputTextAreas from '../../../components/admin/DoubleLangInputTextAreas';
import LessonStructureList from '../../../components/admin/LessonStructureList';
import LessonMistakeList from '../../../components/admin/LessonMistakeList';
import useDocument from '../../../hooks/useDocument';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditLessonStandard() {
    const { updateDocument } = useFirestore('HikLessons');
    const { uploadFile, fileUrl } = useFirebaseStorage();

    const { id } = useParams();
    const { document, error } = useDocument('HikLessons', id);
    const navigate = useNavigate();

    const [image, setImage] = useState([]);
    const [formError, setFormError] = useState('');

    useEffect(() => {
        if (fileUrl) {
            setLesson(prev => ({
                ...prev,
                thumbnailUrl: fileUrl
            }))
        }

    }, [fileUrl])

    const [lesson, setLesson] = useState();
    useEffect(() => {
        if (document && document.id) {
            setLesson(document);
        }
    }, [document]);

    const handleOnSelectFiles = async (files) => {
        if (files && files.length && files[0]) {
            setImage(files[0]);
            await uploadFile(files[0], 'Lessons');
        }
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

        console.log(lesson)
        try {
            const response = await updateDocument(lesson.id, lesson);

            if (response.success) {
                console.log("Update lesson successfully");
                navigate(`../lessons/${lesson.id}`);
            } else {
                setFormError('Error submitting lesson');
            }
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

    const handleIntroduceChange = (paras) => {
        setLesson(prev => ({
            ...prev,
            introduce: paras
        }));
    };

    const handleStructuresChange = (newStrucs) => {
        setLesson(prev => ({
            ...prev,
            structures: newStrucs
        }));
    }

    const handleMistakesChange = (newMistakes) => {
        setLesson(prev => ({
            ...prev,
            commonMistakes: newMistakes
        }));
    }

    return (
        <>
            {lesson && <div className='page-admin'>
                <Splitter className='card' style={{ minHeight: '800px' }}>
                    <SplitterPanel className="block p-3" size={75} minSize={10}>
                        <form onSubmit={handleSubmit} className='form-content'>
                            <h1 className="text-center">Create lesson</h1>
                            <div className='form-error'>
                                {formError && <p>Invalid: {formError}</p>}
                            </div>
                            <div className="form-field">
                                <FileUploadImage handleOnSelectFiles={handleOnSelectFiles} />
                            </div>
                            <div className="form-field card" >
                                <div className="w-full p-3">
                                    <label>Title</label>
                                    <DoubleLangInputText textLang={lesson.title} handleTextChange={handleTitleChange} />
                                </div>
                            </div>
                            <div className="form-field card" >
                                <div className="w-full p-3">
                                    <label>Introduce</label>
                                    <DoubleLangInputTextAreas paraLang={lesson.introduce} handleChange={handleIntroduceChange} ></DoubleLangInputTextAreas>
                                </div>
                            </div>
                            <div className="form-field" >
                                <LessonStructureList lessonStructures={lesson.structures} onChange={handleStructuresChange}></LessonStructureList>
                            </div>
                            <div className="form-field" >
                                <LessonUsageList lessonUsages={lesson.usages} onChange={handleUsagesChange}></LessonUsageList>
                            </div>
                            <div className="form-field" >
                                <LessonMistakeList lessonMistakes={lesson.commonMistakes} onChange={handleMistakesChange}></LessonMistakeList>
                            </div>
                            <div className='form-actions'>
                                <Button label="Edit" type='submit' className='mx-2' icon="pi pi-save" />
                            </div>
                        </form>
                    </SplitterPanel>
                    <SplitterPanel className="block p-3" size={25}>
                        <h3 className="text-center">Preview</h3>
                    </SplitterPanel>
                </Splitter>
            </div>}
        </>

    );
}
