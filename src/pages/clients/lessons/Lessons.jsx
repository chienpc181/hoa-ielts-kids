
import '../client.css';
import { useCollection } from '../../../hooks/useCollection';
import { useNavigate } from 'react-router-dom';

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
                <div>
                    <h2>All lessons</h2>
                </div>
                <div className='list-stories'>
                    {documents.map((lesson, index) => (
                        <div key={index} className='card' style={{fontWeight:'600', cursor: 'pointer'}} onClick={() => handleClickLesson(lesson)}>
                            {lesson.title}
                        </div>
                    ))}
                </div>
                
            </div>

        </div>

    )
}