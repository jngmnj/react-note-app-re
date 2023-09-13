import { createSlice } from '@reduxjs/toolkit';
import { Tag } from '../../types/tag';
import { v4 } from 'uuid';
import { toast } from 'react-toastify';

interface tagState {
    tagsList: Tag[],
}

const initialState: tagState = {
  tagsList: [
    { tag: "coding", id: v4() },
    { tag: "exercise", id: v4() },
    { tag: "react", id: v4() },
  ],
};

const tagsSlice = createSlice({
    name: "tags",
    initialState,
    reducers: {
        addTags: (state, { payload }) => {
            if(state.tagsList.find(({ tag }) => tag === payload)) {                
                toast.warning("이미 존재하는 태그입니다.");
            } else {
                state.tagsList.push(payload);
                toast.info("새로운 태그가 등록되었습니다.");
            }
        },
        deleteTags: (state, { payload }) => {
            state.tagsList = state.tagsList.filter(({ id }) => id !== payload);
            toast.info("태그가 삭제되었습니다.");
        }
    }
})

export const { addTags, deleteTags } = tagsSlice.actions;
export default tagsSlice.reducer;