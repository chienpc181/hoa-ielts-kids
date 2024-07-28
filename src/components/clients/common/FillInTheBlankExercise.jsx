import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { InputText } from 'primereact/inputtext';
import { normalizeString } from '../../../utils';
import SubmitAnswerBar from './SubmitAnswerBar';
import { Divider } from 'primereact/divider';

const FillInTheBlankExercise = ({ sentence, correctAnswer, isShortBlank = true, sequenceNumber }) => {
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState('');
    const [parts, setParts] = useState([]);
    const [matches, setMatches] = useState([]);
    const regex = /_+[^_\s]*_+/g;
    const [correct, setCorrect] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const partsArray = sentence.split(regex);
        const matchesArray = sentence.match(regex) || [];
        setParts(partsArray);
        setMatches(matchesArray);
    }, [sentence]);

    const handleChange = (index, value) => {
        setAnswers(prev => ({
            ...prev,
            ['blank'+index]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Build the userAnswer by concatenating parts and answers
        let userAnswer = parts.reduce((acc, part, index) => {
            return acc + part + (answers['blank'+index] || '');
        }, '');
    
        // Remove placeholder text (e.g., "(live)", "(study)") from userAnswer
        userAnswer = userAnswer.replace(/\([^)]*\)/g, '');

        // Compare normalized finalAnswer with normalized correctAnswer
        if (normalizeString(userAnswer) === normalizeString(correctAnswer)) {
            setFeedback('Correct');
            setCorrect(true);
        } else {
            setFeedback('Incorrect');
            setCorrect(false);
        }

        setSubmitted(true);
    };

    const blankWidthStyle = isShortBlank ? { width: '100px' } : {};

    const renderSentenceWithBlanks = () => {
        let blankIndex = 0;

        return parts.map((part, index) => {
            const element = [];
            element.push(<span key={`text-${index}`}>{part}</span>);
            if (blankIndex < matches.length) {
                element.push(
                    <InputText
                        key={`input-${index}`}
                        type="text"
                        value={answers['blank'+index] || ''}
                        onChange={(e) => handleChange(index, e.target.value)}
                        className='input-blank'
                        style={{ ...blankWidthStyle, ...inputStyleAfterSubmit}}
                        disabled={submitted}
                    />
                );
                blankIndex++;
            }
            return element;
        });
    };

    const canSubmit = () => !submitted && answers['blank'+0] && answers['blank'+0].length;

    const inputStyleAfterSubmit = submitted && !correct ? { textDecoration: 'line-through' } : {};

    const handleReset = () => {
        setAnswers({});
        setSubmitted(false);
        setCorrect(false);
        setFeedback('');
    };

    return (
        <div>
            {sequenceNumber > 1 && <Divider type='dashed' />}
            <p>
                <strong>{sequenceNumber}. </strong>
                {renderSentenceWithBlanks()}
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

FillInTheBlankExercise.propTypes = {
    sentence: PropTypes.string.isRequired,
    correctAnswer: PropTypes.string.isRequired
};

export default FillInTheBlankExercise;
