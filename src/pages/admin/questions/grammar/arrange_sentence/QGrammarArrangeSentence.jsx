import '../../../admin.css';
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { RadioButton } from 'primereact/radiobutton';
import { InputTextarea } from 'primereact/inputtextarea';
import { ToggleButton } from 'primereact/togglebutton';
import QGrammarArrangeSentencePreview from './QGrammarArrangeSentencePreview';
import { useFirestore } from '../../../../../hooks/useFirestore';
import QuestionContentStandard from '../../../../../components/admin/QuestionContentStandard';

export default function QGrammarArrangeSentence() {
    const { addDocument } = useFirestore('HikQuestions');
    const initQuestion = {
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
    const [question, setQuestion] = useState(initQuestion);

    const [formError, setFormError] = useState('');

    const [showPreview, setShowPreview] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setQuestion({
            ...question,
            [name]: value
        });
        setFormError('');
    };

    const handleAnswerOptionChange = (index, value) => {
        const updatedOptions = [...question.options];
        updatedOptions[index].option = value;
        setQuestion((prevQuestion) => ({
            ...prevQuestion,
            options: updatedOptions
        }));
        setFormError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let canSubmit = true;
        if (question.options.forEach(opt => {
            if (!opt.option) {
                canSubmit = false;
                setFormError('All options are required');
                return;
            }
        }))
            if (!question.options.map(opt => opt.option).includes(question.correctAnswer)) {
                canSubmit = false;
                setFormError('Options do not include answer');
                return;
            }

        const updatedOptions = question.options.map(opt => ({
            ...opt,
            isCorrect: opt.option === question.correctAnswer
        }));

        if (canSubmit) {
            const updatedQuestion = {
                ...question,
                options: updatedOptions
            };
            const response = await addDocument(updatedQuestion);

            if (response.success) {
                setQuestion(initQuestion);
                setFormError('');
            }
        }
    };

    return (
        <div className='page-admin'>
            <div className='grid'>
                <div className='col'>
                    <div className='card'>
                        <form onSubmit={handleSubmit}>

                            <h3 className="text-center">Create question</h3>
                            <div className='form-error'>
                                {formError && <p>Invalid: {formError}</p>}
                            </div>
                            {/* <div className='form-content'>
                                <div className="form-field mt-3">
                                    <label className='col-3' htmlFor="content">Content</label>
                                    <InputTextarea className='col-9' id="content" name="content" value={question.content} onChange={handleInputChange} />
                                </div>
                                {question.options.map((opt, index) => (
                                    <div key={index} className="form-field">
                                        <label className='col-3'>Option {index + 1}</label>
                                        <InputText
                                            className='col-9'
                                            value={opt.option}
                                            onChange={(e) => handleAnswerOptionChange(index, e.target.value)}
                                        />
                                    </div>
                                ))}
                                <div className="form-field">
                                    <label className='col-3' htmlFor="correctAnswer">Correct answer</label>
                                    <InputText className='col-9' id="correctAnswer" name="correctAnswer" value={question.correctAnswer} onChange={handleInputChange} />
                                </div>
                                <div className="form-field">
                                    <label className='col-3' htmlFor="explaination">Explaination</label>
                                    <InputTextarea className='col-9' id="explaination" name="explaination" autoResize rows={3} value={question.explaination} onChange={handleInputChange} />
                                </div>
                            </div> */}
                            <QuestionContentStandard
                                question={question}
                                handleInputChange={handleInputChange}
                                handleAnswerOptionChange={handleAnswerOptionChange}
                            />
                            <div className='form-actions'>
                                <ToggleButton checked={showPreview} onLabel="Preview" offLabel='Preview' onChange={(e) => setShowPreview(e.value)}
                                    onIcon="pi pi-caret-right" offIcon="pi pi-caret-left" />
                                <Button label="Add" type='submit' className='mx-2' icon="pi pi-save" />
                            </div>

                        </form>
                    </div>
                </div>
                {showPreview && <div className='col'>
                    <QGrammarArrangeSentencePreview question={question} />
                </div>}
            </div>
        </div>
    )
}