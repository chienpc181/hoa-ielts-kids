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
import { useParams, useNavigate } from 'react-router-dom';
import useDocument from '../../../hooks/useDocument';
import DoubleLangInputTextAreas from '../../../components/admin/DoubleLangInputTextAreas';

export default function EditStoryStandard() {
    const { updateDocument } = useFirestore('HikStories');
    const { uploadFile, fileUrl } = useFirebaseStorage();
    const navigate = useNavigate();
    
    const { id } = useParams();
    const { document, error } = useDocument('HikStories', id);
    

    const [image, setImage] = useState();
    const [formError, setFormError] = useState('');

    const [story, setStory] = useState();

    useEffect(() => {
        if (document && document.id) {
            setStory(document);
        }
    }, [document]);


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

            const response = await updateDocument(story.id, story);

            if (response.success) {
                console.log("Update story successfully");
                navigate(`../stories/${story.id}`);
            } else {
                setFormError('Error submitting story');
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

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!document) {
        return <div>Loading...</div>;
    }

    return (
        <>
        {story && <div className='page-admin'>
            <Splitter className='card' style={{ minHeight: '800px' }}>
                <SplitterPanel className="block p-3" size={75} minSize={10}>
                    <form onSubmit={handleSubmit} >
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
                        <div className="form-field">
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
