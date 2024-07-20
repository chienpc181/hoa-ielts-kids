import { useState, useEffect } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import { joinParagraphsToTextArea, splitTextAreaToParagraphs } from '../../utils';

export default function DoubleLangInputTextAreas({ paraLang, handleChange, numberOfRow }) {
    const [textEn, setTextEn] = useState(joinParagraphsToTextArea(paraLang, 'en'));
    const [textVi, setTextvi] = useState(joinParagraphsToTextArea(paraLang, 'vi'));

    useEffect(() => {
        let paragraphEns = splitTextAreaToParagraphs(textEn);
        let paragraphVis = splitTextAreaToParagraphs(textVi);
        if (paragraphEns && paragraphVis && paragraphEns.length === paragraphVis.length) {
            const paras = [];
            for (let i = 0; i < paragraphEns.length; i++) {
                paras.push({
                    en: paragraphEns[i],
                    vi: paragraphVis[i]
                })
            }
            handleChange(paras)
        }
        
    }, [textEn, textVi])

    
    return (
        <div className='w-full mt-2'>
            <div className='flex'>
                <div className='w-full mr-2'>
                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon" style={{alignItems: 'start'}}>ENG</span>
                        <InputTextarea
                            className='double-textarea'
                            autoResize
                            rows={numberOfRow ? numberOfRow : 4}
                            value={textEn}
                            onChange={(e) => setTextEn(e.target.value)}
                        />
                    </div>
                </div>
                <div className='w-full ml-2'>
                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon" style={{alignItems: 'start'}}>VIE</span>
                        <InputTextarea
                            className='double-textarea'
                            autoResize
                            rows={numberOfRow ? numberOfRow : 4}
                            value={textVi}
                            onChange={(e) => setTextvi(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}