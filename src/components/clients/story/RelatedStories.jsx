
import { NavLink } from 'react-router-dom';
import useLazyLoad from '../../../hooks/useLazyLoad';

function RelatedStories({ story }) {
    const baseUrl = 'https://truyen-cua-ba.vercel.app';
    const fetchUrl = `${baseUrl}/api/fairyStories`;
    const fetchingOption = {
        params: {
            paginationOptions: { page: 1, limit: 10 },
            queryOptions: { category: story.category, status: 'Inprogress' }
        },
    }

    const { data, isLoading, error, observerRef } = useLazyLoad(fetchUrl, fetchingOption);

    return (
        <div>
            <div ref={observerRef}></div>
            {isLoading && <p>Loading related stories...</p>}
            {error && <p>{error}</p>}
            {data && data.stories && <ul className="flex p-0" style={{ listStyleType: 'none', overflowX: 'auto' }}>
                {data.stories.map(story => (
                    <li className="pr-3" key={story._id}>
                        <NavLink to={`/fairy-stories/${story._id}`}>
                        <img src={story.thumbnailUrl} alt={story.title.en} style={{ aspectRatio: '210 / 297', width: '210px' }}></img>
                        </NavLink>
                        
                    </li>
                ))}
            </ul>}
        </div>
    );
}

export default RelatedStories;
