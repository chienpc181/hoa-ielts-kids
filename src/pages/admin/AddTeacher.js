import '../admin.css';
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

export default function AddTeacher() {
    const [fullName, setFullName] = useState('');
    const [alias, setAlias] = useState('');
    const [dayOfBirth, setDayOfBirth] = useState('');
    const [isActive, setIsActive] = useState('');
    return (
        <div className='page-admin'>
            <div className=' actions-form'>
                <Card>
                    <div className='text-left px-3'>
                        <div className="grid mb-5 mt-3">
                            <label className='col-4'>Full name</label>
                            <InputText className='col-8' value={fullName} onChange={(e) => setFullName(e.target.value)} />
                        </div>
                        <div className="grid mb-5">
                            <label className='col-4'>Alias</label>
                            <InputText className='col-8' value={alias} onChange={(e) => setAlias(e.target.value)} />
                        </div>
                        <div className="grid mb-5">
                            <label className='col-4'>Day of birth</label>
                            <InputText className='col-8' value={dayOfBirth} onChange={(e) => setDayOfBirth(e.target.value)} />
                        </div>
                        <div className="grid mb-5">
                            <label className='col-4'>Active</label>
                            <InputText className='col-8' value={isActive} onChange={(e) => setIsActive(e.target.value)} />
                        </div>
                    </div>
                    <div className='form-actions'>
                        <Button label="Add" className='mx-2' icon="pi pi-plus" />
                    </div>
                </Card>
            </div>
        </div>
    )
}