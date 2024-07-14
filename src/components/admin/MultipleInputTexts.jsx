import { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';

export default function MultipleInputTexts({ inputTexts, handleChange, placeholder }) {
    const [texts, setTexts] = useState(inputTexts);

    const debouncedHandleChange = debounce((texts) => {
        handleChange(texts);
    }, 300);

    useEffect(() => {
        debouncedHandleChange(texts);
        return () => {
            debouncedHandleChange.cancel();
        };
    }, [texts]);

    const handleAddInput = () => {
        setTexts(prev => [...prev, '']);
    };

    const handleRemoveInput = () => {
        if (texts.length > 1) {
            setTexts(prev => prev.slice(0, -1));
        }
    };

    const handleTextChange = (e, idx) => {
        setTexts(prev => prev.map((text, i) => (i === idx ? e.target.value : text)));
    };

    return (
        <div className='w-full mt-2'>
            <div className="form-field justify-content-end">
                <Button label='-' outlined onClick={handleRemoveInput} type='button' disabled={texts.length <= 1} />
                <Button className='ml-2' label='+' outlined onClick={handleAddInput} type='button' />
            </div>
            {texts.map((text, idx) => (
                <div className="form-field" key={idx}>
                    <InputText
                        className='w-full'
                        placeholder={`${placeholder} ${idx + 1}`}
                        value={text}
                        onChange={(e) => handleTextChange(e, idx)}
                    />
                </div>
            ))}
        </div>
    );
}

MultipleInputTexts.propTypes = {
    inputTexts: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string
};
