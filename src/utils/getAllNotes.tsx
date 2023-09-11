import React from 'react'
import { NotesContainer } from '../styles/styles'
import NoteCard from '../components/NoteCard/NoteCard'
import { Note } from '../types/note'

const filteredNotes = (notes: Note[], filter: string) => {
  const lowPriority = notes.filter(({ priority }) => priority === "low");
  const highPriority = notes.filter(({ priority }) => priority === "high");

  if(filter === "low") {
    return [...lowPriority, ...highPriority];
  } else if(filter === "high") {
    return [...highPriority, ...lowPriority];
  } else if(filter === "latest") {
    return notes.sort((a, b) => {
      if (a.createdTime > b.createdTime) {
        return 1;
      } 
      if (a.createdTime < b.createdTime) {
        return -1;
      } 
      return 0;
    })
  } else if(filter === "created") {
    return notes.sort((a, b) => {
      if (a.createdTime > b.createdTime) {
        return -1;
      }
      if (a.createdTime < b.createdTime) {
        return 1;
      }
      return 0;
    });
  } else if(filter === "edited") {

  } else {

  }
}
const getAllNotes = (mainNotes: Note[], filter: string) => {

  const pinned = mainNotes.filter(({ isPinned }) => isPinned);
  const normal = mainNotes.filter(({ isPinned }) => !isPinned);

  if( normal.length !== 0 && pinned.length === 0) {
    return (
      <>
        <div className="allNotes__notes-type">
          All Notes<span>({normal.length})</span>
        </div>
        <NotesContainer>
          {mainNotes.map((note) => (
            <NoteCard key={note.id} note={note} type="notes" />
          ))}
        </NotesContainer>
      </>
    );
  } 

  if( normal.length === 0 && pinned.length !== 0 ) {
    return (
      <>
        <div className="allNotes__notes-type">
          Pinned Notes<span>({pinned.length})</span>
        </div>
        <NotesContainer>
          {mainNotes.map((note) => (
            <NoteCard key={note.id} note={note} type="notes" />
          ))}
        </NotesContainer>
      </>
    );
  }

  if( normal.length !== 0 && pinned.length !== 0 ) {
    return (
      <>
        <div className="allNotes__notes-type">
          Pinned Notes<span>({pinned.length})</span>
        </div>
        <NotesContainer>
          {mainNotes.map((note) => (
            <NoteCard key={note.id} note={note} type="notes" />
          ))}
        </NotesContainer>
        <div className="allNotes__notes-type">
          All Notes<span>({normal.length})</span>
        </div>
        <NotesContainer>
          {mainNotes.map((note) => (
            <NoteCard key={note.id} note={note} type="notes" />
          ))}
        </NotesContainer>
      </>
    );
  }

}

export default getAllNotes