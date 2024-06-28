import { useEffect, useRef } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';

const useFilteredSpeechSynthesis = () => {
    const { speak, cancel, speaking, voices: allVoices, supported } = useSpeechSynthesis();
    const voices = useRef([]);

    useEffect(() => {
        if (supported) {
            voices.current = allVoices.filter(voice => voice.localService && (voice.lang === 'en-US' || voice.lang === 'en-GB'));
        }
    }, [allVoices, supported]);

    return { speak, cancel, speaking, voices: voices.current, supported };
};

export default useFilteredSpeechSynthesis;
