import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
  viewEditTagsModal: boolean;
  viewAddTagsModal: boolean;
  viewCreateNoteModal: boolean;
  viewFiltersModal: boolean;
}

const initialState: ModalState = {
  viewEditTagsModal: false,
  viewAddTagsModal: false,
  viewCreateNoteModal: false,
  viewFiltersModal: false,
}

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleCreateNoteModal: (state, { payload }) => {
      state.viewCreateNoteModal = payload;
    },
    toggleFiltersModal: (state, { payload }) => {
      state.viewFiltersModal = payload;
    },
    toggleTagsModal: (state, { payload }) => {
      const { type, view } = payload;
      if(type === "add") {
        state.viewAddTagsModal = view;
      } else {
        state.viewEditTagsModal =view;
      }
    },
  },
});

export const {
  toggleCreateNoteModal,
  toggleFiltersModal,
  toggleTagsModal,
} = modalSlice.actions;
export default modalSlice.reducer;