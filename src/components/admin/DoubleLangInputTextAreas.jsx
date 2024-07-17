import { useState, useEffect } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import { Divider } from 'primereact/divider';

export default function DoubleLangInputTextAreas({ textLang, handleTextChange, index }) {
    const [textEn, setTextEn] = useState(textLang.en);
    const [textVi, setTextvi] = useState(textLang.vi);
    const [paragraphEns, setParagraphEns] = useState([])
    const [paragraphVis, setParagraphVis] = useState([])
    const handleChangeEn = (e) => {
        const text = e.target.value;
        
        setTextEn(e.target.value);
    }
    const handleChangeVi = (e) => {
        setTextvi(e.target.value);
    }

    useEffect(() => {
        handleTextChange({
            textEn,
            textVi
        }, index);
    }, [textEn, textVi])
    return (
        <div className='w-full'>
            <Divider type='dashed' />
            <div className='flex'>
                <div className='w-full mr-2'>
                    <span className='flex' style={{ alignItems: 'flex-start', fontSize: '14px', fontWeight: '500' }}>ENG</span>
                    <InputTextarea
                        className='double-textarea'
                        autoResize
                        rows={4}
                        value={textEn}
                        onChange={handleChangeEn}
                    />
                </div>
                <div className='w-full ml-2'>
                    <span className='flex' style={{ alignItems: 'flex-start', fontSize: '14px', fontWeight: '500' }}>VIE</span>
                    <InputTextarea
                        autoResize
                        rows={4}
                        value={textVi}
                        onChange={handleChangeVi}
                        className='double-textarea'
                    />
                </div>
            </div>
        </div>
    )
}