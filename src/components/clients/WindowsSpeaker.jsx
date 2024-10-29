import { useSpeechSynthesis } from 'react-speech-kit';
import { useSelector } from 'react-redux';
import { ToggleButton } from 'primereact/togglebutton';
import { Button } from 'primereact/button';

function StorySpeaker({storyData}) {
    const { speak, cancel, speaking } = useSpeechSynthesis();
    const selectedVoice = useSelector(state => state.speechSynthesis.selectedVoice);
    const translate = useSelector(state => state.lang.translate);

    const translateTextLang = (text) => {
        return translate ? text.en : text.vi;
    };

    const speakStory = () => {
        const content = storyData.mainStory
            .map(para => (translate ? para.en : para.vi))
            .join('\n');
        const text = translateTextLang(storyData.title) + "\n" + content;
        speak({ text, voice: selectedVoice });
    };

    const handlePauseResume = () => {
        if (speaking) {
            cancel();
        } else {
            speakStory();
        }
    };

    return (
        <div className='block justify-content-center mt-4'>
            {translate && <ToggleButton
                checked={speaking}
                onChange={handlePauseResume}
                onIcon="pi pi-pause"
                offIcon="pi pi-play"
                onLabel="Pause"
                offLabel="Listen"
                disabled={!selectedVoice}
            />}
        </div>
    )
}

function TextSpeaker({text}) {
    const { speak, cancel, speaking } = useSpeechSynthesis();
    const selectedVoice = useSelector(state => state.speechSynthesis.selectedVoice);
    
    const handleSpeak = () => {
        if (speaking) {
            cancel();
        } else {
            speak({ text, voice: selectedVoice, rate: 0.6, pitch: 1 });
        }
    };

    return (
        <Button rounded text icon="pi pi-volume-up" onClick={handleSpeak} />
    )
}

export { StorySpeaker, TextSpeaker }