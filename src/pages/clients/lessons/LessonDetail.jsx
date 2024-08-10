import '../client.css';
import useDocument from '../../../hooks/useDocument';
import { useParams, useNavigate } from 'react-router-dom';
import { Image } from 'primereact/image';
import { TabView, TabPanel } from 'primereact/tabview';
import { useCollection } from '../../../hooks/useCollection';
import { useSelector } from 'react-redux';
import SwitchLang from '../../../components/clients/SwitchLang';
import DoubleLangText from '../../../components/clients/DoubleLangText';
import { useSpeechSynthesis } from 'react-speech-kit';
import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import FillInTheBlankExercise from '../../../components/clients/common/FillInTheBlankExercise';
import { Accordion, AccordionTab } from 'primereact/accordion';
import CompleteSentenceExercise from '../../../components/clients/common/CompleteSentenceExercise';
import { Chip } from 'primereact/chip';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function LessonDetail() {
    const { id } = useParams();
    const { document, error } = useDocument('HikLessons', id);
    const { documents: practices } = useCollection(
        "HikQuestions",
        // ["IsActive", "==", true], 
        // ["CreatedAt", "desc"] 
    );

    const user = useSelector(state => state.auth.user);
    const isUserAdmin = user?.roles.includes('admin') ? true : false;
    const navigate = useNavigate();

    const { speak } = useSpeechSynthesis();

    const translate = useSelector(state => state.lang.translate);
    const selectedVoice = useSelector(state => state.speechSynthesis.selectedVoice);
    const translateTextLang = (textLang) => {
        return translate ? textLang.en : textLang.vi;
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
        <HelmetProvider>
            <div className='page-client'>
                <Helmet>
                    <title>{translateTextLang(document.title)} - Lesson Detail</title>
                    <meta name="description" content={translateTextLang(document.title)} />
                </Helmet>
                <div className='lesson-container'>
                    <section>
                        <div className='flex justify-content-center py-4'>
                            {isUserAdmin && <Button onClick={() => navigate(`../admin/lessons/${document.id}`)}>Edit</Button>}
                            <div className='mx-2'>
                                <SwitchLang />
                            </div>
                        </div>
                        <Image src={document.thumbnailUrl} alt="Image" ></Image>
                    </section>
                    <hgroup>
                        <h1>{translateTextLang(document.title)}</h1>
                    </hgroup>
                    <section className='lesson'>
                        <TabView>
                            <TabPanel header={translate ? 'Lecture' : 'Lý thuyết'} leftIcon="pi pi-book mr-2">
                                <article className='lecture'>
                                    <section>
                                        <hgroup className='section-header'>
                                            
                                            {translate ? <h2>Introduce</h2> : <h2>Giới thiệu</h2>}
                                        </hgroup>
                                        
                                        <ul>
                                            {document.introduce.map((intro, index) => (
                                                <DoubleLangText key={index} textLang={intro} speakText={handleSpeakText}>
                                                    {({ text, onClick }) => <li className='introduce' onClick={onClick}>{text}</li>}
                                                </DoubleLangText>
                                            ))}
                                        </ul>
                                    </section>
                                    <section>
                                        <hgroup className='section-header'>
                                            
                                            {translate ? <h2>Structure</h2> : <h2>Cấu trúc</h2>}
                                        </hgroup>
                                        
                                        {document.structures && document.structures.map((structure, index) => (
                                            <div key={index} className=' structure' >
                                                <DoubleLangText textLang={structure.title} speakText={handleSpeakText}>
                                                    {({ text, onClick }) => <h3 className='lesson-text title mt-0' onClick={onClick}>{text}</h3>}
                                                </DoubleLangText>
                                                <div className='structure-content'>
                                                    <DoubleLangText textLang={structure.description} speakText={handleSpeakText}>
                                                        {({ text, onClick }) => <p className='lesson-text title mt-0' onClick={onClick}>{text}</p>}
                                                    </DoubleLangText>
                                                    <ul>
                                                        {structure.examples.map((example, idx) =>
                                                            <DoubleLangText key={idx} textLang={example} speakText={handleSpeakText} isExample={true}>
                                                                {({ text, onClick }) => <li onClick={onClick}>{text}</li>}
                                                            </DoubleLangText>)}
                                                    </ul>
                                                </div>
                                                

                                            </div>
                                        ))}
                                    </section>
                                    {document.usages && <section>
                                        <hgroup className='section-header'>
                                            
                                            {translate ? <h2>Usages</h2> : <h2>Sử dụng</h2>}
                                        </hgroup>
                                        
                                        {document.usages.map((usage, index) => (
                                            <div key={index}>
                                                <DoubleLangText textLang={usage.usage} speakText={handleSpeakText}>
                                                    {({ text, onClick }) => <h3 className='lesson-text title' onClick={onClick}>{text}</h3>}
                                                </DoubleLangText>
                                                <DoubleLangText textLang={usage.explain} speakText={handleSpeakText}>
                                                    {({ text, onClick }) => <p className='lesson-text my-0' onClick={onClick}> {text}</p>}
                                                </DoubleLangText>
                                                <ul>
                                                    {usage.examples.map((example, idx) =>
                                                        <DoubleLangText key={idx} textLang={example} speakText={handleSpeakText} isExample={true}>
                                                            {({ text, onClick }) => <li onClick={onClick}>{text}</li>}
                                                        </DoubleLangText>)}
                                                </ul>
                                            </div>
                                        ))}
                                    </section>}
                                    {(document.commonMistakes) && <section>
                                        <hgroup className='section-header'>
                                            
                                            {translate ? <h2>Common mistakes</h2> : <h2>Lỗi thường gặp</h2>}
                                        </hgroup>
                                        
                                        {document.commonMistakes.map((mistake, index) => (
                                            <div key={index} className='lesson-mistake'>
                                                <DoubleLangText textLang={mistake.title} speakText={handleSpeakText}>
                                                    {({ text, onClick }) => <h3 className='lesson-text' onClick={onClick}>{text}</h3>}
                                                </DoubleLangText>
                                                <ul>
                                                    {mistake.examples.map((example, idx) =>
                                                        <DoubleLangText key={idx} textLang={example} speakText={handleSpeakText} isExample={true}>
                                                            {({ text, onClick }) => <li className={idx === 0 ? 'correct' : 'incorrect'} onClick={onClick}>{text}</li>}
                                                        </DoubleLangText>)}
                                                </ul>
                                            </div>
                                        ))}
                                    </section>}
                                    {(document.signsToRecognize) && <section>
                                        <hgroup className='section-header'>
                                            
                                            {translate ? <h2>Signs to recognize</h2> : <h2>Dấu hiệu</h2>}
                                        </hgroup>
                                        
                                        {document.signsToRecognize.map((sign, index) => (
                                            <div key={index} className='lesson-sign'>
                                                <DoubleLangText textLang={sign.title} speakText={handleSpeakText}>
                                                    {({ text, onClick }) => <h3 className='lesson-text' onClick={onClick}>{text}</h3>}
                                                </DoubleLangText>
                                                {sign.signs.map((sign, idx) =>
                                                    <Chip key={idx} label={sign} className='m-1 sign'></Chip>)}
                                                <ul>
                                                    {sign.examples.map((example, idx) =>
                                                        <DoubleLangText key={idx} textLang={example} speakText={handleSpeakText} isExample={true}>
                                                            {({ text, onClick }) => <li onClick={onClick}>{text}</li>}
                                                        </DoubleLangText>)}
                                                </ul>
                                            </div>
                                        ))}
                                    </section>}
                                    {(document.keyPoints) && <section>
                                        <hgroup className='section-header'>
                                            
                                            {translate ? <h2>Key points</h2> : <h2>Ghi nhớ</h2>}
                                        </hgroup>
                                        
                                        <ul style={{listStyle: 'decimal'}}>
                                            {document.keyPoints.map((keyPoint, index) => (
                                                <DoubleLangText key={index} textLang={keyPoint} speakText={handleSpeakText}>
                                                    {({ text, onClick }) => <li className='key-point' onClick={onClick}>{text}</li>}
                                                </DoubleLangText>
                                            ))}
                                        </ul>
                                    </section>}
                                    {<section>
                                        {/* <hgroup className='section-header'>
                                            
                                            {translate ? <h2>Simple Past vs Present Perfect</h2> : <h2>Quá khứ đơn vs Hiện tại hoàn thành</h2>}
                                        </hgroup> */}

                                        {/* <h3 className='my-4' style={{fontWeight: '700'}}>Definition and focus</h3>
                                        <div className='distinguish' >
                                            <span style={{background: '#bae1ff'}}>The Simple Past</span>
                                            <p className='lesson-text' style={{ textAlign: 'justify' }} >
                                            Describes actions that happened and were completed at a specific time in the past.</p>
                                                <ul>
                                                    <li>I visited Paris last year.</li>
                                                    <li>She finished her homework an hour ago.</li>
                                                    <li>They moved to a new house in 2015.</li>
                                                </ul>
                                        </div>
                                        
                                        <div className=' distinguish' >
                                            <span style={{background: '#ffe5ec'}}>The Present Perfect</span>
                                            <p className='lesson-text' style={{ textAlign: 'justify' }} >
                                            Describes actions that occurred at an unspecified time before now and have relevance to the present.</p>
                                                <ul>
                                                    <li>I have visited Paris.</li>
                                                    <li>She has finished her homework.</li>
                                                    <li>They have moved to a new house.</li>
                                                </ul>
                                        </div> */}

                                        {/* {document.distinguishes.distinguishes.map((aspect, index) => (
                                            <div key={index} className=''>
                                                <DoubleLangText textLang={aspect.title} speakText={handleSpeakText}>
                                                    {({ text, onClick }) => <h3 className='my-4' style={{ fontWeight: '700' }} onClick={onClick}>{text}</h3>}
                                                </DoubleLangText>

                                                {document.distinguishes.entities.map((entity, idxEntity) => (
                                                    <div key={idxEntity} className=' distinguish'>
                                                        <span style={idxEntity === 1 ? { background: '#ffe5ec' } : { background: '#bae1ff' }}>{entity}</span>
                                                        <DoubleLangText textLang={aspect.expressions[idxEntity]} speakText={handleSpeakText}>
                                                            {({ text, onClick }) => <p className='lesson-text' onClick={onClick}>{text}</p>}
                                                        </DoubleLangText>

                                                        <ul>
                                                            {aspect.examples.map((example, idxExample) => {
                                                                if (idxEntity === idxExample) {
                                                                    return <DoubleLangText key={idxExample} textLang={example} speakText={handleSpeakText} isExample={true}>
                                                                        {({ text, onClick }) => <li onClick={onClick}>{text}</li>}
                                                                    </DoubleLangText>
                                                                }
                                                                    
                                                                return <></>
                                                            }
                                                            )}

                                                        </ul>
                                                    </div>
                                                ))}


                                            </div>
                                        ))} */}

                                        
                                    </section>}
                                </article>
                            </TabPanel>
                            <TabPanel header='Video' leftIcon="pi pi-youtube mr-2">
                                <article>
                                    <section className='mt-6 video-container'>
                                        <iframe src="https://www.youtube.com/embed/THxvJeRp_eo?si=8fowuCRJ3u247R8v" title="YouTube video player"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
                                        </iframe>
                                    </section>
                                </article>
                            </TabPanel>
                            <TabPanel header={translate ? 'Exercise' : 'Bài tập'} leftIcon="pi pi-pencil mr-2">
                                <article>
                                    <Accordion multiple activeIndex={[0]}>
                                        {(document.exercises.fillInTheGaps && document.exercises.fillInTheGaps.length) &&
                                            <AccordionTab header='Fill in the blank'>
                                                <section>
                                                    {document.exercises.fillInTheGaps.map((item, idx) =>
                                                        <div key={idx}>
                                                            <FillInTheBlankExercise sentence={item.content} correctAnswer={item.answer} sequenceNumber={idx + 1}></FillInTheBlankExercise>
                                                        </div>
                                                    )}
                                                </section>
                                            </AccordionTab>}
                                        {(document.exercises.rearrangeSentences && document.exercises.rearrangeSentences.length) &&
                                            <AccordionTab header='Rearrange the sentence'>
                                                <section>
                                                    {document.exercises.rearrangeSentences.map((item, idx) =>
                                                        <div key={idx}>
                                                            <CompleteSentenceExercise sentence={item.content} correctAnswer={item.answer} sequenceNumber={idx + 1}></CompleteSentenceExercise>
                                                        </div>
                                                    )}
                                                </section>
                                            </AccordionTab>}
                                        {(document.exercises.rewriteSentences && document.exercises.rewriteSentences.length) &&
                                            <AccordionTab header='Rewrite the sentence'>
                                                <section>
                                                    {document.exercises.rewriteSentences.map((item, idx) =>
                                                        <div key={idx}>
                                                            <CompleteSentenceExercise sentence={item.content} correctAnswer={item.answer} sequenceNumber={idx + 1}></CompleteSentenceExercise>
                                                        </div>
                                                    )}
                                                </section>
                                            </AccordionTab>}

                                    </Accordion>
                                </article>

                            </TabPanel>
                        </TabView>
                    </section>
                    <aside>
                        <div className='related-lessons'>

                        </div>
                    </aside>
                </div>
            </div>
        </HelmetProvider>
    )
}

