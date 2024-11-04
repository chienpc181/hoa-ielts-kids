import '../client.css';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import SwitchLang from '../../../components/clients/SwitchLang';
import { Image } from 'primereact/image';
import { useSelector } from 'react-redux';
import DoubleLangText from '../../../components/clients/DoubleLangText';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import './Story.css';
import { useFetchingData } from '../../../hooks/useData';
import { StorySpeaker } from '../../../components/clients/WindowsSpeaker';
import { ReaderBar } from '../../../components/clients/ReaderBar';
import RelatedStories from '../../../components/clients/story/RelatedStories';

export default function FairyStory() {
    const { id } = useParams();
    const translate = useSelector(state => state.lang.translate);

    const [fontSize, setFontSize] = useState(1);
    const [darkMode, setDarkMode] = useState(false);

    const baseUrl = 'https://truyen-cua-ba.vercel.app';
    const fetchingDataUrl = `${baseUrl}/api/fairyStories/${id}`;
    const {data: storyData, loadDataError, loadingData} = useFetchingData(fetchingDataUrl, {}, [id]);
    
    if (loadDataError) {
        return <div>Error: {loadDataError}</div>;
    }

    if (loadingData) {
        return <div>Loading...</div>;
    }

    const translateTextLang = (text) => {
        return translate ? text.en : text.vi;
    };

    const fontStyle = () => {
        return {
            fontSize: fontSize.toString() + 'rem',
            lineHeight: (fontSize+0.6).toString() + 'rem'
        }
    }

    const themeStyle = () => {
        if (darkMode) {
            return {
                backgroundColor: '#3c3c3c',
                color: 'white'
            }
        } else {
            return {
                backgroundColor: 'unset',
                color: 'unset'
            }
        }
    }

    const handleChangeFontSize = (newSize) => {
        setFontSize(newSize);
    }

    return (
        <>
            {storyData && <HelmetProvider>
                <div className='page-client'>
                    <Helmet>
                        <title>{translateTextLang(storyData.title)} - Story</title>
                        <meta name="description" content={translateTextLang(storyData.title)} />
                    </Helmet>
                    <div className='story-container'>
                        <div className="story-detail" style={themeStyle()}>
                            <section>
                                <div className='pt-3'>
                                    <SwitchLang />
                                </div>
                                <StorySpeaker storyData={storyData} />
                                <div className='m-3'>
                                    <ReaderBar fontSize={fontSize} onChangeFontSize={handleChangeFontSize} 
                                    darkMode={darkMode} setDarkMode={(darkMode) => setDarkMode(darkMode)}/>
                                </div>
                               
                            </section>
                            <section>
                                <Image src={storyData.illustrationUrl} alt="Story-illlustration"></Image>
                            </section>
                            <article className='story'>
                                <hgroup>
                                    <h1>{translateTextLang(storyData.title)}</h1>
                                    <div className='author'>
                                        <address>{storyData.author}</address>
                                    </div>
                                </hgroup>
                                <section className='main-content'>
                                    {storyData.mainStory.map((para, index) => (
                                        <DoubleLangText key={index} textLang={para} >
                                            {({ text, onClick }) => <p className='story-para' onClick={onClick} style={fontStyle()}>{text}</p>}
                                        </DoubleLangText>
                                    ))}
                                </section>
                                <section className='introduction'>
                                    {storyData.introduction.map((para, index) => (
                                        <DoubleLangText key={index} textLang={para} >
                                            {({ text, onClick }) => <p className='story-para' onClick={onClick}>{text}</p>}
                                        </DoubleLangText>
                                    ))}
                                </section>
                            </article>
                        </div>


                        <aside>
                            <div className='related-stories'>
                                <h2>Related Stories</h2>
                                <RelatedStories story={storyData}/>
                            </div>
                        </aside>
                    </div>
                </div>
            </HelmetProvider>}
        </>

    );
}
