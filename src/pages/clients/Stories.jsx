import './client.css';
import './Stories.css';
import { useCollection } from '../../hooks/useCollection';
import { InputSwitch } from "primereact/inputswitch";
import { OverlayPanel } from 'primereact/overlaypanel';
import { useState, useRef } from 'react';

export default function Stories() {
    const { documents, error } = useCollection(
        "HikStories",
        // ["IsActive", "==", true], 
        // ["CreatedAt", "desc"] 
    );

    const [translate, setTranslate] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);
    const op = useRef([]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!documents) {
        return <div>Loading...</div>;
    }

    const toggleOverlay = (e, index) => {
        setCurrentIndex(index);
        op.current[index].toggle(e);
    };

    return (
        <div className='page-client'>
            <div className='page-content' style={{maxWidth:'600px'}}>
                <div className='align-items-center flex justify-content-center pt-3' >
                    <h4 className='mr-2'>VI</h4>
                    <InputSwitch checked={translate} onChange={(e) => setTranslate(e.value)} />
                    <h4 className='ml-2'>EN</h4>
                </div>
                <div>
                    {translate && <h2>{documents[1].title.en}</h2>}
                    {!translate && <h2>{documents[1].title.vi}</h2>}
                </div>

                <div className='main-content'>
                    <div className='px-2'>
                        {documents[1].paragraphs.map((para, index) => (
                            <div key={index}>
                                {translate ? (
                                    <p className='story-para' onClick={(e) => toggleOverlay(e, index)}>{para.en}</p>
                                ) : (
                                    <p className='story-para' onClick={(e) => toggleOverlay(e, index)}>{para.vi}</p>
                                )}
                                <OverlayPanel ref={el => op.current[index] = el}>
                                    {translate ? (
                                        <p className='story-para'>{para.vi}</p>
                                    ) : (
                                        <p className='story-para'>{para.en}</p>
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
