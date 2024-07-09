import { createSlice, createAction } from '@reduxjs/toolkit';

// Create a simple toggle action
export const switchLang = createAction('lang/switchLang');

const langSlice = createSlice({
    name: 'lang',
    initialState: {
        translate: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(switchLang, (state) => {
                state.translate = !state.translate;
            })
    }
});

export default langSlice.reducer;
