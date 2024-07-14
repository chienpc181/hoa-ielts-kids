import { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';

export default function DoubleLangInputText({ textLang, handleTextChange, flexDirection = false }) {
    const [content, setContent] = useState(textLang);

    const handleChange = (e, lang) => {
        setContent(prev => ({
            ...prev,
            [lang]: e.target.value
        }));
    };

    const debouncedHandleTextChange = debounce((content) => {
        handleTextChange(content);
    }, 300);

    useEffect(() => {
        debouncedHandleTextChange(content);
        return () => {
            debouncedHandleTextChange.cancel();
        };
    }, [content]);

    return (
        <div className={`w-full mt-2 ${flexDirection ? 'flex' : ''}`}>
            <div className={`w-full ${flexDirection ? 'mr-2' : ''}`}>
                <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">ENG</span>
                    <InputText value={content.en} onChange={(e) => handleChange(e, 'en')} />
                </div>
            </div>
            <div className={`w-full ${flexDirection ? 'ml-2' : 'mt-3'}`}>
                <div className="p-inputgroup flex-1">
                    <span className="p-inputgroup-addon">VIE</span>
                    <InputText value={content.vi} onChange={(e) => handleChange(e, 'vi')} />
                </div>
            </div>
        </div>
    );
}

DoubleLangInputText.propTypes = {
    textLang: PropTypes.shape({
        en: PropTypes.string,
        vi: PropTypes.string
    }).isRequired,
    handleTextChange: PropTypes.func.isRequired,
    index: PropTypes.number,
    flexDirection: PropTypes.bool
};
