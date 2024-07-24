import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const FillInTheBlankExercise = ({ sentence, correctAnswer, isShortBlank = true, index }) => {
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState('');
    const [parts, setParts] = useState([]);
    const [matches, setMatches] = useState([]);
    const regex = /_+[^_\s]*_+/g;
    const [correct, setCorrect] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    // const [blankStyle, setBlankStyle] = useState([])

    useEffect(() => {
        const partsArray = sentence.split(regex);
        const matchesArray = sentence.match(regex) || [];
        setParts(partsArray);
        setMatches(matchesArray);
    }, [sentence]);

    const handleChange = (index, value) => {
        setAnswers(prev => ({
            ...prev,
            [index]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Build the userAnswer by concatenating parts and answers
        let userAnswer = parts.reduce((acc, part, index) => {
            return acc + part + (answers[index] || '');
        }, '');
    
        // Remove placeholder text (e.g., "(live)", "(study)") from userAnswer
        userAnswer = userAnswer.replace(/\([^)]*\)/g, '');
    
        // Normalize the string by removing punctuation and normalizing spaces
        const normalizeString = (text) => {
            return text
                .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '') // Remove punctuation
                .replace(/\s+/g, ' ') // Normalize spaces
                .trim() // Trim leading and trailing spaces
                .toLowerCase();
        };

        // Compare normalized finalAnswer with normalized correctAnswer
        if (normalizeString(userAnswer) === normalizeString(correctAnswer)) {
            setFeedback('Correct.');
            setCorrect(true);
        } else {
            setFeedback('Incorrect.');
            setCorrect(false);
        }

        // // Set blank styles
        // const newBlankStyle = matches.map((match, i) => {
        //     const correctBlank = correctAnswer.match(regex)[i];
        //     const normalizedCorrectBlank = normalizeString(correctBlank);
        //     const normalizedUserBlank = normalizeString(answers[i] || '');
        //     return {
        //         color: normalizedUserBlank === normalizedCorrectBlank ? 'green' : 'red'
        //     };
        // });
        // setBlankStyle(newBlankStyle);

        setSubmitted(true);
    };

    const blankWidthStyle = () => {
        return isShortBlank ? { width: '100px' } : {};
    };

    const feedbackStyle = () => {
        if (correct) {
            return {
                color: 'green'
            }
        }
        else {
            return {
                color: 'red'
            }
        }
    }
    
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
                        value={answers[index] || ''}
                        onChange={(e) => handleChange(index, e.target.value)}
                        className='input-blank'
                        style={{ ...blankWidthStyle()}}
                        disabled={submitted}
                    />
                );
                blankIndex++;
            }
            return element;
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <p>{index}. {renderSentenceWithBlanks()}</p>
                {submitted && <p style={{fontStyle:'italic'}}>{correctAnswer}</p>}
                {!submitted && <Button type="submit"  text raised outlined>Check answer</Button>}
            </form>
            {feedback && <p style={feedbackStyle()}>{feedback}</p>}
        </div>
    );
};

FillInTheBlankExercise.propTypes = {
    sentence: PropTypes.string.isRequired,
    correctAnswer: PropTypes.string.isRequired
};

export default FillInTheBlankExercise;
