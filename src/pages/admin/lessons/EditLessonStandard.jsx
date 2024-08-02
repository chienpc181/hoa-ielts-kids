import '../admin.css';
import { useState, useEffect } from "react";
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
import FillInTheGapList from '../../../components/admin/lessonExercises/FillInTheGapList';
import CompleteSentenceList from '../../../components/admin/lessonExercises/CompleteSentenceList';
import { TabView, TabPanel } from 'primereact/tabview';
import LessonRecognizationList from '../../../components/admin/lessonSections/LessonRecognizationList';

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

    const textLang = {
        en: '',
        vi: ''
    }
    const initUsage = {
        usage: textLang,
        explain: textLang,
        examples: [textLang]
    };

    const initStructure = {
        title: textLang,
        examples: [textLang]
    }

    const initMistake = {
        title: textLang,
        examples: [textLang]
    }

    const initCompleteSentence = {
        content: '',
        answer: ''
    }

    const initSignsToRecognize = {
        title: textLang,
        signs: [],
        examples: [textLang]
    }

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

    const handleAddLessonSection = (fieldName, initLessonSection) => {
        setLesson(prev => ({
            ...prev,
            [fieldName]: [initLessonSection]
        }));
    }

    const handleChangeLessonSections = (items, fieldName) => {
        setLesson(prev => {
            const updatedLesson = { ...prev };
    
            if (items.length === 0) {
                delete updatedLesson[fieldName];
            } else {
                updatedLesson[fieldName] = items;
            }
    
            // Return the updated lesson state
            return updatedLesson;
        });
        console.log(lesson)
    };

    const handleAddExerciseGroup = (fieldName, initExerciseType) => {
        const updatedExercises = {
            ...lesson.exercises,
            [fieldName]: [initExerciseType]
        }
        setLesson(prev => ({
            ...prev,
            exercises: updatedExercises
        }));
    }


    const handleChangeExercises = (exerciseList, fieldName) => {
        setLesson(prev => {
            // Create a copy of the previous exercises object
            const updatedExercises = { ...prev.exercises };
    
            // Check if the exerciseList is empty
            if (exerciseList.length === 0) {
                // Remove the field from the exercises object
                delete updatedExercises[fieldName];
            } else {
                // Add or update the field in the exercises object
                updatedExercises[fieldName] = exerciseList;
            }
    
            // Return the updated lesson state
            return {
                ...prev,
                exercises: updatedExercises
            };
        });
        console.log(lesson)
    };

    return (
        <>
            {lesson && <div className='page-admin'>
                <div>
                    <form onSubmit={handleSubmit} className='form-content'>
                        <h1 className="text-center">Create lesson</h1>
                        <TabView>
                            <TabPanel header='Summary'>
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
                                    <Button severity='secondary' type='button' outlined label='Structures' 
                                    onClick={() => handleAddLessonSection('structures', initStructure)}
                                        disabled={lesson.structures && lesson.structures.length}></Button>
                                    <Button severity='secondary' className='ml-2' type='button' outlined label='Usages' 
                                    onClick={() => handleAddLessonSection('usages', initUsage)}
                                        disabled={lesson.usages && lesson.usages.length}></Button>
                                    <Button severity='secondary' className='ml-2' type='button' outlined label='Common mistakes' 
                                    onClick={() => handleAddLessonSection('commonMistakes', initMistake)}
                                        disabled={lesson.commonMistakes && lesson.commonMistakes.length}></Button>
                                    <Button severity='secondary' className='ml-2' type='button' outlined label='Signs to recognize' 
                                        onClick={() => handleAddLessonSection('signsToRecognize', initSignsToRecognize)}
                                    disabled={lesson.signsToRecognize && lesson.signsToRecognize.length}></Button>
                                </div>
                                <div>
                                    {lesson.structures && <div className="form-field" >
                                        <LessonStructureList title='Structures' lessonStructures={lesson.structures} 
                                        onChange={(items) => handleChangeLessonSections(items, 'structures')}></LessonStructureList>
                                    </div>}
                                    {lesson.usages && <div className="form-field" >
                                        <LessonUsageList title='Usages' lessonUsages={lesson.usages} 
                                        onChange={(items) => handleChangeLessonSections(items, 'usages')}></LessonUsageList>
                                    </div>}
                                    {lesson.commonMistakes && <div className="form-field" >
                                        <LessonMistakeList title='Common mistakes' lessonMistakes={lesson.commonMistakes} 
                                        onChange={(items) => handleChangeLessonSections(items, 'commonMistakes')}></LessonMistakeList>
                                    </div>}
                                    {lesson.signsToRecognize && <div className="form-field" >
                                        <LessonRecognizationList signsToRecognizes={lesson.signsToRecognize} 
                                        onChange={(items) => handleChangeLessonSections(items, 'signsToRecognize')}></LessonRecognizationList>
                            </div>}
                                </div>
                            </TabPanel>
                            <TabPanel header='Exercises'>
                                <div className="form-field" >
                                    <Button severity='secondary' type='button' outlined label='Fill in the gap' 
                                    onClick={() => handleAddExerciseGroup('fillInTheGaps', initCompleteSentence)}
                                        disabled={lesson.exercises.fillInTheGaps && lesson.exercises.fillInTheGaps.length}></Button>
                                    <Button severity='secondary' type='button' className='ml-2' outlined label='Rearrange sentence' 
                                    onClick={() => handleAddExerciseGroup('rearrangeSentences', initCompleteSentence)}
                                        disabled={lesson.exercises.rearrangeSentences && lesson.exercises.rearrangeSentences.length}></Button>
                                    <Button severity='secondary' type='button' className='ml-2' outlined label='Rewrite sentence' 
                                    onClick={() => handleAddExerciseGroup('rewriteSentences', initCompleteSentence)}
                                        disabled={lesson.exercises.rewriteSentences && lesson.exercises.rewriteSentences.length}></Button>
                                </div>
                                <div>
                                    {lesson.exercises.fillInTheGaps && <div className="form-field" >
                                        <CompleteSentenceList title='Fill in the gaps' exercises={lesson.exercises.fillInTheGaps}
                                            onChange={(exerciseList) => handleChangeExercises(exerciseList, 'fillInTheGaps')}></CompleteSentenceList>
                                    </div>}
                                    {lesson.exercises.rearrangeSentences && <div className="form-field" >
                                        <CompleteSentenceList title='Rearrange the sentence' exercises={lesson.exercises.rearrangeSentences}
                                            onChange={(exerciseList) => handleChangeExercises(exerciseList, 'rearrangeSentences')}></CompleteSentenceList>
                                    </div>}
                                    {lesson.exercises.rewriteSentences && <div className="form-field" >
                                        <CompleteSentenceList title='Rewrite the sentence' exercises={lesson.exercises.rewriteSentences}
                                            onChange={(exerciseList) => handleChangeExercises(exerciseList, 'rewriteSentences')}></CompleteSentenceList>
                                    </div>}
                                </div>
                            </TabPanel>
                        </TabView>
                        <div className='form-error'>
                            {formError && <p>Invalid: {formError}</p>}
                        </div>
                        <div className='form-actions'>
                            <Button label="Save" type='submit' className='mx-2' icon="pi pi-save" />
                        </div>
                    </form>
                </div>
            </div>}
        </>

    );
}
