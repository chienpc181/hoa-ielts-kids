import { Button } from "primereact/button"
import { useState, useEffect } from "react"

export default function AddnRemoveListItem ({items, initItem, onChange}) {
    const [_items, setItems] = useState(items);

    const handleAddItem = () => {
        setItems(prev => [...prev, initItem]);
    }
    const handleRemoveItem = () => {
        if (_items.length > 1) {
            setItems(prev => prev.slice(0, -1));
        }
    }

    useEffect(() => {
        onChange(_items);
    }, [_items])

    return (
        <div>
            <Button label='-' outlined onClick={handleRemoveItem} type='button' disabled={_items.length <= 1} />
            <Button className='ml-2' label='+' outlined onClick={handleAddItem} type='button' />
        </div>
    )
}