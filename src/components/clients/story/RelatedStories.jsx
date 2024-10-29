
function RelatedStories({relatedStories}) {
    console.log(relatedStories)
    return (
        <ul className="flex p-0" style={{listStyleType: 'none', overflowX: 'auto'}}>
            {relatedStories.map(story => (
                <li className="pr-3" >
                    <img src={story.thumbnailUrl} alt={story.title} style={{aspectRatio: '210 / 297', width: '210px'}}></img>
                </li>
            ))}
        </ul>
        
    )
}

export {RelatedStories}