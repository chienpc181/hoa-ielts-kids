import '../client.css';
import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SwitchLang from '../../../components/clients/SwitchLang';
import useDocument from '../../../hooks/useDocument';
import { Button } from 'primereact/button';
import { ToggleButton } from 'primereact/togglebutton';
import { Dropdown } from 'primereact/dropdown';
import { OverlayPanel } from 'primereact/overlaypanel';
import { useSpeechSynthesis } from 'react-speech-kit';
import { Image } from 'primereact/image';
import { useSelector } from 'react-redux';

export default function StoryDetail() {
    const { id } = useParams();
    const { document, error } = useDocument('HikStories', id);
    const [currentIndex, setCurrentIndex] = useState(null);
    const op = useRef([]);
    // const { speak, cancel, speaking, voices, supported } = useFilteredSpeechSynthesis();
    const { speak, cancel, speaking, voices, supported } = useSpeechSynthesis();
    const [selectedVoice, setSelectedVoice] = useState(null);
    // const [voicesEN, setVoicesEN] = useState([]);
    const translate = useSelector(state => state.lang.translate);
    const getTranslate = (text) => {
        return translate ? text.en : text.vi;
    };

    useEffect(() => {
        // setVoicesEN(voices);
        // if (voicesEN.length > 0) {
            
        //     setSelectedVoice(voicesEN[0]);
        // }

        const englishVoices = voices.filter(voice => voice.lang.startsWith('en'));
        if (englishVoices.length > 0) {
            setSelectedVoice(englishVoices[0]);
        } else {
            setSelectedVoice(null);
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
        const content = document.paragraphs
            .map(para => (translate ? para.en : para.vi))
            .join('\n');
        const text = getTranslate(document.title) + "\n" + content;
        speak({ text, voice: selectedVoice });
    };

    const handlePauseResume = () => {
        if (speaking) {
            cancel();
        } else {
            handleSpeak();
        }
    };

    const handleSpeakPara = (text) => {
        speak({ text, voice: selectedVoice });
    };

    const handleCopyPara = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Text copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };

    return (
        <div className='page-client'>
            <div className='page-content' style={{maxWidth:'700px'}}>
                <div className='pt-3'>
                    <SwitchLang/>
                </div>
                <div className='block justify-content-center mt-4'>
                    {/* <Dropdown className='w-full mb-2'
                        value={selectedVoice} 
                        options={voicesEN} 
                        onChange={(e) => setSelectedVoice(e.value)} 
                        optionLabel="name" 
                        // optionValue="voiceURI"
                        placeholder="Select a Voice"
                    /> */}
                    {translate && <ToggleButton 
                        checked={speaking} 
                        onChange={handlePauseResume} 
                        onIcon="pi pi-pause" 
                        offIcon="pi pi-play" 
                        onLabel="Pause" 
                        offLabel="Listen" 
                        disabled={!selectedVoice} 
                    />}
                </div>
                <div className='mt-3'>
                    <Image src={document.thumbnailUrl} alt="Image"></Image>
                    <h1>{getTranslate(document.title)}</h1>
                    <span className='flex justify-content-end' style={{fontStyle: 'italic'}}>{document.author}</span>
                    <div className=''>
                        {document.paragraphs.map((para, index) => (
                            <div key={index}>
                                <p className='story-para' onClick={(e) => toggleOverlay(e, index)}>{getTranslate(para)}</p>
                                <OverlayPanel ref={el => op.current[index] = el} style={{ maxWidth: '700px'}}>
                                    {translate ? (
                                        <span style={{fontSize: '1rem', fontWeight: '500'}}>{para.vi}</span>
                                    ) : (
                                        <>
                                            <div className='flex justify-content-end mb-2'>
                                                <Button rounded text icon="pi pi-copy" onClick={() => handleCopyPara(para.en)}/>
                                                <Button rounded text icon="pi pi-volume-up" onClick={() => handleSpeakPara(para.en)}/>
                                            </div>
                                            <span style={{fontSize: '1rem', fontWeight: '500'}}>{para.en}</span>
                                        </>
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
