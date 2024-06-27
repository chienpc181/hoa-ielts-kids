import '../../admin.css';
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { RadioButton } from 'primereact/radiobutton';
import { InputTextarea } from 'primereact/inputtextarea';
import { ToggleButton } from 'primereact/togglebutton';
import { Editor } from "primereact/editor";
import QGrammarArrangeSentencePreview from '../grammar/arrange_sentence/QGrammarArrangeSentencePreview';

export default function QReading() {
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
    const [text, setText] = useState('');

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
        console.log("Question Submitted: ", text);
        // Here you can handle form submission, e.g., send the data to a server
    };

    return (

        <div className='page-admin'>
            <div className='grid'>
                <div className='col'>
                    <form onSubmit={handleSubmit}>
                        <Card>
                            <div className="card">
                                <Editor value={text} onTextChange={(e) => setText(e.htmlValue)} style={{ height: '320px' }} />
                            </div>
                            <div className="grid mb-3 mt-3">
                                    <label className='col-4' htmlFor="ask">In Greece, tourism is the most important</label>
                                    <InputText className='col-8' id="ask" name="ask" value={question.ask} onChange={handleInputChange} />
                                </div>
                            <div className='form-actions'>
                                <ToggleButton checked={showPreview} onLabel="Preview" offLabel='Preview' onChange={(e) => setShowPreview(e.value)}
                                    onIcon="pi pi-caret-right" offIcon="pi pi-caret-left" />
                                <Button label="Add" className='mx-2' icon="pi pi-plus" />
                            </div>
                        </Card>
                    </form>
                </div>

                {showPreview && <div className='col'>
                    <div className="html-content" dangerouslySetInnerHTML={{ __html: text }} />
                </div>}
            </div>


        </div>
    )
}