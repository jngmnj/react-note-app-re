import { createSlice } from '@reduxjs/toolkit';
import { Tag } from '../../types/tag';
import { v4 } from 'uuid';

interface tagState {
    tagsList: Tag[],
}

const initialState = {
    tagsList: [
        { tag: "coding", id: v4() },
        { tag: "exercise", id: v4() },
        { tag: "react", id: v4() },
    ],
}

const tagsSlice = createSlice({
    name: "tags",
    initialState,
    reducers: {}
})

export default tagsSlice.reducer;