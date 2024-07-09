import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { RadioButton } from 'primereact/radiobutton';
import './client.css';
import './Students.css';
import { useCollection } from '../../hooks/useCollection';
import QuestionStandard from '../../components/clients/QuestionStandard';

export default function Practices() {

    const { documents, error } = useCollection(
        "HikQuestions",
        // ["IsActive", "==", true], 
        // ["CreatedAt", "desc"] 
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
                    <h2>All questions</h2>
                </div>

                <div className='mt-3'>
                    {documents.map((question, index) => <QuestionStandard question={question} key={index}/>)}
                </div>
            </div>

        </div>

    )
}