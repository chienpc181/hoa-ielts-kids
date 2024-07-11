import { useState, useEffect } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import { Divider } from 'primereact/divider';

export default function DoubleLangTexts({ textLang, handleTextChange, index }) {
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
    const textAreaStyle = {
        border: 'none',
        boxShadow: 'none',
        borderRight: '1px solid #d1d5db',
        borderLeft: '1px solid #d1d5db',
        borderRadius: 0,
        background: '#f9fafb',
        width: '100%'
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
                <div className='w-full ml-2'>
                    <span className='flex' style={{ alignItems: 'flex-start', fontSize: '14px', fontWeight: '500' }}>ENG</span>
                    <InputTextarea
                        className='w-full mr-2'
                        autoResize
                        rows={4}
                        value={textEn}
                        onChange={handleChangeEn}
                        style={textAreaStyle}
                    />
                </div>
                <div className='w-full ml-2'>
                    <span className='flex' style={{ alignItems: 'flex-start', fontSize: '14px', fontWeight: '500' }}>VIE</span>
                    <InputTextarea
                        autoResize
                        rows={4}
                        value={textVi}
                        onChange={handleChangeVi}
                        style={textAreaStyle}
                    />
                </div>
            </div>
        </div>
    )
}