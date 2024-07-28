import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
import SubmitAnswerBar from './SubmitAnswerBar';
import { normalizeString } from '../../../utils';

const CompleteSentenceExercise = ({ sentence, correctAnswer, sequenceNumber }) => {
    const [answer, setAnswer] = useState('');
    const [feedback, setFeedback] = useState('');
    const [correct, setCorrect] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (normalizeString(answer) === normalizeString(correctAnswer)) {
            setFeedback('Correct');
            setCorrect(true);
        } else {
            setFeedback('Incorrect');
            setCorrect(false);
        }
        setSubmitted(true);
    };

    const canSubmit = () => !submitted && answer.trim().length > 0;

    const inputStyleAfterSubmit = submitted && !correct ? { textDecoration: 'line-through' } : {};

    const handleReset = () => {
        setAnswer('');
        setSubmitted(false);
        setCorrect(false);
        setFeedback('');
    };

    return (
        <div>
            {sequenceNumber > 1 && <Divider type='dashed' />}
            <p>
                <strong>{sequenceNumber}. </strong>
                {sentence}
            </p>
            <p>
                <InputText
                    key={`input-${sequenceNumber}`}
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className='input-blank full-row'
                    disabled={submitted}
                    style={inputStyleAfterSubmit}
                />
            </p>
            <SubmitAnswerBar
                feedback={feedback}
                correct={correct}
                canSubmit={canSubmit}
                handleSubmit={handleSubmit}
                handleReset={handleReset}
                submitted={submitted}
                correctAnswer={correctAnswer}
            />
        </div>
    );
};

CompleteSentenceExercise.propTypes = {
    sentence: PropTypes.string.isRequired,
    correctAnswer: PropTypes.string.isRequired,
    sequenceNumber: PropTypes.number.isRequired
};

export default CompleteSentenceExercise;
