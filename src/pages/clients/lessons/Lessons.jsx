
import '../client.css';
import { useCollection } from '../../../hooks/useCollection';
import { useNavigate } from 'react-router-dom';
import ListItemLesson from '../../../components/clients/ListItemLesson';
import SwitchLang from '../../../components/clients/SwitchLang';

export default function Lessons() {
    const navigate = useNavigate();
    const { documents, error } = useCollection(
        "HikLessons",
        // ["IsActive", "==", true], 
        // ["CreatedAt", "desc"] 
    );


    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!documents) {
        return <div>Loading...</div>;
    }

    const handleClickLesson = (lesson) => {
        navigate(`/lessons/${lesson.id}`);
    }

    return (
        <div className='page-client'>
            <div className='page-content'>
            <div className='my-3' >
                    <SwitchLang></SwitchLang>
                </div>
                <div>
                    <h1>All lessons</h1>
                </div>
                <div className='lesson'>
                    {documents.map((lesson, index) => (
                        <ListItemLesson key={index} item={lesson} onSelectItem={() => handleClickLesson(lesson)}></ListItemLesson>
                    ))}
                </div>
                
            </div>

        </div>

    )
}