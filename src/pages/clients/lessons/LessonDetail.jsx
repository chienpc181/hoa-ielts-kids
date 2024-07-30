import '../client.css';
import useDocument from '../../../hooks/useDocument';
import { useParams, useNavigate } from 'react-router-dom';
import { Image } from 'primereact/image';
import { TabView, TabPanel } from 'primereact/tabview';
import { useCollection } from '../../../hooks/useCollection';
// import QuestionStandard from '../../../components/clients/QuestionStandard';
import { useSelector } from 'react-redux';
import SwitchLang from '../../../components/clients/SwitchLang';
import DoubleLangText from '../../../components/clients/DoubleLangText';
import { useSpeechSynthesis } from 'react-speech-kit';
import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import FillInTheBlankExercise from '../../../components/clients/common/FillInTheBlankExercise';
import { Divider } from 'primereact/divider';
import { Accordion, AccordionTab } from 'primereact/accordion';
import CompleteSentenceExercise from '../../../components/clients/common/CompleteSentenceExercise';

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

    const { speak} = useSpeechSynthesis();

    const translate = useSelector(state => state.lang.translate);
    const selectedVoice  = useSelector(state => state.speechSynthesis.selectedVoice );
    const getTranslate = (text) => {
        return translate ? text.en : text.vi;
    };

    const handleSpeakText = (text) => {
        speak({ text, voice: selectedVoice, rate: 0.7, pitch: 1 });
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
                                    {translate ? <h2>Introduce</h2> : <h2>Giới thiệu</h2>}
                                    {document.introduce.map((intro, index) => (
                                        <DoubleLangText key={index} textLang={intro} speakText={handleSpeakText}>
                                            {({ text, onClick }) => <li  onClick={onClick}>{text}</li>}
                                        </DoubleLangText>
                                    ))}</>
                                <>
                                    {translate ? <h2>Structure</h2> : <h2>Cấu trúc</h2>}
                                    {document.structures.map((structure, index) => (
                                        <div key={index} className='border-1 border-400 pl-3 mb-3 p-2' style={{borderRadius: '16px'}}>
                                            <DoubleLangText textLang={structure.title} speakText={handleSpeakText}>
                                                {({ text, onClick }) => <p className='lesson-text title mt-0' style={{textAlign: 'justify'}} onClick={onClick}>{text}</p>}
                                            </DoubleLangText>
                                            {structure.examples.map((example, idx) =>
                                                <DoubleLangText key={idx} textLang={example} speakText={handleSpeakText} isExample={true}>
                                                    {({ text, onClick }) => <li  onClick={onClick}>{text}</li>}
                                                </DoubleLangText>)}
                                        </div>
                                    ))}
                                </>
                                <>
                                    {translate ? <h2>Usages</h2> : <h2>Sử dụng</h2>}
                                    {document.usages.map((usage, index) => (
                                        <div key={index}>
                                            <p>
                                                <DoubleLangText textLang={usage.usage} speakText={handleSpeakText}>
                                                    {({ text, onClick }) => <span className='lesson-text title'  onClick={onClick}>{text}</span>}
                                                </DoubleLangText>
                                                <DoubleLangText textLang={usage.explain} speakText={handleSpeakText}>
                                                    {({ text, onClick }) => <span className='lesson-text' onClick={onClick}> {text}</span>}
                                                </DoubleLangText>
                                            </p>
                                            {usage.examples.map((example, idx) =>
                                                <DoubleLangText key={idx} textLang={example} speakText={handleSpeakText} isExample={true}>
                                                    {({ text, onClick }) => <li  onClick={onClick}>{text}</li>}
                                                </DoubleLangText>)}
                                        </div>
                                    ))}
                                </>
                                <>
                                    {translate ? <h2>Common mistakes</h2> : <h2>Lỗi thường gặp</h2>}
                                    {document.commonMistakes.map((mistake, index) => (
                                        <div key={index} className='lesson-mistake'>
                                            <DoubleLangText textLang={mistake.title} speakText={handleSpeakText}>
                                                {({ text, onClick }) => <p className='lesson-text title' onClick={onClick}>{text}</p>}
                                            </DoubleLangText>
                                            {mistake.examples.map((example, idx) =>
                                                <DoubleLangText key={idx} textLang={example} speakText={handleSpeakText} isExample={true}>
                                                    {({ text, onClick }) => <li className={idx === 0 ? 'correct' : 'incorrect'} onClick={onClick}>{text}</li>}
                                                </DoubleLangText>)}
                                        </div>
                                    ))}
                                </>
                            </div>
                        </TabPanel>
                        <TabPanel header='Video'>
                            <div className='mt-6 video-container'>
                                <iframe  src="https://www.youtube.com/embed/THxvJeRp_eo?si=8fowuCRJ3u247R8v" title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
                                </iframe>
                            </div>
                        </TabPanel>
                        <TabPanel header={translate ? 'Exercises' : 'Bài tập'} leftIcon="pi pi-pencil mr-2">
                            <Accordion multiple activeIndex={[0]}>
                                {(document.exercises.fillInTheGaps && document.exercises.fillInTheGaps.length) &&
                                <AccordionTab header='Fill in the blank'>
                                    <div>
                                        {document.exercises.fillInTheGaps.map((item, idx) => 
                                        <div key={idx}>
                                            <FillInTheBlankExercise sentence={item.content} correctAnswer={item.answer} sequenceNumber={idx+1}></FillInTheBlankExercise>
                                        </div>
                                        )}
                                    </div>
                                </AccordionTab>}
                                {(document.exercises.rearrangeSentences && document.exercises.rearrangeSentences.length) &&
                                <AccordionTab header='Rearrange the sentence'>
                                    <div>
                                        {document.exercises.rearrangeSentences.map((item, idx) => 
                                        <div key={idx}>
                                            <CompleteSentenceExercise sentence={item.content} correctAnswer={item.answer} sequenceNumber={idx+1}></CompleteSentenceExercise>
                                        </div>
                                        )}
                                    </div>
                                </AccordionTab>}
                                {(document.exercises.rewriteSentences && document.exercises.rewriteSentences.length) &&
                                <AccordionTab header='Rewrite the sentence'>
                                    <div>
                                        {document.exercises.rewriteSentences.map((item, idx) => 
                                        <div key={idx}>
                                            <CompleteSentenceExercise sentence={item.content} correctAnswer={item.answer} sequenceNumber={idx+1}></CompleteSentenceExercise>
                                        </div>
                                        )}
                                    </div>
                                </AccordionTab>}
                            </Accordion>
                            
                        </TabPanel>
                        
                    </TabView>
                </div>



            </div>
        </div>
    )
}