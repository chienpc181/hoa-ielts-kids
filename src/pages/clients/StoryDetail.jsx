import './client.css';
import './Stories.css';
import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SwitchLang from '../../components/clients/SwitchLang';
import useDocument from '../../hooks/useDocument';
import { Button } from 'primereact/button';
import { ToggleButton } from 'primereact/togglebutton';
import { Dropdown } from 'primereact/dropdown';
import useFilteredSpeechSynthesis from '../../hooks/useFilteredSpeechSynthesis ';
import { OverlayPanel } from 'primereact/overlaypanel';

export default function StoryDetail() {
    const { id } = useParams();
    const { document, error } = useDocument('HikStories', id);
    const [translate, setTranslate] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);
    const op = useRef([]);
    const { speak, cancel, speaking, voices, supported } = useFilteredSpeechSynthesis();
    const [selectedVoice, setSelectedVoice] = useState(null);

    useEffect(() => {
        
        if (voices.length > 0) {
            setSelectedVoice(voices[0]);
        }
    }, [voices]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!document) {
        return <div>Loading...</div>;
    }

    const toggleOverlay = (e, index) => {
        setCurrentIndex(index);
        op.current[index].toggle(e); 
    };

    const handleSpeak = () => {
        console.log(selectedVoice);
        const text = document.paragraphs
            .map(para => (translate ? para.en : para.vi))
            .join(' ');
        speak({ text, voice: selectedVoice });
    };

    const handlePauseResume = () => {
        if (speaking) {
            cancel();
        } else {
            handleSpeak();
        }
    };

    return (
        <div className='page-client'>
            <div className='page-content' style={{maxWidth:'600px'}}>
                <div className='pt-3'>
                    <SwitchLang translate={translate} setTranslate={setTranslate}/>
                </div>
                <div className='block justify-content-center mt-4'>
                <Dropdown className='w-full'
                        value={selectedVoice} 
                        options={voices} 
                        onChange={(e) => setSelectedVoice(e.value)} 
                        optionLabel="name" 
                        optionValue="voiceURI"
                        placeholder="Select a Voice"
                    />
                    <ToggleButton 
                        checked={speaking} 
                        onChange={handlePauseResume} 
                        onIcon="pi pi-pause" 
                        offIcon="pi pi-play" 
                        onLabel="Pause" 
                        offLabel="Read Story" 
                    />
                </div>
                <div className='main-content'>
                    {translate ? <h2>{document.title.en}</h2> : <h2>{document.title.vi}</h2>}
                    <div className='px-2'>
                        {document.paragraphs.map((para, index) => (
                            <div key={index}>
                                {translate ? (
                                    <p className='story-para' onClick={(e) => toggleOverlay(e, index)}>{para.en}</p>
                                ) : (
                                    <p className='story-para' onClick={(e) => toggleOverlay(e, index)}>{para.vi}</p>
                                )}
                                <OverlayPanel ref={el => op.current[index] = el}>
                                    {translate ? (
                                        <p className='story-para'>{para.vi}</p>
                                    ) : (
                                        <p className='story-para'>{para.en}</p>
                                    )}
                                </OverlayPanel>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
