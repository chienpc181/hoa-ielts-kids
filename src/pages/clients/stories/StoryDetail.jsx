import '../client.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SwitchLang from '../../../components/clients/SwitchLang';
import useDocument from '../../../hooks/useDocument';
import { Button } from 'primereact/button';
import { ToggleButton } from 'primereact/togglebutton';
import { useSpeechSynthesis } from 'react-speech-kit';
import { Image } from 'primereact/image';
import { useSelector } from 'react-redux';
import DoubleLangText from '../../../components/clients/DoubleLangText';

export default function StoryDetail() {
    const { id } = useParams();
    const { document, error } = useDocument('HikStories', id);
    const { speak, cancel, speaking, voices, supported } = useSpeechSynthesis();
    const [selectedVoice, setSelectedVoice] = useState(null);
    const translate = useSelector(state => state.lang.translate);
    
    const user = useSelector(state => state.auth.user);
    const isUserAdmin = user?.role === 'admin' ? true : false;
    const navigate = useNavigate();

    useEffect(() => {
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

    const getTranslate = (text) => {
        return translate ? text.en : text.vi;
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

    const handleSpeakText = (text) => {
        speak({ text, voice: selectedVoice });
    };

    return (
        <div className='page-client'>
            <div className='page-content' style={{maxWidth:'700px'}}>
                {isUserAdmin && <div className='pt-3'>
                    <Button onClick={() => navigate(`../admin/stories/${document.id}`)}>Edit</Button>
                </div>}
                <div className='pt-3'>
                    <SwitchLang/>
                </div>
                <div className='block justify-content-center mt-4'>
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
                    <Image src={document.thumbnailUrl} alt="Image" className='shadow-2 border-round'></Image>
                    <h1>{getTranslate(document.title)}</h1>
                    <span className='flex justify-content-end' style={{fontStyle: 'italic'}}>{document.author}</span>
                    <div className=''>
                        {document.paragraphs.map((para, index) => (
                            <DoubleLangText key={index} textLang={para} speakText={handleSpeakText}>
                                {({ text, onClick }) => <p className='story-para' onClick={onClick}>{text}</p>}
                            </DoubleLangText>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
