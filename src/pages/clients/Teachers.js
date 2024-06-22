import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './client.css';
import './Teachers.css';
import { useCollection } from '../../hooks/useCollection';

export default function Teachers() {

    const { documents, error } = useCollection(
        "HikTeachers",
        ["IsActive", "==", true], // Example query
        ["CreatedAt", "desc"] // Example orderBy
    );


    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!documents) {
        return <div>Loading...</div>;
    }



    return (
        <div className='page-client'>
            <div className='page-content'>
                <div>
                    <h2>Our teachers</h2>
                </div>

                <div className='main-content'>
                    <div className='teacher-card'>
                        {documents.map((teacher) => {
                            const header = (
                                <div className='card-photo'>
                                    <img alt="Card" 
                                        src={teacher.PhotoUrl} />
                                </div>

                            );
                            const subTitle = (
                                <>
                                    <p className='my-1'>{teacher.FullName}</p>
                                    <p className='my-1'> {teacher.Degree}</p>
                                </>
                            );
                            return (
                                <Card title={teacher.Alias} subTitle={subTitle} header={header} className="">
                                    <p className="m-0">
                                        {teacher.Description}
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