import './admin.css';
import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { FileUpload } from 'primereact/fileupload';
import { useFirestore } from '../../hooks/useFirestore';
import useFirebaseStorage from '../../hooks/useFirebaseStorage';

export default function AddStudent() {
    const { addDocument } = useFirestore('HikStudents');
    const { progress, fileUrl, error, uploadFile } = useFirebaseStorage();
    const [form, setForm] = useState({
        FullName: '',
        Alias: '',
        Description: '',
        IsActive: true,
        DateOfBirth: new Date(), // Assuming you handle date input properly
        PhotoUrl: ''
    });
    const handleChange = (e) => {

        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedForm = { ...form, PhotoUrl: fileUrl };
        const response = await addDocument(updatedForm);
        if (response.success) {
            // Clear the form or show success message
            setForm({
                FullName: '',
                Alias: '',
                Description: '',
                IsActive: true,
                DateOfBirth: new Date(),
                PhotoUrl: ''
            });
        }
    };
    const validTypes = ['image/png', 'image/jpeg'];
    const handleOnSelectFile = async (e) => {
        var selectedFile = e.files[0];
        
        if (selectedFile && validTypes.includes(selectedFile.type)) {
            uploadFile(selectedFile, 'Students');
        }
    }
    
    return (
        <div className='page-admin'>
            <div className='card' >
                <h3 className="text-center">Add student</h3>
                <form onSubmit={handleSubmit} >
                    <div className='form-content'>
                        <div className="form-field mt-3">
                            <label className='col-4'>Full name</label>
                            <InputText className='col-8' name='FullName' value={form.FullName} onChange={handleChange} />
                        </div>
                        <div className="form-field">
                            <label className='col-4'>Alias</label>
                            <InputText className='col-8' name='Alias' value={form.Alias} onChange={handleChange} />
                        </div>
                        <div className="form-field">
                            <label className='col-4'>Day of birth</label>
                            <Calendar className='col-8' name='DateOfBirth' id="buttondisplay" value={form.DateOfBirth} onChange={handleChange} showIcon />
                        </div>
                        <div className="form-field">
                            <label className='col-4'>Description</label>
                            <InputTextarea className='col-8' name='Description' autoResize value={form.Description} onChange={handleChange} rows={3}/>
                        </div>
                        <div className="form-field">
                            <FileUpload mode="basic" name="demo[]" accept="image/*" customUpload icon="upload" maxFileSize={1000000} onSelect={handleOnSelectFile}
                                chooseLabel='Upload photo' />
                                {/* <label >{fileUrl}</label> */}
                                {/* <input type="file" onChange={handleOnSelectFile} ></input> */}
                        </div>
                        
                    </div>

                    <div className='form-actions'>
                        <Button label="Add student" className='mx-2' icon="pi pi-save" type='submit' />
                    </div>
                </form>
            </div>
        </div>
    )
}