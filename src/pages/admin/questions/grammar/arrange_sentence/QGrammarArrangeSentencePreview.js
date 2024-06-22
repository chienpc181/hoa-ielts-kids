import '../../../admin.css';
import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { RadioButton } from 'primereact/radiobutton';

export default function QGrammarArrangeSentencePreview({ question: initialQuestion }) {
    // const initialQuestion  = {
    //     ask: 'The earthquake surprised people. Yes, I was reading the paper when it …',
    //     answerOptions: [
    //         { name: 'had been hit', key: 'A'},
    //         { name: 'had hit', key: 'B'},
    //         { name: 'has hit', key: 'C' },
    //         { name: 'hit', key: 'D'}
    //     ],
    //     answer: 'had hit',
    //     correct: false,
    //     explain: 'We often use can to talk about ability to do something in the present or future.'
    // };
    const [question, setQuestion] = useState(initialQuestion);
    const [selectedAnswer, setSelectedAnswer] = useState(question.answerOptions[1]);
    const [result, setResult] = useState({
        isCorrect: false,
        submitted: false
    });

    useEffect(() => {
        setQuestion(initialQuestion);
    }, [initialQuestion]);

    const submit = () => {
        const isCorrect = selectedAnswer.name === question.answer;

        setQuestion(prevQuestion => ({
            ...prevQuestion,
            correct: isCorrect
        }));

        setResult(prevResult => ({
            ...prevResult,
            isCorrect: isCorrect,
            submitted: true
        }));
    }
    return (

        <div >
            <div className='card'>
                <h4 className='text-left'>{question.ask}</h4>
                <div className="flex flex-column gap-3">
                    {question.answerOptions.map((answer) => {
                        return (
                            <div key={answer.key} className="flex align-items-center">
                                <RadioButton inputId={answer.key} name="answer" value={answer}
                                    onChange={(e) => setSelectedAnswer(e.value)}
                                    checked={selectedAnswer.key === answer.key}
                                />
                                <label htmlFor={answer.key} className="ml-2">{answer.name}</label>
                            </div>
                        );
                    })}
                </div>
                {result.submitted && <>
                    {result.isCorrect && <div style={{ color: 'green' }}>Correct {question.correct}</div>}
                    {!result.isCorrect && <div style={{ color: 'red' }}>Wrong {question.correct}</div>}
                    <div>{question.explain}</div>
                </>
                }
                <Button className='mt-3' label="Submit" icon="pi pi-save" onClick={submit} />
            </div>
        </div>
    )
}