import '../client.css';
import useDocument from '../../../hooks/useDocument';
import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Image } from 'primereact/image';
import { TabView, TabPanel } from 'primereact/tabview';
import { useCollection } from '../../../hooks/useCollection';
import QuestionStandard from '../../../components/clients/QuestionStandard';

export default function LessonDetail() {
    const { id } = useParams();
    const { document, error } = useDocument('HikLessons', id);
    const { documents: practices } = useCollection(
        "HikQuestions",
        // ["IsActive", "==", true], 
        // ["CreatedAt", "desc"] 
    );

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!document) {
        return <div>Loading...</div>;
    }
    return (
        <div className='page-client'>

            <div className='page-content' style={{ maxWidth: '600px', minHeight: '1000px', textAlign: 'left' }}>

                <h2>{document.title}</h2>
                <Image src={document.thumbnailUrl} alt="Image" ></Image>
                <TabView>
                    <TabPanel header='Lesson' leftIcon="pi pi-book mr-2">
                        <div className='lesson'>
                            <h4>I. Definition</h4>
                            <p>{document.introduce}</p>
                            <h4>II. Struture</h4>
                            {document.structures.map((str, index) => (
                                <div key={index} className='border-1 border-400 pl-3 mb-2'>
                                    <p>{str}</p>
                                </div>
                            ))}
                            <h4>III. Usages</h4>
                            {document.usages.map((usage, index) => (
                                <div >
                                    <p style={{ fontWeight: '600' }}>{index + 1}. {usage.title}</p>
                                    <span style={{ fontStyle: 'italic' }}>Example:</span>
                                    {usage.examples.map(example => (
                                        <li className='pl-3'>{example}</li>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </TabPanel>
                    <TabPanel header='Practices' leftIcon="pi pi-pencil mr-2">
                        {practices.map((question, index) => <QuestionStandard question={question} key={index} />)}
                    </TabPanel>
                </TabView>


            </div>
        </div>
    )
}