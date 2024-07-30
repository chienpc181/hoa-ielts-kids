import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';

const replaceSpecialSyntax = (text) => {
    // Use a regular expression to replace [text] with <strong>text</strong>
    return text.replace(/\[(.*?)\]/g, '<strong>$1</strong>');
};

export default function DoubleLangText({ children, textLang, speakText, isExample = false }) {
    const isENG = useSelector((state) => state.lang.translate);
    const op = useRef(null);

    const translateTextLang = (textLang) => {
        if (isExample) {
            return textLang.en;
        }
        return isENG ? textLang.en : textLang.vi;
    };

    const handleSpeak = (text) => {
        speakText(text);
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Text copied to clipboard');
        }).catch((err) => {
            console.error('Failed to copy text: ', err);
        });
    };

    const translatedText = translateTextLang(textLang);
    const processedText = replaceSpecialSyntax(translatedText);

    return (
        <>
            {/* <p className='story-para' onClick={(e) => op.current.toggle(e)}>{processedText}</p> */}
            {children({
                text: (
                    <span
                        dangerouslySetInnerHTML={{ __html: processedText }}
                        onClick={(e) => op.current.toggle(e)}
                    />
                ),
                onClick: (e) => op.current.toggle(e)
            })}
            <OverlayPanel ref={op} showCloseIcon appendTo={document.getElementById('app-container')} style={{ maxWidth: '700px' }}>
                <div className='flex justify-content-end mb-2'>
                    <Button rounded text icon="pi pi-copy" onClick={() => handleCopy(textLang.en)} />
                    <Button rounded text icon="pi pi-volume-up" onClick={() => handleSpeak(textLang.en)} />
                </div>
                {!isENG && !isExample && <p style={{ fontStyle: 'italic', margin: '0' }} dangerouslySetInnerHTML={{ __html: replaceSpecialSyntax(textLang.en) }} />}
                {(isENG || isExample) && <p style={{ fontStyle: 'italic', margin: '0' }} dangerouslySetInnerHTML={{ __html: replaceSpecialSyntax(textLang.vi) }} />}
            </OverlayPanel>
        </>
    );
}
