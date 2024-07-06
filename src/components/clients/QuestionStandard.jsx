import React, { useState, useEffect } from "react";
import { Button } from 'primereact/button';
import { RadioButton } from 'primereact/radiobutton';

export default function QuestionStandard({ question: initialQuestion }) {
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

    useEffect(() => {
        // console.log(selectedAnswer);
        if (selectedAnswer) {
            // const isCorrect = selectedAnswer.option === question.correctAnswer;
            setResult({
                isCorrect: selectedAnswer.isCorrect,
                submitted: true
            });
        }
    }, [selectedAnswer]);

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
                <p className='text-left' style={{fontWeight:'600'}}>{question.content}</p>
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
                            <span htmlFor={opt.option} className="ml-2" style={{fontWeight: '500'}}>{opt.option}</span>
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
                {/* <Button className='mt-3' label="Submit" icon="pi pi-save" onClick={submit} /> */}
            </div>
        </div>
    );
}
