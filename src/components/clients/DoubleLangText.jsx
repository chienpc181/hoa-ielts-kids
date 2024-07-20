import { useSelector } from 'react-redux';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import { useRef } from 'react';

export default function DoubleLangText({children, textLang, speakText }) {
    const translate = useSelector(state => state.lang.translate);
    const op = useRef(null);

    const getTranslate = (text) => {
        return translate ? text.en : text.vi;
    };

    const handleSpeak = (text) => {
        speakText(text);
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Text copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };

    return (
        <>
            {/* <p className='story-para' onClick={(e) => op.current.toggle(e)}>{getTranslate(textLang)}</p> */}
            {children({ text: getTranslate(textLang), onClick: (e) => op.current.toggle(e) })}
            <OverlayPanel ref={op} style={{ maxWidth: '700px' }}>
                {translate ? (
                    <p style={{ fontStyle: 'italic', margin: '0' }}>{textLang.vi}</p>
                ) : (
                    <>
                        <div className='flex justify-content-end mb-2'>
                            <Button rounded text icon="pi pi-copy" onClick={() => handleCopy(textLang.en)} />
                            <Button rounded text icon="pi pi-volume-up" onClick={() => handleSpeak(textLang.en)} />
                        </div>
                        <p style={{ fontStyle: 'italic', margin: '0' }}>{textLang.en}</p>
                    </>
                )}
            </OverlayPanel></>
    )
}
