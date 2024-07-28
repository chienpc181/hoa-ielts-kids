// speechSynthesisSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedVoice: null,
    voices: [],
};

const speechSynthesisSlice = createSlice({
    name: 'speechSynthesis',
    initialState,
    reducers: {
        setSelectedVoice(state, action) {
            state.selectedVoice = action.payload;
        },
        // setVoices(state, action) {
        //     state.voices = action.payload;
        // },
    },
});

export const { setSelectedVoice, setVoices } = speechSynthesisSlice.actions;
export default speechSynthesisSlice.reducer;
