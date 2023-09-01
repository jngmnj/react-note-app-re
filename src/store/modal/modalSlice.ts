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
    toggleAddTagsModal: (state, { payload }) => {
      state.viewAddTagsModal = payload;
    },
    toggleEditTagsModal: (state, { payload }) => {
      state.viewEditTagsModal = payload;
    },
  },
});

export const {
  toggleCreateNoteModal,
  toggleFiltersModal,
  toggleAddTagsModal,
  toggleEditTagsModal,
} = modalSlice.actions;
export default modalSlice.reducer;