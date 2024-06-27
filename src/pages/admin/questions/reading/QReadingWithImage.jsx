import '../../admin.css';
import React, { useState, useRef, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { useFirestore } from '../../../../hooks/useFirestore';
import useFirebaseStorage from '../../../../hooks/useFirebaseStorage';
import QuestionContentStandard from '../../../../components/admin/QuestionContentStandard';
import QGrammarArrangeSentencePreview from '../grammar/arrange_sentence/QGrammarArrangeSentencePreview';
import FileUploadImage from '../../../../components/admin/FileUploadImage';

export default function QReadingWithImage() {
    const [numberOfQuestions, setNumberOfQuestions] = useState(1);
    const { addDocument } = useFirestore('HikQuestions');
    const { progress, fileUrl, error, uploadFile } = useFirebaseStorage();
    const initQuestion = {
        id: null,
        content: '',
        options: [
            {
                option: '',
                isCorrect: false
            },
            {
                option: '',
                isCorrect: false
            },
            {
                option: '',
                isCorrect: false
            },
            {
                option: '',
                isCorrect: false
            }
        ],
        correctAnswer: '',
        explaination: '',
        skillType: 'Grammar',
        isGroup: false,
        groupId: '',
        category: 'Fill in the gaps',
        levels: [
            {
                testType: 'IELTS',
                level: 'Band 5.5',
            },
            {
                testType: 'TOEIC',
                level: 'Target 700'
            }
        ],
    }
    const [questions, setQuestions] = useState(Array(numberOfQuestions).fill().map((_, idx) => ({ ...initQuestion, id: idx })));
    const [files, setFiles] = useState([]);

    const [formError, setFormError] = useState('');

    useEffect(() => {
        setQuestions(Array(numberOfQuestions).fill().map((_, idx) => ({ ...initQuestion, id: idx })));

    }, [numberOfQuestions]);

    const handleInputChange = (e, questionId) => {
        const { name, value } = e.target;
        setQuestions(questions.map(q => q.id === questionId ? { ...q, [name]: value } : q));
        setFormError('');
    };

    const handleAnswerOptionChange = (questionId, index, value) => {
        setQuestions(questions.map(q => {
            if (q.id === questionId) {
                const updatedOptions = [...q.options];
                updatedOptions[index] = { ...updatedOptions[index], option: value };
                return { ...q, options: updatedOptions };
            }
            return q;
        }));
        setFormError('');
    };
    const validTypes = ['image/png', 'image/jpeg'];
    const handleOnSelectFile = async (e) => {
        var selectedFile = e.files[0];

        if (selectedFile && validTypes.includes(selectedFile.type)) {
            uploadFile(selectedFile, 'Questions');
        }

    }

    const handleOnSelectFiles = async (files) => {

        setFiles(files);
        // console.log(files);
    }

    const onAddMoreQuestionClick = () => {
        setNumberOfQuestions(numberOfQuestions + 1);
    }

    const onRemoveQuestionClick = () => {
        if (numberOfQuestions > 1) {
            setNumberOfQuestions(numberOfQuestions - 1);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let canSubmit = true;

        const updatedQuestions = questions.map(question => {
            const updatedOptions = question.options.map(opt => ({
                ...opt,
                isCorrect: opt.option === question.correctAnswer
            }));
            return { ...question, options: updatedOptions };
        });

        updatedQuestions.forEach(question => {
            if (question.options.some(opt => !opt.option) || !question.options.map(opt => opt.option).includes(question.correctAnswer)) {
                canSubmit = false;
                setFormError('All options are required and options must include the correct answer');
                return;
            }
        });

        if (canSubmit) {
            for (let question of updatedQuestions) {
                const response = await addDocument(question);
                if (!response.success) {
                    setFormError('Error submitting question');
                    return;
                }
            }
            setQuestions(Array.from({ length: numberOfQuestions }, (_, idx) => ({ ...initQuestion, id: idx })));
            setFormError('');
        }
    };

    return (
        <div className='page-admin'>
            <div className='grid'>
                <div className='col'>
                    <div className='card'>
                        <Splitter >
                            <SplitterPanel className="block p-3" size={60} minSize={10}>
                                <form onSubmit={handleSubmit}>
                                    <h3 className="text-center">Create question</h3>
                                    <div className='form-error'>
                                        {formError && <p>Invalid: {formError}</p>}
                                    </div>

                                    <div className="form-field">
                                        <FileUploadImage handleOnSelectFiles={handleOnSelectFiles}></FileUploadImage>
                                    </div>
                                    {questions.map((question) => (
                                        <div className='mt-4 pt-4 pb-2  border-primary-200 border-top-2' style={{ borderTopStyle: 'dashed' }}>
                                            <label>Question {question.id + 1}</label>
                                            <QuestionContentStandard
                                                key={question.id}
                                                question={question}
                                                handleInputChange={handleInputChange}
                                                handleAnswerOptionChange={handleAnswerOptionChange}
                                            />
                                        </div>
                                    ))}
                                    <div className='flex justify-content-between'>
                                        <Button label='Remove' outlined severity='danger' onClick={onRemoveQuestionClick} />
                                        <Button label='Add more...' outlined onClick={onAddMoreQuestionClick} />
                                    </div>
                                    <div className='form-actions'>
                                        <Button label="Add" type='submit' className='mx-2' icon="pi pi-save" />
                                    </div>
                                </form>
                            </SplitterPanel>
                            <SplitterPanel className="block p-3" size={40}>
                            <h3 className="text-center">Preview</h3>
                                {files.map((file, idx) => (
                                    <div className='form-field'>
                                        <img key={idx} role="presentation" className="w-full" src={file.objectURL} 
                                        data-pc-section="thumbnail" alt={file.name}>
                                        </img>
                                    </div>
                                    
                                ))}
                                {questions.map((question) => (
                                    <div className='mt-4 pt-4 pb-2  border-primary-200 border-top-2' style={{ borderTopStyle: 'dashed' }}>
                                        <label className='mb-6'>Question {question.id + 1}</label>
                                        <div className='mt-3'>
                                            <QGrammarArrangeSentencePreview question={question} />
                                        </div>
                                    </div>
                                ))}
                            </SplitterPanel>
                        </Splitter>
                    </div>
                </div>
            </div>
        </div>
    )
}