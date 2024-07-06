import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './client.css';
import './Students.css';
import { useCollection } from '../../hooks/useCollection';
import { useNavigate } from 'react-router-dom';

export default function Students() {
    const navigate = useNavigate();
    const { documents, error } = useCollection(
        "HikStudents",
        // ["IsActive", "==", true], 
        // ["CreatedAt", "desc"] 
    );


    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!documents) {
        return <div>Loading...</div>;
    }

    const handleClickStudent = (student) => {
        navigate(`/students/${student.id}`);
    }

    return (
        <div className='page-client'>
            <div className='page-content'>
                <div>
                    <h2>Our Students</h2>
                </div>

                <div className='main-content'>
                    <div className='student-card'>
                        {documents.map((student, index) => {
                            const header = (
                                <div className='card-photo'>
                                    <img alt="Card" 
                                        src={student.PhotoUrl} />
                                </div>

                            );
                            const subTitle = (
                                <>
                                    <label className='my-1'>{student.FullName}</label>
                                </>
                            );
                            return (
                                <Card key={index} title={student.Alias} subTitle={subTitle} header={header} style={{cursor: 'pointer'}} onClick={() => handleClickStudent(student)}>
                                    <p className="m-0">
                                        {student.Description}
                                    </p>
                                </Card>
                            )
                        })}

                    </div>

                </div>
            </div>

        </div>

    )
}