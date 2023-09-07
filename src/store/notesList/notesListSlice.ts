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
      const { type, id } = payload;
      mainNotes.state = payload;
    },
    setPinnedNotes: (state, { payload }) => {
      state.mainNotes = state.mainNotes.map((note) =>
        note.id === payload.id ? { ...note, isPinned: !note.isPinned } : note
      );
    },
    // note생성이나 수정 후 업데이트
    setMainNotes: (state, { payload }) => {
      if (state.mainNotes.find(({ id }) => id === payload.id)) {
        // payload아이디와 같으면 수정
        state.mainNotes = state.mainNotes.map(
          (note) => (note.id === payload.id ? payload : note) // 같은건 변경해주고 다른건 원래그대로
        );
      } else {
        // 다르면 생성
        state.mainNotes.push(payload);
      }
    },
    // 노트 버리기
    setTrashNotes: (state, { payload }) => {
      state.mainNotes = state.mainNotes.filter(({ id }) => id !== payload.id);
      state.archiveNotes = state.archiveNotes.filter(({ id }) => id !== payload.id);
      state.trashNotes.push({...payload, idPinned: false});
    },
    // 노트 아카이브
    setArchiveNotes: (state, { payload }) => {
      state.mainNotes = state.mainNotes.filter(({ id }) => id !== payload.id);
      state.archiveNotes.push({ ...payload, idPinned: false });
    },
    // 노트 언아카이브
    unArchiveNote: (state, { payload }) => {
      state.archiveNotes = state.archiveNotes.filter(({ id }) => id !== payload.id);
      state.mainNotes.push(payload);
    },
    // 노트 지우기
    deleteNote: (state, { payload }) => {
      state.trashNotes = state.trashNotes.filter(({ id }) => id !== payload.id);
    },
    // 노트 복구하기(휴지통 -> 메인노트)
    restoreNote: (state, { payload }) => {
      state.trashNotes = state.trashNotes.filter(({ id }) => id !== payload.id);
      state.mainNotes.push(payload);
    },
    // 태그 지우기
    removeTags: (state, { payload }) => {
      state.mainNotes = state.mainNotes.map((note) => ({
        ...note,
        tags: note.toLocaleString.filter(({ tag }) => tag !== payload.tag),
      }));
    },
  },
});

export const { setPinnedNotes, readNote, unArchiveNote } = notesListSlice.actions;
export default notesListSlice.reducer;