import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'primereact/button';
import { ButtonGroup } from 'primereact/buttongroup';
import { useSpeechSynthesis } from 'react-speech-kit';
import { useSelector } from 'react-redux';

const SubmitAnswerBar = ({ feedback, correct, canSubmit, handleSubmit, handleReset, submitted, correctAnswer }) => {
    const feedbackStyle = {
        color: correct ? '#22c55e' : '#ef4444',
        fontWeight: '600',
    };

    const { speak } = useSpeechSynthesis();
    const selectedVoice  = useSelector(state => state.speechSynthesis.selectedVoice );

    const handleSpeak = () => {
        speak({ text: correctAnswer, voice: selectedVoice, rate: 0.7, pitch: 1 });
    }

    return (
        <>
            <div className='flex justify-content-between align-items-center'>
                <div>
                    {feedback && (
                        <span style={feedbackStyle}>
                            <i className={`pi ${correct ? 'pi-check-circle' : 'pi-times-circle'}`} style={{ fontWeight: '600' }}></i>
                            <span className='ml-1'>{feedback}</span>
                        </span>
                    )}
                </div>
                <ButtonGroup>
                    <Button text raised disabled={!canSubmit()} icon="pi pi-check" onClick={handleSubmit}></Button>
                    <Button text raised icon="pi pi-refresh" onClick={handleReset}></Button>
                    <Button text raised icon="pi pi-volume-up" onClick={handleSpeak}></Button>
                </ButtonGroup>
            </div>
            {submitted && <p style={{ fontStyle: 'italic' }}>{correctAnswer}</p>}
        </>
    );
};

SubmitAnswerBar.propTypes = {
    feedback: PropTypes.string,
    correct: PropTypes.bool.isRequired,
    canSubmit: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleReset: PropTypes.func.isRequired,
    submitted: PropTypes.bool.isRequired,
    correctAnswer: PropTypes.string.isRequired
};

export default SubmitAnswerBar;
