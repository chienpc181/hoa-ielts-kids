import '../admin.css';
import React, { useState, useEffect } from "react";
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { useFirestore } from '../../../hooks/useFirestore';
import useFirebaseStorage from '../../../hooks/useFirebaseStorage';
import FileUploadImage from '../../../components/admin/FileUploadImage';
import DoubleLangTexts from '../../../components/admin/DoubleLangTexts';

export default function StoryStandard() {
    // const [numberOfParagraphs, setNumberOfParagraphs] = useState(1);
    const { addDocument } = useFirestore('HikStories');
    const { uploadFile } = useFirebaseStorage();

    const [files, setFiles] = useState([]);
    const [formError, setFormError] = useState('');
    // const [paragraphs, setParagraphs] = useState(Array.from({ length: numberOfParagraphs }, (_, index) => ({ position: index + 1, en: '', vi: '' })));

    // useEffect(() => {
    //     if (paragraphs.length < numberOfParagraphs) {
    //         setParagraphs([...paragraphs, { position: numberOfParagraphs, en: '', vi: '' }]);
    //     }
    // }, [numberOfParagraphs, paragraphs]);

    // const handleOnSelectFiles = (files) => {
    //     setFiles(files);
    // };

    // const onAddMoreParagraphClick = () => {
    //     setNumberOfParagraphs(numberOfParagraphs + 1);
    // };

    // const onRemoveParagraphClick = () => {
    //     if (numberOfParagraphs > 1) {
    //         setNumberOfParagraphs(numberOfParagraphs - 1);
    //         setParagraphs(paragraphs.slice(0, -1));
    //     }
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     let canSubmit = true;

    //     if (paragraphs.some(paragraph => paragraph.en.trim() === '' || paragraph.vi.trim() === '')) {
    //         canSubmit = false;
    //         setFormError('All paragraphs are required in both languages');
    //         return;
    //     }

    //     if (canSubmit) {
    //         const story = {
    //             paragraphs,
    //             // images: files.map(file => file.objectURL)
    //         };

    //         console.log(story);

    //         const response = await addDocument(story);

    //         if (response.success) {
    //             setFormError('');
    //             setParagraphs(Array.from({ length: numberOfParagraphs }, (_, index) => ({ position: index + 1, en: '', vi: '' })));
    //             setFiles([]);
    //         } else {
    //             setFormError('Error submitting story');
    //         }
    //     }
    // };

    // const handleDoubleLangChange = (textLang, index) => {
        
    //     const newParagraphs = [...paragraphs];
    //     newParagraphs[index]= {
    //         en: textLang.textEn,
    //         vi: textLang.textVi
    //     };
    //     setParagraphs(newParagraphs);
    //     setFormError('');
    //     console.log(newParagraphs)
    // }

    // return (
    //     <div className='page-admin'>
    //         <Splitter className='card' style={{ minHeight: '800px' }}>
    //             <SplitterPanel className="block p-3" size={75} minSize={10}>
    //                 <form onSubmit={handleSubmit}>
    //                     <h3 className="text-center">Create story</h3>
    //                     <div className='form-error'>
    //                         {formError && <p>Invalid: {formError}</p>}
    //                     </div>

    //                     <div className="form-field">
    //                         <FileUploadImage handleOnSelectFiles={handleOnSelectFiles} />
    //                     </div>

    //                     {paragraphs.map((para, index) => (
    //                         <div className='form-field' key={index}>
    //                             <DoubleLangTexts  textLang={para} handleTextChange={handleDoubleLangChange} index={index}></DoubleLangTexts>
    //                         </div>
    //                     ))}

    //                     <div className='flex justify-content-between'>
    //                         <Button label='Remove' outlined severity='danger' onClick={onRemoveParagraphClick} type='button' />
    //                         <Button label='Add more...' outlined onClick={onAddMoreParagraphClick} type='button' />
    //                     </div>
    //                     <div className='form-actions'>
    //                         <Button label="Add" type='submit' className='mx-2' icon="pi pi-save" />
    //                     </div>
    //                 </form>
    //             </SplitterPanel>
    //             <SplitterPanel className="block p-3" size={25}>
    //                 <h3 className="text-center">Preview</h3>
    //                 {files.map((file, idx) => (
    //                     <div className='form-field' key={idx}>
    //                         <img role="presentation" className="w-full" src={file.objectURL} alt={file.name} />
    //                     </div>
    //                 ))}
    //                 {paragraphs.map((para, index) => (
    //                     <div className='story-para' key={index}>
    //                         <p><strong>EN:</strong> {para.en}</p>
    //                         <p><strong>VI:</strong> {para.vi}</p>
    //                     </div>
    //                 ))}
    //             </SplitterPanel>
    //         </Splitter>
    //     </div>
    // );



    const [paragraphs, setParagraphs] = useState([])
    const [textEn, setTextEn] = useState('');
    const [textVi, setTextvi] = useState('');
    const [paragraphEns, setParagraphEns] = useState([]);
    const [paragraphVis, setParagraphVis] = useState([]);


    const textAreaStyle = {
        border: '1px solid #d1d5db',
        boxShadow: 'none',
        // borderRight: '1px solid #d1d5db',
        // borderLeft: '1px solid #d1d5db',
        borderRadius: 0,
        background: '#f9fafb',
        width: '100%'
    }

    const combineLang = () => {
        const paras = [];
        for (let i = 0; i < paragraphEns.length; i++) {
            paras.push({
                en: paragraphEns[i],
                vi: paragraphVis[i]
            })
        }

        setParagraphs(paras)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let canSubmit = true;
        if (paragraphEns.some(paragraph => paragraph.trim() === '')) {
            canSubmit = false;
            setFormError('ENG paragraphs are missing');
            return;
        }
        if (paragraphVis.some(paragraph => paragraph.trim() === '')) {
            canSubmit = false;
            setFormError('VIE paragraphs are missing');
            return;
        }
        if (paragraphEns.length !== paragraphVis.length) {
            canSubmit = false;
            setFormError('ENG is not equal VIE');
            return;
        }

        
        // combineLang();
        

        if (paragraphs.some(paragraph => paragraph.en.trim() === '' || paragraph.vi.trim() === '')) {
            canSubmit = false;
            setFormError('All paragraphs are required in both languages');
            return;
        }

        if (canSubmit) {
            const story = {
                paragraphs,
                // images: files.map(file => file.objectURL)
            };

            console.log(story);

            // const response = await addDocument(story);

            // if (response.success) {
            //     setFormError('');
            //     // setParagraphs(Array.from({ length: numberOfParagraphs }, (_, index) => ({ position: index + 1, en: '', vi: '' })));
            //     setParagraphs([]);
            //     setFiles([]);
            // } else {
            //     setFormError('Error submitting story');
            // }
        }
    };

    const handleChangeEn = (e) => {
        const text = e.target.value;
        setTextEn(text);
        const paras = text.split('\n').filter(para => para.trim() !== '');
        setParagraphEns(paras);
        combineLang();
    }

    const handleChangeVi = (e) => {
        const text = e.target.value;
        setTextvi(text);
        const paras = text.split('\n').filter(para => para.trim() !== '');
        setParagraphVis(paras);
        combineLang();
    }


    return (
        <div className='page-admin'>
            <Splitter className='card' style={{ minHeight: '800px' }}>
                <SplitterPanel className="block p-3" size={75} minSize={10}>
                    <form onSubmit={handleSubmit}>
                        <div className='flex w-full'>
                            <div className='w-full ml-2'>
                                <span className='flex' style={{ alignItems: 'flex-start', fontSize: '14px', fontWeight: '500' }}>ENG</span>
                                <InputTextarea
                                    className='w-full mr-2'
                                    autoResize
                                    rows={35}
                                    value={textEn}
                                    onChange={handleChangeEn}
                                    style={textAreaStyle}
                                />
                            </div>
                            <div className='w-full ml-2'>
                                <span className='flex' style={{ alignItems: 'flex-start', fontSize: '14px', fontWeight: '500' }}>VIE</span>
                                <InputTextarea
                                    autoResize
                                    rows={35}
                                    value={textVi}
                                    onChange={handleChangeVi}
                                    style={textAreaStyle}
                                />
                            </div>
                        </div>
                        <div className='form-actions'>
                            <Button label="Add" type='submit' className='mx-2' icon="pi pi-save" />
                        </div>
                    </form>
                </SplitterPanel>
                <SplitterPanel className="block p-3" size={25}>
                    <h3 className="text-center">Preview</h3>
                    {files.map((file, idx) => (
                        <div className='form-field' key={idx}>
                            <img role="presentation" className="w-full" src={file.objectURL} alt={file.name} />
                        </div>
                    ))}
                    {paragraphs.map((para, index) => (
                        <div className='story-para' key={index}>
                            <p><strong>EN:</strong> {para.en}</p>
                            <p><strong>VI:</strong> {para.vi}</p>
                        </div>
                    ))}
                </SplitterPanel>
            </Splitter>
        </div>
    )
}
