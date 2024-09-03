import '../admin.css';
import React, { useState, useEffect } from "react";
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import useFirebaseStorage from '../../../hooks/useFirebaseStorage';
import FileUploadImage from '../../../components/admin/FileUploadImage';
import DoubleLangInputText from '../../../components/admin/DoubleLangInputText';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import DoubleLangInputTextAreas from '../../../components/admin/DoubleLangInputTextAreas';
import axios from 'axios';
import { getIdToken } from 'firebase/auth';
import { projectAuth } from '../../../firebase/config';

export default function CreateStoryStandard() {
    const { uploadFile, fileUrl } = useFirebaseStorage();

    const [images, setImages] = useState([]);
    const [formError, setFormError] = useState('');
    const [resetKey, setResetKey] = useState(Date.now());

    const genreOptions = [
        {name: 'Foreign fairy tales', code: 'ForeignFairyTales'},
        {name: 'Folk tales', code: 'FolkTales'},
        {name: 'Legend tales', code: 'LegendTales'},
        {name: 'Fable tales', code: 'FableTales'},
    ]

    const authors = [
        {name: 'Hans Christian Andersen', code: 'Hans Christian Andersen'},
        {name: 'Brothers Grimm', code: 'Brothers Grimm'},
        {name: 'Folk tales', code: 'FolkTales'},
        {name: 'Legend tales', code: 'LegendTales'},
        {name: 'Fables by Aesop', code: 'Aesop'},
        {name: 'Other', code: 'Other'}
    ];

    const [author, setAuthor] = useState('');
    const [otherAuthor, setOtherAuthor] = useState('');

    const initStory = {
        title: {
            en: '',
            vi: ''
        },
        author: '',
        genre: 'ForeignFairyTales',
        thumbnailUrl: '',
        introduction: [],
        paragraphs: []
    }

    const [story, setStory] = useState(initStory);

    useEffect(() => {
        if (author === 'Other' && otherAuthor) {
            setStory(prev => ({
                ...prev,
                author: otherAuthor
            }));
        } else {
            setStory(prev => ({
                ...prev,
                author: author
            }));
        }
    }, [author, otherAuthor])

    const handleSubmit = async (e) => {
        e.preventDefault();
        let canSubmit = true;

        if (story.paragraphs.some(paragraph => paragraph.en.trim() === '' || paragraph.vi.trim() === '')) {
            canSubmit = false;
            setFormError('All paragraphs are required in both languages');
            return;
        }

        if (canSubmit) {
            console.log(story);

            // const baseUrl = 'http://localhost:5000';
            // const baseUrl = 'https://truyen-cua-ba.onrender.com';
            const baseUrl = 'https://truyen-cua-ba.vercel.app';
            const token = await getIdToken(projectAuth.currentUser);

            const response = await axios.post(`${baseUrl}/api/stories`, story, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 201) {
                setFormError('');
                setStory(initStory);
                setImages([]);
                setResetKey(Date.now()); // Update key to force remount
            }
        }
    };

    const handleOnSelectFiles = async (files) => {
        setImages(files);
    }

    const handleTitleChange = (textLang) => {
        setStory(prev => ({
            ...prev,
            title: textLang
        }))
    }

    const handleGenreChange = (e) => {
        setStory(prev => ({
            ...prev,
            genre: e.value
        }))
    }

    const handleAuthorChange = (e) => {
        setAuthor(e.target.value)
        // setOtherAuthor(''); // Reset other author input when changing author dropdown
    }

    const handeOtherAuthorChange = (e) => {
        setOtherAuthor(e.target.value);
    }

    const handleParagraphsChange = (paras) => {
        setStory(prev => ({
            ...prev,
            paragraphs: paras
        }));
    };

    const handleIntroductionChange = (textLang) => {
        setStory(prev => ({
            ...prev,
            introduction: textLang
        }));
    };

    return (
        <div className='page-admin'>
            <Splitter className='card' style={{ minHeight: '800px' }}>
                <SplitterPanel className="block p-3" size={75} minSize={10}>
                    {formError && <div>
                        {formError}
                    </div>}
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
                                <Dropdown value={author} placeholder='Select author' options={authors} optionLabel='name' optionValue='code'
                                    onChange={handleAuthorChange} className='mt-2' style={{ minWidth: '300px' }}></Dropdown>
                            </div>
                            {author === 'Other' && <div className="form-field" style={{ display: 'block' }}>
                                <label style={{ display: 'block' }}>Author</label>
                                <InputText className='mt-2' value={otherAuthor} onChange={handeOtherAuthorChange}></InputText>
                            </div>}
                            <div className="form-field" style={{ display: 'block' }}>
                                <label style={{ display: 'block' }}>Genre</label>
                                <Dropdown value={story.genre} optionValue='code' placeholder='Select genre' options={genreOptions} optionLabel='name'
                                    onChange={handleGenreChange} className='mt-2' style={{ minWidth: '300px' }}></Dropdown>
                            </div>
                        </div>
                        <div className="form-field block">
                            <label >Introduction</label>
                            <DoubleLangInputTextAreas paraLang={story.introduction} handleChange={handleIntroductionChange} numberOfRow={8}></DoubleLangInputTextAreas>
                        </div>
                        <div className="form-field block">
                            <label >Story</label>
                            <DoubleLangInputTextAreas paraLang={story.paragraphs} handleChange={handleParagraphsChange} numberOfRow={35}></DoubleLangInputTextAreas>
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
