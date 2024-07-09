import '../client.css';
import useDocument from '../../../hooks/useDocument';
import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Image } from 'primereact/image';
import { TabView, TabPanel } from 'primereact/tabview';
import { useCollection } from '../../../hooks/useCollection';
import QuestionStandard from '../../../components/clients/QuestionStandard';
import { useSelector } from 'react-redux';
import SwitchLang from '../../../components/clients/SwitchLang';

export default function LessonDetail() {
    const { id } = useParams();
    const { document, error } = useDocument('HikLessons', id);
    const { documents: practices } = useCollection(
        "HikQuestions",
        // ["IsActive", "==", true], 
        // ["CreatedAt", "desc"] 
    );

    const translate = useSelector(state => state.lang.translate);
    const getTranslate = (text) => {
        return translate ? text.en : text.vi;
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
                <div className='py-3'>
                    <SwitchLang />
                </div>
                <div className='lesson'>
                    <Image src={document.thumbnailUrl} alt="Image" ></Image>
                    <h1>{document.title}</h1>

                    <TabView>
                        <TabPanel header={translate ? 'Lesson' : 'Lý thuyết'} leftIcon="pi pi-book mr-2">
                            <div >
                                {translate ? <h2>I. Definition</h2> : <h2>I. Định nghĩa</h2>}
                                <p>{document.introduce}</p>
                                {translate ? <h2>II. Structure</h2> : <h2>II. Công thức</h2>}
                                {document.structures.map((str, index) => (
                                    <div key={index} className='border-1 border-400 pl-3 mb-2'>
                                        <p>{str}</p>
                                    </div>
                                ))}
                                {translate ? <h2>III. Usages</h2> : <h2>III. Sử dụng</h2>}
                                {document.usages.map((usage, index) => (
                                    <div >
                                        <h3>{index + 1}. {usage.title}</h3>
                                        {usage.examples.map(example => (
                                            <li className='pl-3'>{example}</li>
                                        ))}
                                    </div>
                                ))}
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