import React from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from 'primereact/inputtextarea';

const QuestionContentStandard = ({ question, handleInputChange, handleAnswerOptionChange }) => {
    return (
        <div className='form-content'>
            <div className="form-field mt-3">
                <label className='col-3' htmlFor="content">Content</label>
                <InputTextarea className='col-9' id="content" name="content" value={question.content} onChange={(e) => handleInputChange(e, question.id)} />
            </div>
            {question.options.map((opt, index) => (
                <div key={index} className="form-field">
                    <label className='col-3'>Option {index + 1}</label>
                    <InputText
                        className='col-9'
                        value={opt.option}
                        onChange={(e) => handleAnswerOptionChange(question.id, index, e.target.value)}
                    />
                </div>
            ))}
            <div className="form-field">
                <label className='col-3' htmlFor="correctAnswer">Correct answer</label>
                <InputText className='col-9' id="correctAnswer" name="correctAnswer" value={question.correctAnswer} onChange={(e) => handleInputChange(e, question.id)} />
            </div>
            <div className="form-field">
                <label className='col-3' htmlFor="explaination">Explanation</label>
                <InputTextarea className='col-9' id="explaination" name="explaination" autoResize rows={3} value={question.explaination} onChange={(e) => handleInputChange(e, question.id)} />
            </div>
        </div>
    );
};

export default QuestionContentStandard;
