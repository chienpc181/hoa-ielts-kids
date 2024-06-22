import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './admin.css';
import { useNavigate } from 'react-router-dom';
import { useCollection } from '../../hooks/useCollection';

export default function Teachers() {
    const navigate = useNavigate();
    const addTeacher = () => {
        navigate('/admin/teachers/add-teacher');
    }
   
    const { documents, error } = useCollection(
        "HikTeachers",
        ["IsActive", "==", true], // Example query
        ["CreatedAt", "desc"] // Example orderBy
      );
    
    const dateBodyTemplate = (rowData) => {
        return formatDate(rowData.DateOfBirth);
    };
    const formatDate = (value) => {
        value = value.toDate();
        return value.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };
    return (
        <div className='page-admin'>
            <div>
                <h2>All teachers</h2>
            </div>
            <div className='actions'>
                <Button label="Add" icon="pi pi-plus" severity="secondary" onClick={addTeacher}/>
                <Button label="Edit" className='mx-2' severity="secondary" icon="pi pi-pencil" />
                <Button label="Delete"  icon="pi pi-trash" outlined severity="secondary"/>
            </div>
            <div className='content'>
                <div className="data-table">
                    <DataTable value={documents} tableStyle={{ minWidth: '50rem' }}>
                        <Column field="FullName" header="Name"></Column>
                        <Column field="Alias" header="Alias"></Column>
                        <Column field="Degree" header="Degree"></Column>
                        <Column field="Description" header="Description" style={{ maxWidth: '280px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}></Column>
                        <Column field="DateOfBirth" header="Date of birth" dataType='date' body={dateBodyTemplate } style={{width: '140px'}}></Column>
                        <Column field="IsActive" header="Active" style={{width: '100px'}}></Column>
                    </DataTable>
                </div>
            </div>
        </div>

    )
}