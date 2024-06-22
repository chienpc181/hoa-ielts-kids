import '../../../admin.css';
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { RadioButton } from 'primereact/radiobutton';
import { InputTextarea } from 'primereact/inputtextarea';
import { ToggleButton } from 'primereact/togglebutton';
import QGrammarArrangeSentencePreview from './QGrammarArrangeSentencePreview';

export default function QGrammarArrangeSentence() {
    const [question, setQuestion] = useState({
        ask: '',
        answerOptions: [
            { name: '', key: 'A' },
            { name: '', key: 'B' },
            { name: '', key: 'C' },
            { name: '', key: 'D' }
        ],
        answer: '',
        explain: ''
    });

    const [showPreview, setShowPreview] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setQuestion({
            ...question,
            [name]: value
        });
    };

    const handleAnswerOptionChange = (index, value) => {
        const updatedAnswerOptions = [...question.answerOptions];
        updatedAnswerOptions[index].name = value;
        setQuestion((prevQuestion) => ({
            ...prevQuestion,
            answerOptions: updatedAnswerOptions
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Question Submitted: ", question);
        // Here you can handle form submission, e.g., send the data to a server
    };

    return (

        <div className='page-admin'>

            <div className='grid'>
                <div className='col'>
                    <form onSubmit={handleSubmit}>
                        <div className='card'>
                            <h3 className="text-center">Create question</h3>
                            <div className='form-content'>
                                <div className="form-field mt-3">
                                    <label className='col-3' htmlFor="ask">Ask</label>
                                    <InputTextarea className='col-9' id="ask" name="ask" value={question.ask} onChange={handleInputChange} />
                                </div>
                                {question.answerOptions.map((option, index) => (
                                    <div key={option.key} className="form-field">
                                        <label className='col-3'>Option {option.key}</label>
                                        <InputText
                                            className='col-9'
                                            value={option.name}
                                            onChange={(e) => handleAnswerOptionChange(index, e.target.value)}
                                        />
                                    </div>
                                ))}
                                <div className="form-field">
                                    <label className='col-3' htmlFor="answer">Answer</label>
                                    <InputText className='col-9' id="answer" name="answer" value={question.answer} onChange={handleInputChange} />
                                </div>
                                <div className="form-field">
                                    <label className='col-3' htmlFor="explain">Explain</label>
                                    <InputTextarea className='col-9' id="explain" name="explain" autoResize rows={3} value={question.explain} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className='form-actions'>
                                <ToggleButton checked={showPreview} onLabel="Preview" offLabel='Preview' onChange={(e) => setShowPreview(e.value)} 
                                onIcon="pi pi-caret-right" offIcon="pi pi-caret-left"/>
                                <Button label="Add" className='mx-2' icon="pi pi-plus" />
                            </div>
                        </div>
                    </form>
                </div>

                {showPreview && <div className='col'>
                    <QGrammarArrangeSentencePreview question={question} />
                </div>}
            </div>




        </div>
    )
}