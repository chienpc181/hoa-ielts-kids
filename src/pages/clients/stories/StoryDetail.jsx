import '../client.css';
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SwitchLang from '../../../components/clients/SwitchLang';
import { Button } from 'primereact/button';
import { ToggleButton } from 'primereact/togglebutton';
import { useSpeechSynthesis } from 'react-speech-kit';
import { Image } from 'primereact/image';
import { useSelector } from 'react-redux';
import DoubleLangText from '../../../components/clients/DoubleLangText';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import axios from 'axios';
import './Story.css';

export default function StoryDetail() {
    const { id } = useParams();
    const [storyData, setStory] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const { speak, cancel, speaking, voices, supported } = useSpeechSynthesis();
    const selectedVoice = useSelector(state => state.speechSynthesis.selectedVoice);
    const translate = useSelector(state => state.lang.translate);

    const user = useSelector(state => state.auth.user);
    const isUserAdmin = user?.roles.includes('admin') ? true : false;
    const navigate = useNavigate();

    // const baseUrl = 'http://localhost:5000';
    const baseUrl = 'https://truyen-cua-ba.onrender.com';
    // const baseUrl = 'https://truyen-cua-ba.vercel.app';
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${baseUrl}/api/stories/${id}`);
                setStory(response.data);

            } catch (err) {
                if (axios.isCancel(err)) {
                    console.log('Request canceled', err.message);
                } else {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const translateTextLang = (text) => {
        return translate ? text.en : text.vi;
    };

    const handleSpeak = () => {
        const content = storyData.paragraphs
            .map(para => (translate ? para.en : para.vi))
            .join('\n');
        const text = translateTextLang(storyData.title) + "\n" + content;
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
        <>
            {storyData && <HelmetProvider>
                <div className='page-client'>
                    <Helmet>
                        <title>{translateTextLang(storyData.title)} - Story</title>
                        <meta name="description" content={translateTextLang(storyData.title)} />
                    </Helmet>
                    <div className='story-container'>
                        <section>
                            {isUserAdmin && <div className='pt-3'>
                                <Button onClick={() => navigate(`../admin/stories/${storyData._id}`)}>Edit</Button>
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
                        <section>
                            <Image src={storyData.thumbnailUrl} alt="Story-thumbnail"></Image>
                        </section>
                        <article className='story'>
                            <hgroup>
                                <h1>{translateTextLang(storyData.title)}</h1>
                                <div className='author'>
                                    <address>{storyData.author}</address>
                                </div>
                            </hgroup>
                            <section className='main-content'>
                                {storyData.paragraphs.map((para, index) => (
                                    <DoubleLangText key={index} textLang={para} speakText={handleSpeakText}>
                                        {({ text, onClick }) => <p className='story-para' onClick={onClick}>{text}</p>}
                                    </DoubleLangText>
                                ))}
                            </section>
                            <section className='description'>
                                {storyData.description.map((para, index) => (
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
            </HelmetProvider>}
        </>

    );
}
