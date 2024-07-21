import AddnRemoveListItem from "../common/AddnRemoveListItem"
import FillInTheGap from "./FillInTheGap"
import { Button } from "primereact/button"
import { useState, useEffect } from "react"
import { Divider } from 'primereact/divider';

export default function FillInTheGapList ({exercises, onChange}) {
    const [_exercises, setExercises] = useState(exercises);
    
    const initFillInTheGap = {
        content: '',
        answer: ''
    }



    const handleAddOrRemoveItem = (items) => {
        setExercises(items);
    }

    const handleOnChangeItem = (updateItem, idx) => {
        const newList = _exercises.map((item, i) => (i === idx ? updateItem : item));
        setExercises(newList);
    }

    useEffect(() => {
        onChange(_exercises);
    }, [_exercises])

    return (
        <>
        {_exercises && <div className='w-full mt-2 card'>
            <div className="form-field justify-content-between">
                <label>Fill in the gap</label>
                <AddnRemoveListItem items={_exercises} initItem={initFillInTheGap} onChange={handleAddOrRemoveItem}></AddnRemoveListItem>
            </div>
            
            {_exercises.map((item, idx) => (
                
                <div className="form-field block" key={idx}>
                    <Divider align="left">
                        <div className="inline-flex align-items-center">
                            <label>Exercise {idx + 1}</label>
                        </div>
                    </Divider>
                    <FillInTheGap exercise={item} onChange={(item) => handleOnChangeItem(item, idx)}></FillInTheGap>
                </div>
            ))}
        </div>}
        </>
    )
}