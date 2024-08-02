import '../client.css';
import { useCollection } from '../../../hooks/useCollection';
import { useNavigate } from 'react-router-dom';
import ListItemLesson from '../../../components/clients/ListItemLesson';
import SwitchLang from '../../../components/clients/SwitchLang';
import { Helmet, HelmetProvider } from 'react-helmet-async';

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
        <HelmetProvider>
            <div className='page-client'>
                <Helmet>
                    <title>HOA IELTS KiDs - All lessons</title>
                    <meta name="description" content='HOA IELTS KiDs - All lessons' />
                </Helmet>
                <div className='lesson-container'>
                    <div className='py-3'>
                        <SwitchLang ></SwitchLang>
                        <h1>All lessons</h1>
                    </div>
                    <div className='lesson-list'>
                        {documents.map((lesson, index) => (
                            <ListItemLesson key={index} item={lesson} onSelectItem={() => handleClickLesson(lesson)}></ListItemLesson>
                        ))}
                    </div>
                    
                </div>
            </div>
        </HelmetProvider>


    )
}