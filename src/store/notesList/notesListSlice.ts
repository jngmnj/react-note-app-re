import { createSlice } from '@reduxjs/toolkit';
import notes from '../../notesData/notesData';
import { Note } from '../../types/note';

interface NoteState {
  mainNotes: Note[];
  archiveNotes: Note[];
  trashNotes: Note[];
  editeNote: null | Note;
}
const initialState: NoteState = {
  // mainNotes: [],
  mainNotes: [...notes],
  archiveNotes: [],
  trashNotes: [],
  editeNote: null,
};

const notesListSlice = createSlice({
    name: "notesList",
    initialState,
    reducers: {
      readNote: (state, { payload }) => {
        mainNotes.state = payload;
      },
      setPinnedNotes: (state, { payload }) => {
        state.mainNotes = state.mainNotes.map((note) => 
          note.id === payload.id ? {...note, isPinned : !note.isPinned} : note
        )
      },
      unArchiveNote: (state, { payload }) => {
        state.archiveNotes = state.archiveNotes.filter(({id}) => id !== payload.id);
        state.mainNotes.push(payload);
      }
    }
})

export const { setPinnedNotes, readNote, unArchiveNote } = notesListSlice.actions;
export default notesListSlice.reducer;