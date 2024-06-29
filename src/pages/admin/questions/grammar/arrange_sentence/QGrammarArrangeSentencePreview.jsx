import '../../../admin.css';
import React, { useState, useEffect } from "react";
import { Button } from 'primereact/button';
import { RadioButton } from 'primereact/radiobutton';

export default function QGrammarArrangeSentencePreview({ question: initialQuestion }) {
    const [question, setQuestion] = useState(initialQuestion);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [result, setResult] = useState({
        isCorrect: false,
        submitted: false
    });

    useEffect(() => {
        setQuestion(initialQuestion);
        setSelectedAnswer(null);
        setResult({ isCorrect: false, submitted: false });
    }, [initialQuestion]);

    const submit = () => {
        if (selectedAnswer) {
            const isCorrect = selectedAnswer.option === question.correctAnswer;
            setResult({
                isCorrect,
                submitted: true
            });
        }
    };

    return (
        <div>
            <div className='card'>
                <h4 className='text-left'>{question.content}</h4>
                <div className="flex flex-column gap-3">
                    {question.options.map((opt, index) => (
                        <div key={index} className="flex align-items-center">
                            <RadioButton
                                inputId={opt.option}
                                name="option"
                                value={opt}
                                onChange={(e) => setSelectedAnswer(e.value)}
                                checked={selectedAnswer && selectedAnswer.option === opt.option}
                            />
                            <label htmlFor={opt.option} className="ml-2">{opt.option}</label>
                        </div>
                    ))}
                </div>
                {result.submitted && (
                    <>
                        {result.isCorrect ? (
                            <div style={{ color: 'green' }}>Correct</div>
                        ) : (
                            <div style={{ color: 'red' }}>Wrong</div>
                        )}
                        <div>{question.explaination}</div>
                    </>
                )}
                <Button className='mt-3' label="Submit" icon="pi pi-save" onClick={submit} />
            </div>
        </div>
    );
}
