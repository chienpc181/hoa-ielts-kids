import '../admin.css';
import React, { useState, useEffect } from "react";
import { Button } from 'primereact/button';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import useFirebaseStorage from '../../../hooks/useFirebaseStorage';
import FileUploadImage from '../../../components/admin/FileUploadImage';
import DoubleLangInputText from '../../../components/admin/DoubleLangInputText';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { useParams, useNavigate } from 'react-router-dom';
import DoubleLangInputTextAreas from '../../../components/admin/DoubleLangInputTextAreas';
import axios from 'axios';
import { getIdToken } from 'firebase/auth';
import { projectAuth } from '../../../firebase/config';

export default function EditStoryStandard() {
    const { uploadFile, fileUrl } = useFirebaseStorage();
    const navigate = useNavigate();
    
    const { id } = useParams();
    const [story, setStory] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState('');
    

    const [image, setImage] = useState();
    const [formError, setFormError] = useState('');

    // const baseUrl = 'http://localhost:5000';
    // const baseUrl = 'https://truyen-cua-ba.onrender.com';
    const baseUrl = 'https://truyen-cua-ba.vercel.app';


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${baseUrl}/api/stories/${id}`);
                const storyData = response.data;
                if (!storyData.description) {
                    storyData.description = [{en: '', vi: ''}];
                }
                console.log(storyData)
                setStory(storyData);

            } catch (err) {
                if (axios.isCancel(err)) {
                    console.log('Request canceled', err.message);
                } else {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);


    useEffect(() => {
        if (fileUrl) {
            setStory(prev => ({
                ...prev,
                thumbnailUrl: fileUrl
            }))
        }
        
    }, [fileUrl])

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
            
            const token = await getIdToken(projectAuth.currentUser);
            const response = await axios.post(`${baseUrl}/api/stories/${id}`, story, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                console.log("Update story successfully");
                navigate(`../stories/${story._id}`);
            }
        }
    };

    const handleOnSelectFiles = async (files) => {
        if (files && files.length && files[0]) {
            setImage(files[0]);
            await uploadFile(files[0], 'Stories');
        }
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

    const handleParagraphsChange = (paras) => {
        setStory(prev => ({
            ...prev,
            paragraphs: paras
        }));
    };

    const handleDescriptionChange = (textLang) => {
        setStory(prev => ({
            ...prev,
            description: textLang
        }));
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
        {story && <div className='page-admin'>
            <Splitter className='card' style={{ minHeight: '800px' }}>
                <SplitterPanel className="block p-3" size={75} minSize={10}>
                    <form onSubmit={handleSubmit} >
                        <h1>Edit story</h1>
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
                        <div className="form-field block">
                            <label >Short description</label>
                            <DoubleLangInputTextAreas paraLang={story.description} handleChange={handleDescriptionChange} numberOfRow={8}></DoubleLangInputTextAreas>
                        </div>
                        <div className="form-field block">
                            <label >Story</label>
                            <DoubleLangInputTextAreas paraLang={story.paragraphs} handleChange={handleParagraphsChange} numberOfRow={35}></DoubleLangInputTextAreas>
                        </div>
                        <div className='form-actions'>
                            <Button label="Save" type='submit' className='mx-2' icon="pi pi-save" />
                        </div>
                    </form>
                </SplitterPanel>
                <SplitterPanel className="block p-3" size={25}>
                    <h3 className="text-center">Preview</h3>
                    {image && <div className='form-field'>
                        <img role="presentation" className="w-full" src={image.objectURL} alt={image.name} />
                    </div>}
                    {story.thumbnailUrl && <div className='form-field'>
                        <img role="presentation" className="w-full" src={story.thumbnailUrl} alt={story.title} />
                    </div>}
                    {story.paragraphs.map((para, index) => (
                        <div className='story-para' key={index}>
                            <p><strong>EN:</strong> {para.en}</p>
                            <p><strong>VI:</strong> {para.vi}</p>
                        </div>
                    ))}
                </SplitterPanel>
            </Splitter>
        </div>}
        </>
        
    )
}
