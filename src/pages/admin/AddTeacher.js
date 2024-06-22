import './admin.css';
import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { useFirestore } from '../../hooks/useFirestore';

export default function AddTeacher() {
    // const [fullName, setFullName] = useState('');
    // const [alias, setAlias] = useState('');
    // const [dayOfBirth, setDayOfBirth] = useState('');
    // const [degree, setDegree] = useState('');
    // const [description, setDescription] = useState('');
    const { addDocument, response } = useFirestore('HikTeachers');
    const [form, setForm] = useState({
        FullName: '',
        Alias: '',
        Degree: '',
        Description: '',
        IsActive: true,
        DateOfBirth: new Date() // Assuming you handle date input properly
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
        await addDocument(form);
        if (response.success) {
            // Clear the form or show success message
            setForm({
                FullName: '',
                Alias: '',
                Degree: '',
                Description: '',
                IsActive: true,
                DateOfBirth: new Date()
            });
        }
    };
    const toast = useRef(null);
    const onUpload = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };
    return (
        <div className='page-admin'>
            <div>
                <h2>Add teacher</h2>
            </div>
            <div className=' actions-form'>
                <Card>
                    <form onSubmit={handleSubmit}>
                        <div className='text-left px-3'>
                            <div className="grid mb-5 mt-3">
                                <label className='col-4'>Full name</label>
                                <InputText className='col-8' name='FullName' value={form.FullName} onChange={handleChange} />
                            </div>
                            <div className="grid mb-5">
                                <label className='col-4'>Alias</label>
                                <InputText className='col-8' name='Alias' value={form.Alias} onChange={handleChange} />
                            </div>
                            <div className="grid mb-5">
                                <label className='col-4'>Day of birth</label>
                                <Calendar className='col-8' name='DateOfBirth' id="buttondisplay" value={form.DateOfBirth} onChange={handleChange} showIcon />
                            </div>
                            <div className="grid mb-5">
                                <label className='col-4'>Degree</label>
                                <InputText className='col-8' name='Degree' value={form.Degree} onChange={handleChange} />
                            </div>
                            <div className="grid mb-5">
                                <label className='col-4'>Description</label>
                                <InputTextarea className='col-8' name='Description' autoResize value={form.Description} onChange={handleChange} rows={5} cols={30} />
                            </div>
                            <Toast ref={toast}></Toast>
                            <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" icon="upload" maxFileSize={1000000} onUpload={onUpload}
                                chooseLabel='Upload photo' />
                        </div>
                        <div className='form-actions'>
                            <Button label="Add teacher" className='mx-2' icon="pi pi-save" type='submit'/>
                        </div>
                    </form>
                    {response.error && <p className='error'>{response.error}</p>}
                </Card>
            </div>
        </div>
    )
}