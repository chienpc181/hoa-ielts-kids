import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import '../admin.css';
import { useNavigate } from 'react-router-dom';

export default function Teachers() {
    const navigate = useNavigate();
    const addTeacher = () => {
        navigate('/admin/teachers/add-teacher');
    }
    const teachers = [
        {
            fullName: "Pham Thi Minh Hoa",
            alias: "Ms Hoa",
            isActive: true,
            birthday: "01/01/1989"
        },
        {
            fullName: "Pham Thi Minh Hoa",
            alias: "Ms Hoa",
            isActive: true,
            birthday: "01/01/1989"
        },
        {
            fullName: "Pham Thi Minh Hoa",
            alias: "Ms Hoa",
            isActive: true,
            birthday: "01/01/1989"
        },
        {
            fullName: "Pham Thi Minh Hoa",
            alias: "Ms Hoa",
            isActive: true,
            birthday: "01/01/1989"
        },
    ]
    return (
        <div className='page-admin'>
            <div className='actions card'>
                <Button label="Add" icon="pi pi-plus" severity="secondary" onClick={addTeacher}/>
                <Button label="Edit" className='mx-2' severity="secondary" icon="pi pi-pencil" />
                <Button label="Delete"  icon="pi pi-trash" outlined severity="secondary"/>
            </div>
            <div className='content'>
                <div className="card">
                    <DataTable value={teachers} tableStyle={{ minWidth: '50rem' }}>
                        <Column field="fullName" header="Name"></Column>
                        <Column field="alias" header="Alias"></Column>
                        <Column field="birthday" header="Date of birth"></Column>
                        <Column field="isActive" header="Active"></Column>
                    </DataTable>
                </div>
            </div>
        </div>

    )
}