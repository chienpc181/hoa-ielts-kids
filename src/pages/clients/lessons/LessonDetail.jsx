import '../client.css';
import useDocument from '../../../hooks/useDocument';
import { useParams, useNavigate } from 'react-router-dom';
import { Image } from 'primereact/image';
import { TabView, TabPanel } from 'primereact/tabview';
import { useCollection } from '../../../hooks/useCollection';
import QuestionStandard from '../../../components/clients/QuestionStandard';
import { useSelector } from 'react-redux';
import SwitchLang from '../../../components/clients/SwitchLang';
import DoubleLangText from '../../../components/clients/DoubleLangText';
import { useSpeechSynthesis } from 'react-speech-kit';
import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';

export default function LessonDetail() {
    const { id } = useParams();
    const { document, error } = useDocument('HikLessons', id);
    const { documents: practices } = useCollection(
        "HikQuestions",
        // ["IsActive", "==", true], 
        // ["CreatedAt", "desc"] 
    );

    const user = useSelector(state => state.auth.user);
    const isUserAdmin = user?.role === 'admin' ? true : false;
    const navigate = useNavigate();

    const { speak, cancel, speaking, voices, supported } = useSpeechSynthesis();
    const [selectedVoice, setSelectedVoice] = useState(null);

    useEffect(() => {
        const englishVoices = voices.filter(voice => voice.lang.startsWith('en'));
        if (englishVoices.length > 0) {
            setSelectedVoice(englishVoices[0]);
        } else {
            setSelectedVoice(null);
        }

    }, [voices]);

    const translate = useSelector(state => state.lang.translate);
    const getTranslate = (text) => {
        return translate ? text.en : text.vi;
    };

    const handleSpeakText = (text) => {
        speak({ text, voice: selectedVoice });
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!document) {
        return <div>Loading...</div>;
    }
    return (
        <div className='page-client'>
            <div className='page-content'>
                {isUserAdmin && <div className='pt-3'>
                    <Button onClick={() => navigate(`../admin/lessons/${document.id}`)}>Edit</Button>
                </div>}
                <div className='py-3'>
                    <SwitchLang />
                </div>
                <div className='lesson'>
                    <Image src={document.thumbnailUrl} alt="Image" ></Image>
                    <h1>{getTranslate(document.title)}</h1>
                    <TabView>
                        <TabPanel header={translate ? 'Summary' : 'Tóm tắt'} leftIcon="pi pi-book mr-2">
                            <div >
                                <>
                                    {translate ? <h2>I. Introduce</h2> : <h2>I. Giới thiệu</h2>}
                                    {document.introduce.map((intro, index) => (
                                        <DoubleLangText key={index} textLang={intro} speakText={handleSpeakText}>
                                            {({ text, onClick }) => <li className='lesson-listItem ' onClick={onClick}>{text}</li>}
                                        </DoubleLangText>
                                    ))}</>
                                <>
                                    {translate ? <h2>II. Structure</h2> : <h2>II. Công thức</h2>}
                                    {document.structures.map((structure, index) => (
                                        <div key={index} className='border-1 border-400 pl-3 mb-2 px-2'>
                                            <DoubleLangText textLang={structure.title} speakText={handleSpeakText}>
                                                {({ text, onClick }) => <p className='lesson-text' onClick={onClick}>{text}</p>}
                                            </DoubleLangText>
                                            {structure.examples.map((example, idx) =>
                                                <DoubleLangText key={idx} textLang={example} speakText={handleSpeakText}>
                                                    {({ text, onClick }) => <li className='lesson-listItem ' onClick={onClick}>{text}</li>}
                                                </DoubleLangText>)}
                                        </div>
                                    ))}
                                </>
                                <>
                                    {translate ? <h2>III. Usages</h2> : <h2>III. Sử dụng</h2>}
                                    {document.usages.map((usage, index) => (
                                        <div key={index}>
                                            <div className='my-2'>
                                                <DoubleLangText textLang={usage.usage} speakText={handleSpeakText}>
                                                    {({ text, onClick }) => <span className='lesson-text' style={{fontWeight: 600}} onClick={onClick}>{index + 1}. {text}</span>}
                                                </DoubleLangText>
                                                <DoubleLangText textLang={usage.explain} speakText={handleSpeakText}>
                                                    {({ text, onClick }) => <span className='lesson-text' onClick={onClick}> {text}</span>}
                                                </DoubleLangText>
                                            </div>
                                            {usage.examples.map((example, idx) =>
                                                <DoubleLangText key={idx} textLang={example} speakText={handleSpeakText}>
                                                    {({ text, onClick }) => <li className='lesson-listItem ' onClick={onClick}>{text}</li>}
                                                </DoubleLangText>)}
                                        </div>
                                    ))}
                                </>
                                <>
                                    {translate ? <h2>III. Common mistakes</h2> : <h2>III. Lỗi thường gặp</h2>}
                                    {document.commonMistakes.map((mistake, index) => (
                                        <div key={index}>
                                            <DoubleLangText textLang={mistake.title} speakText={handleSpeakText}>
                                                {({ text, onClick }) => <p className='lesson-text' style={{fontWeight: 600}} onClick={onClick}>{index + 1}. {text}</p>}
                                            </DoubleLangText>
                                            {mistake.examples.map((example, idx) =>
                                                <DoubleLangText key={idx} textLang={example} speakText={handleSpeakText}>
                                                    {({ text, onClick }) => <li className='lesson-listItem ' onClick={onClick}>{text}</li>}
                                                </DoubleLangText>)}
                                        </div>
                                    ))}
                                </>
                            </div>
                        </TabPanel>
                        <TabPanel header={translate ? 'Practices' : 'Bài tập'} leftIcon="pi pi-pencil mr-2">
                            {practices.map((question, index) => <QuestionStandard question={question} questionNumber={index} key={index} />)}
                        </TabPanel>
                    </TabView>
                </div>



            </div>
        </div>
    )
}