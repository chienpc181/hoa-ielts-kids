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
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function StoryDetail() {
    const { id } = useParams();
    const { document, error } = useDocument('HikStories', id);
    const { speak, cancel, speaking, voices, supported } = useSpeechSynthesis();
    const selectedVoice = useSelector(state => state.speechSynthesis.selectedVoice);
    const translate = useSelector(state => state.lang.translate);

    const user = useSelector(state => state.auth.user);
    const isUserAdmin = user?.role === 'admin' ? true : false;
    const navigate = useNavigate();

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!document) {
        return <div>Loading...</div>;
    }

    const translateTextLang = (text) => {
        return translate ? text.en : text.vi;
    };

    const handleSpeak = () => {
        const content = document.paragraphs
            .map(para => (translate ? para.en : para.vi))
            .join('\n');
        const text = translateTextLang(document.title) + "\n" + content;
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
        speak({ text, voice: selectedVoice, rate: 0.6, pitch: 1 });
    };

    return (
        <HelmetProvider>
            <div className='page-client'>
                <Helmet>
                    <title>{translateTextLang(document.title)} - Story</title>
                    <meta name="description" content={translateTextLang(document.title)} />
                </Helmet>
                <div className='story-container'>
                    <section>
                        {isUserAdmin && <div className='pt-3'>
                            <Button onClick={() => navigate(`../admin/stories/${document.id}`)}>Edit</Button>
                        </div>}
                        <div className='pt-3'>
                            <SwitchLang />
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
                    </section>
                    <hgroup>
                        <Image src={document.thumbnailUrl} alt="Story-thumbnail"></Image>
                        <h1>{translateTextLang(document.title)}</h1>
                        <div className='author'>
                            <address>{document.author}</address>
                        </div>
                    </hgroup>
                    <article>
                        <section className='main-story'>
                            {document.paragraphs.map((para, index) => (
                                <DoubleLangText key={index} textLang={para} speakText={handleSpeakText}>
                                    {({ text, onClick }) => <p className='story-para' onClick={onClick}>{text}</p>}
                                </DoubleLangText>
                            ))}
                        </section>
                    </article>
                    <aside>
                        <div className='related-stories'>

                        </div>
                    </aside>
                </div>
            </div>
        </HelmetProvider>

    );
}
