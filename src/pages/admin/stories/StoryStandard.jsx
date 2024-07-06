import '../admin.css';
import React, { useState, useEffect } from "react";
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { useFirestore } from '../../../hooks/useFirestore';
import useFirebaseStorage from '../../../hooks/useFirebaseStorage';
import FileUploadImage from '../../../components/admin/FileUploadImage';

export default function StoryStandard() {
    const [numberOfParagraphs, setNumberOfParagraphs] = useState(2);
    const { addDocument } = useFirestore('HikStories');
    const { uploadFile } = useFirebaseStorage();

    const [files, setFiles] = useState([]);
    const [formError, setFormError] = useState('');
    const [paragraphs, setParagraphs] = useState(Array.from({ length: numberOfParagraphs }, (_, index) => ({ position: index + 1, en: '', vi: '' })));

    useEffect(() => {
        if (paragraphs.length < numberOfParagraphs) {
            setParagraphs([...paragraphs, { position: numberOfParagraphs, en: '', vi: '' }]);
        }
    }, [numberOfParagraphs, paragraphs]);

    const handleParagraphChange = (e, index, lang) => {
        const newParagraphs = [...paragraphs];
        newParagraphs[index][lang] = e.target.value;
        setParagraphs(newParagraphs);
        setFormError('');
    };

    const handleOnSelectFiles = (files) => {
        setFiles(files);
    };

    const onAddMoreParagraphClick = () => {
        setNumberOfParagraphs(numberOfParagraphs + 1);
    };

    const onRemoveParagraphClick = () => {
        if (numberOfParagraphs > 1) {
            setNumberOfParagraphs(numberOfParagraphs - 1);
            setParagraphs(paragraphs.slice(0, -1));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let canSubmit = true;

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

            const response = await addDocument(story);

            if (response.success) {
                setFormError('');
                setParagraphs(Array.from({ length: numberOfParagraphs }, (_, index) => ({ position: index + 1, en: '', vi: '' })));
                setFiles([]);
            } else {
                setFormError('Error submitting story');
            }
        }
    };

    return (
        <div className='page-admin'>
            <Splitter className='card' style={{ minHeight: '800px' }}>
                <SplitterPanel className="block p-3" size={75} minSize={10}>
                    <form onSubmit={handleSubmit}>
                        <h3 className="text-center">Create story</h3>
                        <div className='form-error'>
                            {formError && <p>Invalid: {formError}</p>}
                        </div>

                        <div className="form-field">
                            <FileUploadImage handleOnSelectFiles={handleOnSelectFiles} />
                        </div>

                        {paragraphs.map((para, index) => (
                            <div className='form-field' key={index}>
                                <div className='mt-4 pt-4 pb-2 w-full flex border-primary-200 border-top-2' style={{ borderTopStyle: 'dashed' }}>
                                    <InputTextarea
                                        className='w-full mr-1'
                                        autoResize
                                        rows={4}
                                        value={para.en}
                                        onChange={(e) => handleParagraphChange(e, index, 'en')}
                                    />
                                    <InputTextarea
                                        className='w-full ml-1'
                                        autoResize
                                        rows={4}
                                        value={para.vi}
                                        onChange={(e) => handleParagraphChange(e, index, 'vi')}
                                    />
                                </div>

                            </div>
                        ))}

                        <div className='flex justify-content-between'>
                            <Button label='Remove' outlined severity='danger' onClick={onRemoveParagraphClick} type='button' />
                            <Button label='Add more...' outlined onClick={onAddMoreParagraphClick} type='button' />
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
    );
}
