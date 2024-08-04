import React, { useState, useEffect } from 'react';
import AddnRemoveListItem from '../common/AddnRemoveListItem';
import PropTypes from 'prop-types';
import LessonDistinguish from './LessonDistinguish';
import { Chips } from 'primereact/chips';

export default function LessonDistinguishedList({distinguishes, onChange }) {
    const [_distinguishes, setDistinguishs] = useState(distinguishes.distinguishes);
    const [_entities, setEntities] = useState(distinguishes.entities);

    const textLang = {
        en: '',
        vi: ''
    }

    const initDistingush = {
        title: textLang,
        expressions: [textLang],
        examples: [textLang]
    }


    useEffect(() => {
        onChange({
            entities: _entities,
            distinguishes: _distinguishes,
        })
    }, [_distinguishes]);

    const handleLessonDistinguishChange = (updated, idx) => {
        const updates = _distinguishes.map((distinguish, i) => (i === idx ? updated : distinguish));
        setDistinguishs(updates);
    };


    return (
        <div className='w-full mt-2 card'>
            <div className="form-field justify-content-between">
                <label>Distingushes</label>
                <AddnRemoveListItem items={_distinguishes} initItem={initDistingush} onChange={(items) => setDistinguishs(items)}></AddnRemoveListItem>
            </div>
            <div className="form-field block">
                <label>Entities</label>
                <div className='mt-2 p-fluid'>
                    <Chips className='flex' value={_entities} onChange={(e) => setEntities(e.value)} separator="," />
                </div>
            </div>
            {_distinguishes.map((distinguish, idx) => (
                <div className="form-field" key={idx}>
                    <LessonDistinguish distinguish={distinguish} onChange={(distinguish) => handleLessonDistinguishChange(distinguish, idx)}/>
                </div>
            ))}
        </div>
    );
}
