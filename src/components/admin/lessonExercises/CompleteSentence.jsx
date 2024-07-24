import { InputText } from "primereact/inputtext"
import { useState, useEffect } from "react"

export default function CompleteSentence({ exercise, onChange }) {
    const [_exercise, setExercise] = useState(exercise);

    useEffect(() => {
        onChange(_exercise);
    }, [_exercise])

    return (
        <>
            {_exercise && <div className="w-full">
                <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon" style={{width: '75px'}}>Content</span>
                    <InputText value={_exercise.content} onChange={(e) => setExercise(prev => ({ ...prev, content: e.target.value }))} />
                </div>
                <div className="p-inputgroup flex-1 mt-3">
                    <span className="p-inputgroup-addon" style={{width: '75px'}}>Answer</span>
                    <InputText value={_exercise.answer} onChange={(e) => setExercise(prev => ({ ...prev, answer: e.target.value }))} />
                </div>
            </div>}
        </>
    )
}