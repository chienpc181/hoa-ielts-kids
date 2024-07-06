import './client.css';
import './Stories.css';
import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SwitchLang from '../../components/clients/SwitchLang';
import useDocument from '../../hooks/useDocument';

export default function StudentDetail() {
    const { id } = useParams();
    const { document, error } = useDocument('HikStudents', id);

    
    return (
        <div className='page-client'>
            <div className='page-content'>
                <div className='mt-6'>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/gffcsr3E3xU?si=07eGyJknPMPOHkxw" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

                </div>
            </div>
            
        </div>
    )
}