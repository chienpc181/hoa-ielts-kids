import '../admin.css';
import React, { useState, useEffect } from "react";
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { useFirestore } from '../../../hooks/useFirestore';
import useFirebaseStorage from '../../../hooks/useFirebaseStorage';
import FileUploadImage from '../../../components/admin/FileUploadImage';
import DoubleLangInputText from '../../../components/admin/DoubleLangInputText';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';

export default function CreateStoryStandard() {
    const { addDocument } = useFirestore('HikStories');
    const { uploadFile, fileUrl } = useFirebaseStorage();

    const [images, setImages] = useState([]);
    const [formError, setFormError] = useState('');

    const [textEn, setTextEn] = useState('');
    const [textVi, setTextvi] = useState('');
    const [paragraphEns, setParagraphEns] = useState([]);
    const [paragraphVis, setParagraphVis] = useState([]);
    const [resetKey, setResetKey] = useState(Date.now());

    const initStory = {
        title: {
            en: '',
            vi: ''
        },
        author: '',
        ages: '3+',
        genre: 'ForeignFairyTales',
        thumbnailUrl: '',
        paragraphs: []
    }

    const [story, setStory] = useState(initStory);

    useEffect(() => {
        combineLang();
    }, [textEn, textVi])

    const combineLang = () => {
        if (paragraphEns.length && paragraphEns.length === paragraphVis.length) {
            const paras = [];
            for (let i = 0; i < paragraphEns.length; i++) {
                paras.push({
                    en: paragraphEns[i],
                    vi: paragraphVis[i]
                })
            }
            setStory(prev => ({
                ...prev,
                paragraphs: paras
            }))
            
        }
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

        if (story.paragraphs.some(paragraph => paragraph.en.trim() === '' || paragraph.vi.trim() === '')) {
            canSubmit = false;
            setFormError('All paragraphs are required in both languages');
            return;
        }

        if (canSubmit) {

            console.log(story);
                setImages([]);
                setStory(initStory);
                setTextEn('');
                setTextvi('');
                setResetKey(Date.now()); // Update key to force remount

            // const response = await addDocument(story);

            // if (response.success) {
            //     setFormError('');
            //     // setParagraphs([]);
                
            //     setStory(initStory);
            //     setImages([]);
            //     setResetKey(Date.now()); // Update key to force remount
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
    }

    const handleChangeVi = (e) => {
        const text = e.target.value;
        setTextvi(text);
        const paras = text.split('\n').filter(para => para.trim() !== '');
        setParagraphVis(paras);
    }

    const handleOnSelectFiles = async (files) => {
        setImages(files);
    }

    const handleTitleChange = (textLang) => {
        setStory(prev => ({
            ...prev,
            title: textLang
        }))
    }

    const handleAgesChange = (e) => {
        setStory(prev => ({
            ...prev,
            ages: e.value
        }))
    }

    const handleGenreChange = (e) => {
        setStory(prev => ({
            ...prev,
            genre: e.value
        }))
    }

    const handleAuthorChange = (e) => {
        setStory(prev => ({
            ...prev,
            author: e.target.value
        }))
    }

    const agesOptions = [
        {name: '3+', code: '3+'},
        {name: '4+', code: '4+'},
        {name: '5+', code: '5+'},
        {name: '6+', code: '6+'},
        {name: '7+', code: '7+'},
    ]

    const genreOptions = [
        {name: 'Vietnamese fairy tales', code: 'VietnameseFairyTales'},
        {name: 'Foreign fairy tales', code: 'ForeignFairyTales'}
    ]

    return (
        <div className='page-admin'>
            <Splitter className='card' style={{ minHeight: '800px' }}>
                <SplitterPanel className="block p-3" size={75} minSize={10}>
                    <form onSubmit={handleSubmit} key={resetKey}>
                        <h1>Create story</h1>
                        <div className="form-field">
                            <FileUploadImage handleOnSelectFiles={handleOnSelectFiles} />
                        </div>

                        <div className="form-field" style={{ display: 'block' }}>
                            <label >Title</label>
                            <DoubleLangInputText textLang={story.title} handleTextChange={handleTitleChange} />
                        </div>
                        <div className="form-field justify-content-between">
                            <div className="form-field" style={{ display: 'block' }}>
                                <label style={{ display: 'block' }}>Author</label>
                                <InputText value={story.author} className='mt-2' style={{ minWidth: '300px' }} onChange={handleAuthorChange}></InputText>
                            </div>
                            <div className="form-field" style={{ display: 'block' }}>
                                <label style={{ display: 'block' }}>Ages</label>
                                <Dropdown value={story.ages} optionValue='code' placeholder='Select ages' options={agesOptions} optionLabel='name'
                                    onChange={handleAgesChange} className='mt-2' style={{ minWidth: '300px' }}></Dropdown>
                            </div>
                            <div className="form-field" style={{ display: 'block' }}>
                                <label style={{ display: 'block' }}>Genre</label>
                                <Dropdown value={story.genre} optionValue='code' placeholder='Select genre' options={genreOptions} optionLabel='name'
                                    onChange={handleGenreChange} className='mt-2' style={{ minWidth: '300px' }}></Dropdown>
                            </div>
                        </div>
                        
                        <div className='flex w-full'>
                            <div className='w-full mr-2'>
                                <span className='flex' style={{ alignItems: 'flex-start', fontSize: '14px', fontWeight: '700' }}>ENG</span>
                                <InputTextarea
                                    className='double-textarea'
                                    autoResize
                                    rows={35}
                                    value={textEn}
                                    onChange={handleChangeEn}
                                />
                            </div>
                            <div className='w-full ml-2'>
                                <span className='flex' style={{ alignItems: 'flex-start', fontSize: '14px', fontWeight: '700' }}>VIE</span>
                                <InputTextarea
                                    autoResize
                                    rows={35}
                                    value={textVi}
                                    onChange={handleChangeVi}
                                    className='double-textarea'
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
                    {images.map((file, idx) => (
                        <div className='form-field' key={idx}>
                            <img role="presentation" className="w-full" src={file.objectURL} alt={file.name} />
                        </div>
                    ))}
                    {story.paragraphs.map((para, index) => (
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
